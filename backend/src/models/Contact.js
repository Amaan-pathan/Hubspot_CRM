const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    phone: String,
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
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

module.exports = mongoose.model("Contact", contactSchema);
