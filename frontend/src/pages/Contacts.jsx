import { useState, useEffect } from "react";
import {
  getAllContacts,
  deleteContact,
} from "../services/contactService";
import ContactForm from "../components/ContactForm";
import SyncStatus from "../components/SyncStatus";
import "../styles/Page.css";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await getAllContacts();
      setContacts(response.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch contacts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(id);
        fetchContacts();
      } catch (err) {
        setError("Failed to delete contact");
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  const handleFormSuccess = () => {
    fetchContacts();
    handleFormClose();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Contacts</h1>
        <button className="btn btn-primary" onClick={handleAddContact}>
          + Add Contact
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading contacts...</div>
      ) : contacts.length === 0 ? (
        <div className="empty-state">
          <p>No contacts found. Create one to get started!</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Sync Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.firstName}</td>
                  <td>{contact.lastName || "-"}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone || "-"}</td>
                  <td>
                    <SyncStatus entity={contact} />
                  </td>
                  <td className="actions">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleEditContact(contact)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteContact(contact._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <ContactForm
          contact={editingContact}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default Contacts;
