import "../styles/SyncStatus.css";

const SyncStatus = ({ entity }) => {
  if (!entity) return null;

  const source = entity.source || "UNKNOWN";
  const lastModified = entity.lastModifiedAt
    ? new Date(entity.lastModifiedAt).toLocaleDateString()
    : "N/A";
  const hubspotId = entity.hubspotId ? "✓ Synced" : "⏳ Pending";

  return (
    <div className="sync-status">
      <span className={`status-badge status-${source.toLowerCase()}`}>
        {source}
      </span>
      <span className={`hubspot-badge ${entity.hubspotId ? "synced" : "pending"}`}>
        {hubspotId}
      </span>
      <span className="modified-date" title={entity.lastModifiedAt}>
        Modified: {lastModified}
      </span>
    </div>
  );
};

export default SyncStatus;
