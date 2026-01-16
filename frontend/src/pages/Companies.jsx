import { useState, useEffect } from "react";
import {
  getAllCompanies,
  deleteCompany,
} from "../services/companyService";
import CompanyForm from "../components/CompanyForm";
import SyncStatus from "../components/SyncStatus";
import "../styles/Page.css";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await getAllCompanies();
      setCompanies(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch companies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = () => {
    setEditingCompany(null);
    setShowForm(true);
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleDeleteCompany = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await deleteCompany(id);
        fetchCompanies();
      } catch (err) {
        setError("Failed to delete company");
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCompany(null);
  };

  const handleFormSuccess = () => {
    fetchCompanies();
    handleFormClose();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Companies</h1>
        <button className="btn btn-primary" onClick={handleAddCompany}>
          + Add Company
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button
            onClick={() => fetchCompanies()}
            style={{
              marginLeft: "1rem",
              padding: "0.25rem 0.75rem",
              fontSize: "0.875rem",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading companies...</div>
      ) : companies.length === 0 ? (
        <div className="empty-state">
          <p>No companies found. Create one to get started!</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Domain</th>
                <th>Industry</th>
                <th>Sync Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies && companies.length > 0 ? (
                companies.map((company) => (
                  <tr key={company._id}>
                    <td>{company.name || "-"}</td>
                    <td>{company.domain || "-"}</td>
                    <td>{company.industry || "-"}</td>
                    <td>
                      <SyncStatus entity={company} />
                    </td>
                    <td className="actions">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleEditCompany(company)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteCompany(company._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>
                    No companies to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <CompanyForm
          company={editingCompany}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default Companies;
