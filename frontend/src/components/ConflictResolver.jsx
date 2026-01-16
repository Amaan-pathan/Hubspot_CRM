import { useState } from "react";
import "../styles/ConflictResolver.css";

const ConflictResolver = ({ conflict, onResolve, onClose }) => {
  const [resolution, setResolution] = useState(null);

  const handleResolve = (strategy) => {
    if (onResolve) {
      onResolve(conflict._id, strategy);
    }
  };

  const appData = conflict.appData || {};
  const hubspotData = conflict.hubspotData || {};
  const conflictFields = conflict.conflictFields || [];

  return (
    <div className="modal-overlay">
      <div className="modal conflict-modal">
        <div className="modal-header">
          <h2>Resolve Data Conflict</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="conflict-content">
          <div className="entity-info">
            <p className="entity-type">
              <strong>Type:</strong> {conflict.entityType}
            </p>
            <p className="conflict-fields">
              <strong>Conflicting Fields:</strong> {conflictFields.join(", ")}
            </p>
          </div>

          <div className="comparison">
            <div className="comparison-section">
              <h3>App Version</h3>
              <div className="data-display">
                {Object.entries(appData).map(([key, value]) => (
                  <div key={key} className="data-row">
                    <span className="label">{key}:</span>
                    <span className="value">{String(value)}</span>
                  </div>
                ))}
              </div>
              <button
                className="btn btn-info"
                onClick={() => handleResolve("APP_WINS")}
              >
                Use App Version
              </button>
            </div>

            <div className="comparison-divider">VS</div>

            <div className="comparison-section">
              <h3>HubSpot Version</h3>
              <div className="data-display">
                {Object.entries(hubspotData).map(([key, value]) => (
                  <div key={key} className="data-row">
                    <span className="label">{key}:</span>
                    <span className="value">{String(value)}</span>
                  </div>
                ))}
              </div>
              <button
                className="btn btn-warning"
                onClick={() => handleResolve("HUBSPOT_WINS")}
              >
                Use HubSpot Version
              </button>
            </div>
          </div>

          <div className="conflict-actions">
            <button
              className="btn btn-success"
              onClick={() => handleResolve("MERGED")}
            >
              Merge Both
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConflictResolver;
