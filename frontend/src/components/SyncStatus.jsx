import "../styles/SyncStatus.css";

const SyncStatus = ({ entity }) => {
  if (!entity) return null;

  const source = entity.source || "UNKNOWN";
  const lastModified = entity.lastModifiedAt
    ? new Date(entity.lastModifiedAt).toLocaleDateString()
    : "N/A";
  const isSynced = entity.hubspotId ? true : false;
  const hubspotStatusText = isSynced ? "Synced" : "Pending";
  const lastModifiedStr = entity.lastModifiedAt ? new Date(entity.lastModifiedAt).toISOString() : "N/A";

  return (
    <div className="sync-status">
      <span className={`status-badge status-${source.toLowerCase()}`}>
        {source}
      </span>
      <span className={`hubspot-badge ${isSynced ? "synced" : "pending"}`}>
        {hubspotStatusText}
      </span>
      <span className="modified-date" title={lastModifiedStr}>
        {lastModified}
      </span>
    </div>
  );
};

export default SyncStatus;
