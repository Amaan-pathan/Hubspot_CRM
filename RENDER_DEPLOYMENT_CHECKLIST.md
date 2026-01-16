# Render Frontend Deployment - Quick Checklist

## Pre-Deployment ✅ (Already Done)

- [x] `.env.production` file created
- [x] `vite.config.js` configured for build
- [x] `render.yaml` configuration file created
- [x] All files committed and pushed to GitHub

## Deployment Steps (Do These Now)

### Step 1: Open Render Dashboard
- [ ] Go to: https://dashboard.render.com
- [ ] Login with your account
- [ ] Click **New +** button (top right)

### Step 2: Create Web Service
- [ ] Select: **Web Service**
- [ ] Select: **Deploy an existing repo**
- [ ] Paste: `https://github.com/Amaan-pathan/Hubspot_CRM`
- [ ] Click **Connect**

### Step 3: Configure Service
- [ ] **Name**: `hubspot-crm-frontend`
- [ ] **Runtime**: `Static Site`
- [ ] **Build Command**: `cd frontend && npm install && npm run build`
- [ ] **Publish directory**: `frontend/dist`
- [ ] **Branch**: `main`

### Step 4: Add Environment Variables
- [ ] Click **Add Environment Variable**
- [ ] Key: `VITE_BACKEND_URL`
- [ ] Value: `https://hubspot-crm-p324.onrender.com/api`
- [ ] Click **Save**

### Step 5: Deploy
- [ ] Click **Create Web Service** (blue button at bottom)
- [ ] Wait 2-3 minutes for build to complete

## After Deployment ✅ (Do These to Verify)

### Step 6: Get Your Frontend URL
- [ ] Wait for "Live" status
- [ ] Note your frontend URL (looks like: `https://hubspot-crm-frontend.onrender.com`)

### Step 7: Test Frontend
- [ ] Visit your frontend URL in browser
- [ ] Should see React app (not error page)
- [ ] Open DevTools (F12) → Console
- [ ] Should see NO errors

### Step 8: Test API Connection
- [ ] Open DevTools → Network tab
- [ ] Click "Add Contact" button
- [ ] Fill in form and submit
- [ ] Look at Network tab:
  - [ ] Should see request to `hubspot-crm-p324.onrender.com/api/contacts`
  - [ ] Response status should be 201 (Created)
  - [ ] Contact should appear in table

### Step 9: Verify Sync to HubSpot
- [ ] Log into HubSpot
- [ ] Check if contact appears there
- [ ] If yes, sync is working! ✅

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check Logs tab in Render, ensure package.json exists in frontend folder |
| 404 on frontend URL | Verify "Publish directory" is set to `frontend/dist` |
| API calls fail | Verify backend is running: `curl https://hubspot-crm-p324.onrender.com/health` |
| CORS errors | Not applicable - backend CORS already configured |
| Can't create contacts | Check Network tab - if 404 from backend, backend might be down |

## Final URLs

Once deployed, you'll have:

```
Frontend: https://hubspot-crm-frontend.onrender.com/
Backend:  https://hubspot-crm-p324.onrender.com/
GitHub:   https://github.com/Amaan-pathan/Hubspot_CRM
```

## Quick Commands to Test Locally (Before Deploying)

```bash
# Build frontend
cd frontend && npm run build

# Preview build locally (optional)
npm run preview

# Should create dist folder with production build
```

---

**You're all set! Follow the steps above and your frontend will be live on Render!**
