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
// CORS Configuration
// -------------------------------
app.use(
  cors({
    origin: "*", // Allow all origins (or specify your frontend domain)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

// -------------------------------
// Global Middlewares
// -------------------------------
app.use(express.json()); // normal JSON parsing for app CRUD

// -------------------------------
// Health check
// -------------------------------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend is running" });
});

// API Root endpoint
app.get("/api", (req, res) => {
  res.status(200).json({ 
    message: "HubSpot CRM API", 
    version: "1.0.0",
    endpoints: ["/api/contacts", "/api/companies", "/api/webhooks"]
  });
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`,
  });
});

// -------------------------------
// Error Handler (must be last)
// -------------------------------
app.use(errorMiddleware);

module.exports = app;
