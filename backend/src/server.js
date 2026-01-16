require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// Validate required environment variables
const requiredEnvVars = ["MONGO_URI"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(
    "ERROR: Missing required environment variables:",
    missingEnvVars.join(", ")
  );
  console.error("Please set these variables in your .env file and try again.");
  process.exit(1);
}

// Warn about optional but important environment variables
if (!process.env.HUBSPOT_ACCESS_TOKEN) {
  console.warn(
    "WARNING: HUBSPOT_ACCESS_TOKEN is not set. HubSpot sync features will not work."
  );
}

if (!process.env.HUBSPOT_WEBHOOK_SECRET) {
  console.warn(
    "WARNING: HUBSPOT_WEBHOOK_SECRET is not set. Webhook signature verification will fail."
  );
}

const PORT = process.env.PORT || 5050;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
})();
