const SyncLog = require("../models/SyncLog");
const Conflict = require("../models/Conflict");
const hubspotService = require("./hubspot.service");

const syncContactToHubSpot = async (contact) => {
  try {
    const syncLog = await SyncLog.create({
      entityType: "CONTACT",
      entityId: contact._id,
      action: contact.hubspotId ? "UPDATE" : "CREATE",
      status: "PENDING",
      startedAt: new Date(),
    });

    const contactData = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      hubspotId: contact.hubspotId,
    };

    const response = await hubspotService.createOrUpdateContact(contactData);

    await SyncLog.findByIdAndUpdate(syncLog._id, {
      hubspotId: response.id,
      status: "SUCCESS",
      completedAt: new Date(),
    });

    // Update contact with HubSpot ID if newly created
    if (!contact.hubspotId) {
      contact.hubspotId = response.id;
      await contact.save();
    }

    console.log(`Contact synced to HubSpot: ${contact._id} -> ${response.id}`);
    return response;
  } catch (error) {
    console.error("Error syncing contact to HubSpot:", error.message);

    await SyncLog.create({
      entityType: "CONTACT",
      entityId: contact._id,
      hubspotId: contact.hubspotId,
      action: contact.hubspotId ? "UPDATE" : "CREATE",
      status: "FAILED",
      errorMessage: error.message,
      completedAt: new Date(),
    });

    // Create conflict record
    await Conflict.create({
      entityType: "CONTACT",
      entityId: contact._id,
      hubspotId: contact.hubspotId,
      appData: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
      },
      conflictFields: ["firstName", "lastName", "email", "phone"],
      resolved: false,
    });

    throw error;
  }
};

const syncCompanyToHubSpot = async (company) => {
  try {
    const syncLog = await SyncLog.create({
      entityType: "COMPANY",
      entityId: company._id,
      action: company.hubspotId ? "UPDATE" : "CREATE",
      status: "PENDING",
      startedAt: new Date(),
    });

    const companyData = {
      name: company.name,
      domain: company.domain,
      industry: company.industry,
      hubspotId: company.hubspotId,
    };

    const response = await hubspotService.createOrUpdateCompany(companyData);

    await SyncLog.findByIdAndUpdate(syncLog._id, {
      hubspotId: response.id,
      status: "SUCCESS",
      completedAt: new Date(),
    });

    // Update company with HubSpot ID if newly created
    if (!company.hubspotId) {
      company.hubspotId = response.id;
      await company.save();
    }

    console.log(`Company synced to HubSpot: ${company._id} -> ${response.id}`);
    return response;
  } catch (error) {
    console.error("Error syncing company to HubSpot:", error.message);

    await SyncLog.create({
      entityType: "COMPANY",
      entityId: company._id,
      hubspotId: company.hubspotId,
      action: company.hubspotId ? "UPDATE" : "CREATE",
      status: "FAILED",
      errorMessage: error.message,
      completedAt: new Date(),
    });

    // Create conflict record
    await Conflict.create({
      entityType: "COMPANY",
      entityId: company._id,
      hubspotId: company.hubspotId,
      appData: {
        name: company.name,
        domain: company.domain,
        industry: company.industry,
      },
      conflictFields: ["name", "domain", "industry"],
      resolved: false,
    });

    throw error;
  }
};

module.exports = {
  syncContactToHubSpot,
  syncCompanyToHubSpot,
};
