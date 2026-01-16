import api from "../utils/api";

const getAllContacts = async () => {
  try {
    const response = await api.get("/contacts");
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

const getContactById = async (id) => {
  try {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw error;
  }
};

const createContact = async (data) => {
  try {
    const response = await api.post("/contacts", data);
    return response.data;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

const updateContact = async (id, data) => {
  try {
    const response = await api.put(`/contacts/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};

export {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
