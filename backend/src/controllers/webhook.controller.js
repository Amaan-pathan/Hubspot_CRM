const crypto = require("crypto");
const Contact = require("../models/Contact");
const Company = require("../models/Company");
const SyncLog = require("../models/SyncLog");
const Conflict = require("../models/Conflict");

const verifyWebhookSignature = (req) => {
  const signature = req.headers["x-hubspot-request-signature"];
  const timestamp = req.headers["x-hubspot-request-timestamp"];
  const body = req.rawBody || JSON.stringify(req.body);

  if (!signature || !timestamp) {
    return false;
  }

  if (!process.env.HUBSPOT_WEBHOOK_SECRET) {
    console.warn("WARNING: HUBSPOT_WEBHOOK_SECRET is not configured. Webhook signature verification will fail.");
    return false;
  }

  const stringToSign = `${req.method}${req.originalUrl}${body}${timestamp}`;
  const hash = crypto
    .createHmac("sha256", process.env.HUBSPOT_WEBHOOK_SECRET)
    .update(stringToSign)
    .digest("hex");

  return hash === signature;
};

const handleWebhook = async (req, res) => {
  try {
    // Verify webhook signature
    if (!verifyWebhookSignature(req)) {
      console.error("Invalid webhook signature");
      await SyncLog.create({
        action: "WEBHOOK_RECEIVED",
        status: "FAILED",
        errorMessage: "Invalid webhook signature",
      });
      return res.status(403).json({
        success: false,
        message: "Invalid webhook signature",
      });
    }

    const { object, action, objectId, changeSource, changedByUserId, appId, occurredAt, changes } = req.body;

    console.log(`Webhook received: ${object} ${action} - ID: ${objectId}`);

    // Log webhook event
    const syncLog = await SyncLog.create({
      entityType: object.toUpperCase(),
      hubspotId: objectId,
      action: action.toUpperCase(),
      status: "PENDING",
      startedAt: new Date(occurredAt),
    });

    if (object.toLowerCase() === "contact") {
      await syncContactFromWebhook(objectId, action, changes, syncLog._id);
    } else if (object.toLowerCase() === "company") {
      await syncCompanyFromWebhook(objectId, action, changes, syncLog._id);
    }

    // Respond immediately to HubSpot
    res.status(200).json({
      success: true,
      message: "Webhook received and processing",
    });
  } catch (error) {
    console.error("Webhook handler error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const syncContactFromWebhook = async (hubspotId, action, changes, syncLogId) => {
  try {
    const hubspotService = require("../services/hubspot.service");
    const hubspotContactData = await hubspotService.getContactFromHubSpot(hubspotId);

    if (!hubspotContactData) {
      throw new Error("Failed to fetch contact from HubSpot");
    }

    const contactData = {
      firstName: hubspotContactData.properties.firstname?.value || "",
      lastName: hubspotContactData.properties.lastname?.value || "",
      email: hubspotContactData.properties.email?.value || "",
      phone: hubspotContactData.properties.phone?.value || "",
      hubspotId: hubspotId,
      customFields: hubspotContactData.properties,
      source: "HUBSPOT",
      lastModifiedAt: new Date(),
    };

    let contact = await Contact.findOne({ hubspotId });

    if (contact) {
      contact = await Contact.findByIdAndUpdate(contact._id, contactData, {
        new: true,
      });
    } else {
      contact = await Contact.create(contactData);
    }

    await SyncLog.findByIdAndUpdate(syncLogId, {
      entityId: contact._id,
      status: "SUCCESS",
      completedAt: new Date(),
    });

    console.log(`Contact ${action}: ${contact._id}`);
  } catch (error) {
    console.error("Error syncing contact from webhook:", error);

    await SyncLog.findByIdAndUpdate(syncLogId, {
      status: "FAILED",
      errorMessage: error.message,
      completedAt: new Date(),
    });

    await Conflict.create({
      entityType: "CONTACT",
      hubspotId: hubspotId,
      hubspotData: changes,
      resolved: false,
    });
  }
};

const syncCompanyFromWebhook = async (hubspotId, action, changes, syncLogId) => {
  try {
    const hubspotService = require("../services/hubspot.service");
    const hubspotCompanyData = await hubspotService.getCompanyFromHubSpot(hubspotId);

    if (!hubspotCompanyData) {
      throw new Error("Failed to fetch company from HubSpot");
    }

    const companyData = {
      name: hubspotCompanyData.properties.name?.value || "",
      domain: hubspotCompanyData.properties.domain?.value || "",
      industry: hubspotCompanyData.properties.industry?.value || "",
      hubspotId: hubspotId,
      customFields: hubspotCompanyData.properties,
      source: "HUBSPOT",
      lastModifiedAt: new Date(),
    };

    let company = await Company.findOne({ hubspotId });

    if (company) {
      company = await Company.findByIdAndUpdate(company._id, companyData, {
        new: true,
      });
    } else {
      company = await Company.create(companyData);
    }

    await SyncLog.findByIdAndUpdate(syncLogId, {
      entityId: company._id,
      status: "SUCCESS",
      completedAt: new Date(),
    });

    console.log(`Company ${action}: ${company._id}`);
  } catch (error) {
    console.error("Error syncing company from webhook:", error);

    await SyncLog.findByIdAndUpdate(syncLogId, {
      status: "FAILED",
      errorMessage: error.message,
      completedAt: new Date(),
    });

    await Conflict.create({
      entityType: "COMPANY",
      hubspotId: hubspotId,
      hubspotData: changes,
      resolved: false,
    });
  }
};

module.exports = {
  handleWebhook,
};
