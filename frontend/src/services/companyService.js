import api from "../utils/api";

const getAllCompanies = async () => {
  try {
    const response = await api.get("/companies");
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

const getCompanyById = async (id) => {
  try {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching company:", error);
    throw error;
  }
};

const createCompany = async (data) => {
  try {
    const response = await api.post("/companies", data);
    return response.data;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

const updateCompany = async (id, data) => {
  try {
    const response = await api.put(`/companies/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};

const deleteCompany = async (id) => {
  try {
    const response = await api.delete(`/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
};

export {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};
