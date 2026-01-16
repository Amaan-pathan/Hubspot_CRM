# Deploy Frontend on Render - Complete Step-by-Step Guide

## Prerequisites
- Your backend is already running at: `https://hubspot-crm-p324.onrender.com`
- Frontend code is in your GitHub repo: `https://github.com/Amaan-pathan/Hubspot_CRM`
- You have a Render account logged in

## Step 1: Update Frontend Configuration

First, let's ensure your frontend is correctly configured for Render.

### 1.1 Update `.env.production`
Create this file in the `frontend` folder:

```
VITE_BACKEND_URL=https://hubspot-crm-p324.onrender.com/api
```

### 1.2 Update `vite.config.js`
Your frontend vite.config.js should look like:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
  server: {
    port: 5173,
    strictPort: false,
  },
})
```

## Step 2: Create Render Configuration File

Create `render.yaml` in your **project root** (same level as `backend/` and `frontend/`):

```yaml
services:
  - type: web
    name: hubspot-crm-frontend
    runtime: static
    buildCommand: cd frontend && npm install && npm run build
    staticPublicPath: dist
    envVars:
      - key: VITE_BACKEND_URL
        value: https://hubspot-crm-p324.onrender.com/api
    routes:
      - path: /*
        destination: /index.html
```

## Step 3: Deploy on Render

### Step 3.1: Go to Render Dashboard
1. Visit: https://dashboard.render.com
2. Click: **New +** (top right)
3. Select: **Web Service**

### Step 3.2: Connect Repository
1. Click: **Deploy an existing repo**
2. Paste your GitHub URL: `https://github.com/Amaan-pathan/Hubspot_CRM`
3. Click: **Connect**
4. Select your repo from the list

### Step 3.3: Configure Service

Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `hubspot-crm-frontend` |
| **Runtime** | `Static Site` |
| **Build Command** | `cd frontend && npm install && npm run build` |
| **Publish directory** | `frontend/dist` |
| **Branch** | `main` |

### Step 3.4: Add Environment Variables
1. Scroll down to **Environment Variables**
2. Click **Add Environment Variable**
3. Add this:
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: `https://hubspot-crm-p324.onrender.com/api`
4. Click **Save**

### Step 3.5: Deploy
1. Scroll to bottom
2. Click: **Create Web Service**
3. Wait 2-3 minutes for build to complete

## Step 4: Verify Deployment

### 4.1: Check Build Status
1. Once deployed, you'll get a URL like: `https://hubspot-crm-frontend.onrender.com`
2. Render will show build logs
3. Wait for status to change from "Building" to "Live"

### 4.2: Test the Frontend
1. Visit your frontend URL (from Render dashboard)
2. Should see your React app (Contacts page)
3. Open DevTools (F12) → Console
4. Should show no errors
5. Try creating a contact

### 4.3: Verify API Connection
1. Open DevTools → Network tab
2. Try creating a contact
3. Should see requests to: `https://hubspot-crm-p324.onrender.com/api/contacts`
4. Should get successful responses (201 Created)

## Step 5: Set Up Custom Domain (Optional)

If you want a custom domain instead of `onrender.com`:

1. Go to your service on Render
2. Click **Settings**
3. Scroll to **Custom Domain**
4. Enter your domain
5. Follow DNS instructions

## Troubleshooting

### Issue: Build Fails
**Check**: 
- Click deployment → Logs
- Look for error messages
- Common causes:
  - Missing `package.json` in frontend folder
  - Node version incompatibility
  - Missing dependencies

**Fix**:
- Ensure `frontend/package.json` exists
- Run locally: `npm install && npm run build`
- Check for error messages

### Issue: 404 on Frontend URL
**Check**:
- Ensure `Publish directory` is set to `frontend/dist`
- Verify build completed successfully
- Check routes are configured

**Fix**:
- Go to Service Settings → Publish directory
- Verify it shows: `frontend/dist`
- Trigger redeploy

### Issue: API Calls Return 404
**Check**:
- Environment variable is set correctly
- Backend URL is correct
- Backend is running

**Fix**:
```bash
# Test backend
curl https://hubspot-crm-p324.onrender.com/health

# Should return: {"status":"OK","message":"Backend is running"}
```

### Issue: CORS Errors
**Check**:
- Backend CORS configuration

**Fix**:
- Backend already configured for all origins ✓
- Should work automatically

## Deployment Summary

| Component | URL |
|-----------|-----|
| Backend | https://hubspot-crm-p324.onrender.com |
| Frontend | https://hubspot-crm-frontend.onrender.com |
| GitHub | https://github.com/Amaan-pathan/Hubspot_CRM |

## After Deployment

### Test Flows
1. **Create Contact**
   - Open frontend
   - Click "Add Contact"
   - Fill form and submit
   - Should see in table
   - Should sync to HubSpot

2. **Test Sync**
   - Check HubSpot dashboard
   - Contact should appear there
   - If created in HubSpot, should appear in app

### Monitor
- Check Render dashboard occasionally
- Look for errors in logs
- Set up health checks (optional)

## Quick Reference

**Frontend Build Command for Render**:
```bash
cd frontend && npm install && npm run build
```

**Publish Directory**:
```
frontend/dist
```

**Environment Variable**:
```
VITE_BACKEND_URL=https://hubspot-crm-p324.onrender.com/api
```

**Test URLs After Deployment**:
```bash
# Frontend
https://hubspot-crm-frontend.onrender.com/

# Backend health
https://hubspot-crm-p324.onrender.com/health

# API endpoint
https://hubspot-crm-p324.onrender.com/api/contacts
```

---

**Need Help?**
- Check Render logs: Dashboard → Service → Logs
- Test locally first: `cd frontend && npm run build && npm run preview`
- Verify backend is running: `curl /health` endpoint
