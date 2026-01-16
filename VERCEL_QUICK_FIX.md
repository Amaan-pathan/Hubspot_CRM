# Vercel 404 Fix - Quick Checklist

## ✅ What's Been Fixed in Code

- [x] Updated `vite.config.js` with build optimizations
- [x] Updated `vercel.json` with SPA routing configuration
- [x] Added `public/_redirects` for routing fallback
- [x] Updated `frontend/src/utils/api.js` to use environment variables
- [x] Created `.env.example` for reference
- [x] All changes committed and pushed to GitHub

## 🔧 What You Need to Do on Vercel Dashboard

### Step 1: Add Environment Variable
1. Visit: https://vercel.com/dashboard
2. Click your project: **hubspot-crm-ruby**
3. Go to: **Settings** → **Environment Variables**
4. Click: **Add New**
5. Fill in:
   - Name: `VITE_BACKEND_URL`
   - Value: `https://hubspot-crm-p324.onrender.com/api`
   - Environments: **All** (select all checkboxes)
6. Click: **Save**

### Step 2: Redeploy
1. Go to: **Deployments**
2. Find the latest deployment
3. Click the three dots (⋯) → **Redeploy**
4. Wait 2-3 minutes for build to complete

### Step 3: Verify
1. Visit: https://hubspot-crm-ruby.vercel.app/
2. Should see React app (not 404 page)
3. Open DevTools (F12) → Console
4. Should see no errors
5. Try creating a contact to test

## ✅ Success Signs

- [ ] Landing page loads (see React app, not 404)
- [ ] DevTools console shows no errors
- [ ] API calls go to `https://hubspot-crm-p324.onrender.com/api`
- [ ] Can click between Contacts/Companies pages
- [ ] Can create a contact without errors

## 🚨 If Still Getting 404

Try these in order:
1. **Hard refresh**: Press Ctrl+Shift+R (or Cmd+Shift+R on Mac)
2. **Check environment variable**: Go to Vercel Settings → Environment Variables
3. **Wait for build**: Sometimes it takes 5 minutes
4. **Clear Vercel cache**: Deployments → Latest → Three dots → **Advanced** → **Clear Cache** → Redeploy
5. **Check build logs**: Click failed deployment to see error details

## 📋 Deployment URLs

| Service | URL |
|---------|-----|
| Frontend (Vercel) | https://hubspot-crm-ruby.vercel.app/ |
| Backend (Render) | https://hubspot-crm-p324.onrender.com |
| Backend Health | https://hubspot-crm-p324.onrender.com/health |

## 📚 Reference

- Full guide: See `VERCEL_DEPLOYMENT_FIX.md`
- Changes made: See last commit `f7d4b1d`
- GitHub repo: https://github.com/Amaan-pathan/Hubspot_CRM

---

**Next Step**: Add the environment variable on Vercel dashboard and redeploy!
