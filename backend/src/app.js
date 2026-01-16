// const express = require("express");
// const cors = require("cors");

// const contactRoutes = require("./routes/contact.routes");
// const companyRoutes = require("./routes/company.routes");
// const webhookRoutes = require("./routes/webhook.routes");

// const errorMiddleware = require("./middlewares/error.middleware");

// const app = express();


// app.use((req, res, next) => {
//   let data = "";
//   req.on("data", (chunk) => {
//     data += chunk;
//   });
//   req.on("end", () => {
//     req.rawBody = data;
//     next();
//   });
// });

// // Global Middlewares
// app.use(cors());
// app.use(express.json());

// // Health check
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK", message: "Backend is running" });
// });

// // Routes
// app.use("/api/contacts", contactRoutes);
// app.use("/api/companies", companyRoutes);
// app.use("/api/webhooks", webhookRoutes);

// // Error Handler (must be last)
// app.use(errorMiddleware);

// module.exports = app;

const express = require("express");
const cors = require("cors");

const contactRoutes = require("./routes/contact.routes");
const companyRoutes = require("./routes/company.routes");
const webhookRoutes = require("./routes/webhook.routes");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// -------------------------------
// Global Middlewares
// -------------------------------
app.use(cors());
app.use(express.json()); // normal JSON parsing for app CRUD

// -------------------------------
// Health check
// -------------------------------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend is running" });
});

// -------------------------------
// Routes
// -------------------------------

// Contacts and Companies routes (normal JSON)
app.use("/api/contacts", contactRoutes);
app.use("/api/companies", companyRoutes);

// Webhook route: capture raw body for signature verification
app.use(
  "/api/webhooks",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString(); // store raw body for signature validation
    },
  }),
  webhookRoutes
);

// -------------------------------
// Error Handler (must be last)
// -------------------------------
app.use(errorMiddleware);

module.exports = app;
