# Vercel Deployment Fix Guide

## Problem
Getting `404: NOT_FOUND` when accessing `https://hubspot-crm-ruby.vercel.app/`

## Root Cause
Vercel is not configured to serve your React SPA (Single Page Application). By default, Vercel expects a static site with specific paths, not a client-side router.

## Solution

### Step 1: Environment Variables on Vercel
1. Go to https://vercel.com/dashboard
2. Select your project (`hubspot-crm-ruby`)
3. Click **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `VITE_BACKEND_URL`
   - **Value**: `https://hubspot-crm-p324.onrender.com/api`
   - **Environments**: Select all (Production, Preview, Development)
5. Click **Save**

### Step 2: Verify Configuration Files
The following files have been updated:

✅ **`frontend/vite.config.js`** - Now includes build configuration
✅ **`frontend/vercel.json`** - Rewrites all routes to index.html
✅ **`frontend/public/_redirects`** - Alternative routing config
✅ **`frontend/src/utils/api.js`** - Uses environment variable for backend URL

### Step 3: Redeploy
After saving environment variables:
1. Go to **Deployments**
2. Click the three dots (⋯) on the latest deployment
3. Select **Redeploy**
4. Wait 2-3 minutes for the build to complete

### Step 4: Verify the Deployment
1. Visit https://hubspot-crm-ruby.vercel.app/
2. You should see the React app (not the 404 page)
3. Open DevTools → Console
4. You should see API calls going to your Render backend
5. Try creating a contact - it should work!

## Troubleshooting

### Still seeing 404?
1. **Hard refresh** (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. **Clear browser cache**
3. **Check Vercel deployment status** - ensure build succeeded
4. **Wait 5 minutes** - sometimes DNS propagation takes time

### API calls failing?
1. Check DevTools → Network tab
2. API calls should go to `https://hubspot-crm-p324.onrender.com/api`
3. If going to Vercel, environment variable isn't set correctly

### Build failing on Vercel?
1. Go to **Deployments** → Click failed build
2. Scroll down to see error logs
3. Common fixes:
   - Clear cache and redeploy
   - Ensure `VITE_BACKEND_URL` is set
   - Check `package.json` has all dependencies

## How It Works

**Before (What was wrong):**
```
User visits: https://hubspot-crm-ruby.vercel.app/
Vercel looks for: /index.html or /  (as static file)
Not found → 404 error
```

**After (Now fixed):**
```
User visits: https://hubspot-crm-ruby.vercel.app/
Vercel checks: vercel.json rewrites ✓
Serves: dist/index.html ✓
React router handles all client-side routes ✓
API calls go to backend: https://hubspot-crm-p324.onrender.com/api ✓
```

## What Changed

### vite.config.js
Added build optimization for production:
- Output directory: `dist`
- Minification enabled
- Source maps disabled for smaller bundle

### vercel.json
Configured SPA routing:
- All routes → `/index.html`
- Environment variable for backend URL

### public/_redirects
Added fallback routing rule for all paths

### frontend/src/utils/api.js
Now reads backend URL from environment:
```javascript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://hubspot-crm-p324.onrender.com/api";
```

## Testing After Deployment

### Test 1: Check if app loads
```bash
curl https://hubspot-crm-ruby.vercel.app/
# Should return HTML with React app, not 404
```

### Test 2: Check API connectivity
1. Open https://hubspot-crm-ruby.vercel.app/ in browser
2. DevTools → Console
3. You should see no errors
4. Try creating a contact

### Test 3: Test all routes
- Click "Contacts" → Should load contacts page
- Click "Companies" → Should load companies page
- Create a contact → Should sync to HubSpot

## Common Questions

**Q: Why do I need vercel.json?**
A: It tells Vercel to serve index.html for all routes (SPA behavior)

**Q: Why VITE_BACKEND_URL instead of just hardcoding?**
A: Allows different backends for dev/staging/production without code changes

**Q: Can I use .env files on Vercel?**
A: Yes, via Environment Variables in dashboard. Files like .env.local are only for local development

**Q: How do I revert to old version if something breaks?**
A: Go to Deployments → Click any previous deployment → Click "Redeploy"

## Summary

You now have:
- ✅ Proper SPA routing on Vercel
- ✅ Environment-based backend URL
- ✅ Build optimizations
- ✅ Production-ready configuration

Your frontend should now work correctly on Vercel!
