# HubSpot CRM Sync Application

A full-stack application that enables bidirectional synchronization between your local CRM database and HubSpot. Built with Node.js/Express backend, React frontend, and MongoDB database.

## Features

- **Bidirectional Sync**: Automatically sync contacts and companies between your app and HubSpot
- **Real-time Webhooks**: Listen to HubSpot events and update your database instantly
- **Conflict Resolution**: Track and resolve sync conflicts when data differs between systems
- **REST API**: Complete CRUD operations for contacts and companies
- **Production Ready**: Error handling, logging, validation, and timeouts configured

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.2.1
- **Database**: MongoDB (Mongoose 9.1.3)
- **Queue**: Bull with Redis support
- **API Client**: Axios

### Frontend
- **Framework**: React 19.2.0
- **Bundler**: Vite 7.2.4
- **Router**: React Router DOM 7.12.0
- **HTTP Client**: Axios

## Project Structure

```
backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Entry point
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   ├── hubspot.js         # HubSpot config
│   │   └── redis.js           # Redis config
│   ├── controllers/
│   │   ├── contact.controller.js
│   │   ├── company.controller.js
│   │   └── webhook.controller.js
│   ├── models/
│   │   ├── Contact.js
│   │   ├── Company.js
│   │   ├── SyncLog.js
│   │   └── Conflict.js
│   ├── services/
│   │   ├── hubspot.service.js
│   │   └── sync.service.js
│   ├── routes/
│   │   ├── contact.routes.js
│   │   ├── company.routes.js
│   │   └── webhook.routes.js
│   ├── middlewares/
│   │   └── error.middleware.js
│   └── utils/
│       ├── logger.js
│       └── rateLimiter.js
├── package.json
├── .env.example
└── .gitignore

frontend/
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Main app component with router
│   ├── pages/
│   │   ├── Contacts.jsx
│   │   └── Companies.jsx
│   ├── components/
│   │   ├── ContactForm.jsx
│   │   ├── CompanyForm.jsx
│   │   ├── SyncStatus.jsx
│   │   ├── ConflictResolver.jsx
│   │   └── ErrorBoundary.jsx
│   ├── services/
│   │   ├── contactService.js
│   │   └── companyService.js
│   ├── utils/
│   │   └── api.js
│   └── styles/
│       ├── App.css
│       ├── Page.css
│       ├── Form.css
│       ├── SyncStatus.css
│       └── ConflictResolver.css
├── package.json
├── vite.config.js
└── index.html
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or connection string)
- Redis (for job queue)
- HubSpot API credentials

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your credentials:
   ```
   PORT=5050
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/hubspot_crm
   REDIS_URL=redis://localhost:6379
   HUBSPOT_ACCESS_TOKEN=your_hubspot_token_here
   HUBSPOT_WEBHOOK_SECRET=your_webhook_secret_here
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

   Or start production server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

   Build for production:
   ```bash
   npm run build
   ```

## API Endpoints

### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get contact by ID
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `POST /api/companies` - Create new company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Webhooks
- `POST /api/webhooks` - Receive HubSpot webhook events

### Health
- `GET /health` - Health check endpoint

## Environment Variables

### Backend (.env)
```
PORT=5050
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/hubspot_crm
REDIS_URL=redis://localhost:6379
HUBSPOT_ACCESS_TOKEN=
HUBSPOT_WEBHOOK_SECRET=
```

## Error Handling

The application includes comprehensive error handling:
- Request/response validation
- Database connection timeouts
- HubSpot API error handling
- Frontend error boundaries for React errors
- Retry functionality for failed network requests
- Structured logging with timestamps

## Production Deployment

### On Render

1. **Backend**:
   - Set environment variables in Render dashboard
   - Deploy from GitHub (auto-detects Node.js)
   - Health check: `GET https://your-app.onrender.com/health`

2. **Frontend**:
   - Build with `npm run build`
   - Deploy to Render Static Site or Vercel
   - Set backend API URL in environment variables

### Local Testing

```bash
# Backend health check
curl http://localhost:5050/health

# Create contact
curl -X POST http://localhost:5050/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","email":"john@example.com"}'

# Get all contacts
curl http://localhost:5050/api/contacts
```

## Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Verify MONGO_URI is accessible
- Check for required environment variables: `MONGO_URI` required

### HubSpot sync not working
- Verify `HUBSPOT_ACCESS_TOKEN` is set
- Check token has correct permissions in HubSpot
- Review sync logs in database

### Frontend API errors
- Check backend is running: `curl http://localhost:5050/health`
- Verify `VITE_API_URL` in frontend configuration
- Check browser console for detailed error messages
- Use retry button on error messages

### Webhook not receiving updates
- Verify `HUBSPOT_WEBHOOK_SECRET` is set
- Check webhook is registered in HubSpot settings
- Verify your backend is accessible from HubSpot

## Performance Optimizations

- Database indexes on frequently queried fields
- Connection pooling for MongoDB
- Request timeouts to prevent hanging
- Async/await for non-blocking operations
- Error recovery with conflict logging

## Security

- Environment variables for sensitive data
- HMAC-SHA256 webhook signature verification
- CORS configured for specific origins
- Input validation on all endpoints
- Error messages don't expose sensitive details

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For issues or questions, please check the troubleshooting section or review the code comments.
