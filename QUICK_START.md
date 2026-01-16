# Quick Start Guide

## For Developers

### First Time Setup (5 minutes)

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and HubSpot credentials
npm run dev  # Starts on http://localhost:5050
```

#### Frontend
```bash
cd frontend
npm install
npm run dev  # Starts on http://localhost:5173
```

Visit http://localhost:5173 in your browser.

### Common Commands

**Backend**:
```bash
npm run dev     # Development with hot reload
npm start       # Production mode
npm test        # Run tests
```

**Frontend**:
```bash
npm run dev     # Development server
npm run build   # Create production build
npm run lint    # Check code style
npm run preview # Preview production build
```

## API Quick Reference

### Create a Contact
```bash
curl -X POST http://localhost:5050/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }'
```

### Get All Contacts
```bash
curl http://localhost:5050/api/contacts
```

### Update a Contact
```bash
curl -X PUT http://localhost:5050/api/contacts/{id} \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Jane"}'
```

### Delete a Contact
```bash
curl -X DELETE http://localhost:5050/api/contacts/{id}
```

### Same for Companies
Replace `/contacts` with `/companies` and use appropriate fields: `name`, `domain`, `industry`

## Environment Variables

### Required
- `MONGO_URI`: MongoDB connection string
  - Local: `mongodb://localhost:27017/hubspot_crm`
  - Remote: `mongodb+srv://user:pass@cluster.mongodb.net/hubspot_crm`

### Recommended
- `HUBSPOT_ACCESS_TOKEN`: Get from HubSpot Settings → Private apps
- `HUBSPOT_WEBHOOK_SECRET`: Generated in HubSpot Settings → Webhooks
- `NODE_ENV`: Set to `development` or `production`
- `PORT`: Defaults to `5050`

### Optional
- `REDIS_URL`: For job queues (defaults to localhost)

## Troubleshooting

### "Cannot connect to MongoDB"
- Verify MongoDB is running: `mongosh`
- Check `MONGO_URI` in `.env`
- Ensure connection string format is correct

### "HubSpot sync not working"
- Verify `HUBSPOT_ACCESS_TOKEN` is set in `.env`
- Check token is valid: HubSpot → Settings → Account Setup → Private apps
- Verify token has `crm.objects.contacts.read/write` and `crm.objects.companies.read/write` scopes

### "Webhook not receiving updates"
- Verify `HUBSPOT_WEBHOOK_SECRET` matches HubSpot settings
- Ensure your backend is publicly accessible
- Check webhook is registered in HubSpot: Settings → Objects → Webhooks
- Verify backend is running: `curl http://localhost:5050/health`

### "React errors in console"
- Open browser DevTools → Console
- Check for error messages
- Try refreshing the page
- Clear browser cache if needed

### "API returns 404"
- Verify backend is running: `curl http://localhost:5050/health`
- Check frontend `.env` has correct backend URL
- Verify route path is correct (e.g., `/api/contacts` not `/api/contact`)

## File Structure Quick Reference

**Want to add a feature?**
1. Add MongoDB model in `backend/src/models/`
2. Create controller in `backend/src/controllers/`
3. Add routes in `backend/src/routes/`
4. Create service if external API needed in `backend/src/services/`
5. Build frontend component in `frontend/src/components/`
6. Add page if new section needed in `frontend/src/pages/`

**Adding a new endpoint?**
1. Create controller method
2. Add route that calls it
3. Return `{ success: true/false, message: "...", data: {...} }`
4. Create frontend service call
5. Use in React component

## Performance Tips

- Indexes are already set up on frequently searched fields
- Database connections have timeout configuration
- Frontend requests timeout after 30 seconds
- Use `.catch()` on async sync operations to prevent blocking
- Conflict records are created for failed syncs (review in MongoDB)

## Deployment

**Backend to Render**:
1. Push to GitHub
2. Render auto-detects Node.js app
3. Set environment variables in Render dashboard
4. Auto-deploys on push

**Frontend to Vercel or Render Static**:
1. Run `npm run build`
2. Push dist/ folder to deployment platform
3. Set `VITE_API_URL` if using environment-based API URL

## Getting Help

- Check backend logs: `npm run dev` output
- Check frontend console: DevTools → Console
- Review database: MongoDB Compass or `mongosh`
- Check HubSpot logs: HubSpot Settings → Activity log
- Review sync logs in database: `SyncLog` collection

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# Test locally

# Commit
git add .
git commit -m "feat: description of changes"

# Push
git push origin feature/new-feature

# Create Pull Request on GitHub
```

## Code Style

- Use async/await (not `.then()`)
- Use arrow functions
- Always validate input
- Always wrap async in try/catch
- Return consistent error format: `{ success: false, message: "...", data: null }`
- Add console.error for failures, console.log for info

## Testing Manual Flows

**Contact Sync Flow**:
1. Create contact in app → Check HubSpot (should appear)
2. Create contact in HubSpot → Check app (should sync via webhook)
3. Update contact in app → Check HubSpot (should update)

**Error Handling**:
1. Stop backend → Try API call in frontend → Should show error + retry button
2. Use wrong MongoDB URI → Backend should fail to start with clear error
3. Missing HubSpot token → Should warn in startup logs

## Quick Debugging

```bash
# Check backend health
curl http://localhost:5050/health

# See what routes are available
curl http://localhost:5050/api

# Watch backend logs in real-time
npm run dev

# Check MongoDB directly
mongosh
use hubspot_crm
db.contacts.find()

# Check environment is set
env | grep HUBSPOT
```

## Performance Checklist

- ✅ Backend returns response in < 1 second
- ✅ Frontend loads in < 3 seconds  
- ✅ No N+1 queries (check logs)
- ✅ Images optimized
- ✅ CSS minified in production
- ✅ JS bundled and minified in production

---

**Pro Tips**:
- Use `npm run dev` in both terminals side-by-side for best experience
- Keep `.env` file local only (in `.gitignore`)
- Test webhook locally using ngrok or similar tunnel
- Review sync logs regularly to catch errors early
