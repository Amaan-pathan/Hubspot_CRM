const axios = require("axios");

const HUBSPOT_API_BASE = "https://api.hubapi.com";
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

const getContactFromHubSpot = async (contactId) => {
  try {
    const response = await axios.get(
      `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${contactId}`,
      {
        params: {
          limit: 100,
        },
        headers: {
          Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching contact from HubSpot:", error.message);
    throw error;
  }
};

const getCompanyFromHubSpot = async (companyId) => {
  try {
    const response = await axios.get(
      `${HUBSPOT_API_BASE}/crm/v3/objects/companies/${companyId}`,
      {
        params: {
          limit: 100,
        },
        headers: {
          Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching company from HubSpot:", error.message);
    throw error;
  }
};

const createOrUpdateContact = async (contactData) => {
  try {
    const payload = {
      properties: {
        firstname: contactData.firstName,
        lastname: contactData.lastName,
        email: contactData.email,
        phone: contactData.phone,
      },
    };

    let response;

    if (contactData.hubspotId) {
      // Update existing contact
      response = await axios.patch(
        `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${contactData.hubspotId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      // Create new contact
      response = await axios.post(
        `${HUBSPOT_API_BASE}/crm/v3/objects/contacts`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("Contact synced to HubSpot:", response.data.id);
    return response.data;
  } catch (error) {
    console.error("Error syncing contact to HubSpot:", error.message);
    throw error;
  }
};

const createOrUpdateCompany = async (companyData) => {
  try {
    const payload = {
      properties: {
        name: companyData.name,
        domain: companyData.domain,
        industry: companyData.industry,
      },
    };

    let response;

    if (companyData.hubspotId) {
      // Update existing company
      response = await axios.patch(
        `${HUBSPOT_API_BASE}/crm/v3/objects/companies/${companyData.hubspotId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      // Create new company
      response = await axios.post(
        `${HUBSPOT_API_BASE}/crm/v3/objects/companies`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("Company synced to HubSpot:", response.data.id);
    return response.data;
  } catch (error) {
    console.error("Error syncing company to HubSpot:", error.message);
    throw error;
  }
};

module.exports = {
  getContactFromHubSpot,
  getCompanyFromHubSpot,
  createOrUpdateContact,
  createOrUpdateCompany,
};
