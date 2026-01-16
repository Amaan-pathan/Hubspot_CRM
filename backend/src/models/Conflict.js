const mongoose = require("mongoose");

const conflictSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      enum: ["CONTACT", "COMPANY"],
    },
    entityId: mongoose.Schema.Types.ObjectId,
    hubspotId: String,
    appData: mongoose.Schema.Types.Mixed,
    hubspotData: mongoose.Schema.Types.Mixed,
    conflictFields: [String],
    resolved: {
      type: Boolean,
      default: false,
    },
    resolvedAt: Date,
    resolutionStrategy: {
      type: String,
      enum: ["APP_WINS", "HUBSPOT_WINS", "MERGED"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conflict", conflictSchema);
