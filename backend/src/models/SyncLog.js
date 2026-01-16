const mongoose = require("mongoose");

const syncLogSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      enum: ["CONTACT", "COMPANY"],
    },
    entityId: mongoose.Schema.Types.ObjectId,
    hubspotId: String,
    action: {
      type: String,
      enum: ["CREATE", "UPDATE", "DELETE"],
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
    },
    errorMessage: String,
    startedAt: Date,
    completedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SyncLog", syncLogSchema);
