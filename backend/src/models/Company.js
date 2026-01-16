const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    domain: {
      type: String,
      unique: true,
    },
    industry: String,
    hubspotId: {
      type: String,
      index: true,
    },
    customFields: mongoose.Schema.Types.Mixed,
    lastModifiedAt: Date,
    source: {
      type: String,
      enum: ["APP", "HUBSPOT"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
