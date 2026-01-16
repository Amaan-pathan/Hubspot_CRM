# CRM Sync Frontend

A React-based frontend for the HubSpot CRM integration app. Connects to the backend running on `https://hubspot-crm-p324.onrender.com`.

## Folder Structure

```
src/
├── components/
│   ├── ContactForm.jsx          # Modal form for creating/editing contacts
│   ├── CompanyForm.jsx          # Modal form for creating/editing companies
│   ├── SyncStatus.jsx           # Component displaying sync status badge
│   └── ConflictResolver.jsx     # Modal for resolving data conflicts
├── pages/
│   ├── Contacts.jsx             # Contacts table and list page
│   └── Companies.jsx            # Companies table and list page
├── services/
│   ├── contactService.js        # API calls for contacts (get, create, update, delete)
│   └── companyService.js        # API calls for companies
├── utils/
│   └── api.js                   # Axios instance configured with backend baseURL
├── styles/
│   ├── App.css                  # Main app styling and navbar
│   ├── Page.css                 # Pages, tables, buttons styling
│   ├── Form.css                 # Form and modal styling
│   ├── SyncStatus.css           # Sync status badges styling
│   └── ConflictResolver.css     # Conflict resolver modal styling
├── App.jsx                      # Main app with routing
└── main.jsx                     # Entry point
```

## Features

### Pages
- **Contacts**: View all contacts in a table, create, edit, delete, and see sync status
- **Companies**: View all companies in a table, create, edit, delete, and see sync status

### Components
- **ContactForm & CompanyForm**: Modal forms for create/update operations
- **SyncStatus**: Displays sync status badges (APP/HUBSPOT source, synced/pending to HubSpot)
- **ConflictResolver**: Side-by-side comparison of app vs HubSpot data with resolution options

### API Integration
- All API calls use axios with baseURL configured to `https://hubspot-crm-p324.onrender.com/api`
- Services for contacts and companies with CRUD functions
- Error handling with user-friendly messages

### Routing
- `/contacts` → Contacts page
- `/companies` → Companies page
- `/` → Redirects to `/contacts`

## Getting Started

### Prerequisites
- Node.js 16+
- Backend running on `https://hubspot-crm-p324.onrender.com`

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build
```bash
npm run build
```

## API Endpoints

The frontend connects to the backend at `https://hubspot-crm-p324.onrender.com/api`:

- `GET /contacts` - Get all contacts
- `GET /contacts/:id` - Get contact by ID
- `POST /contacts` - Create contact
- `PUT /contacts/:id` - Update contact
- `DELETE /contacts/:id` - Delete contact

- `GET /companies` - Get all companies
- `GET /companies/:id` - Get company by ID
- `POST /companies` - Create company
- `PUT /companies/:id` - Update company
- `DELETE /companies/:id` - Delete company

## Dependencies

- **React 19** - UI framework
- **react-router-dom 7** - Client-side routing
- **axios** - HTTP client for API calls
- **Vite** - Build tool and dev server

## Styling

The app uses custom CSS with a clean, professional design:
- Responsive layout (mobile-friendly)
- Color scheme: Blue (#3498db), Dark Gray (#2c3e50), Light Gray (#ecf0f1)
- Tables with hover effects
- Modal overlays for forms and conflict resolution
- Status badges for sync information

## Future Enhancements

- Add pagination to contacts/companies tables
- Real-time sync status updates
- Webhook notifications for new conflicts
- Advanced filtering and search
- Export data to CSV
