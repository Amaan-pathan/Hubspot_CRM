# ⚡ QUICK START - Deploy Frontend to Render (5 Steps)

## Your Current Status
- ✅ Backend running: `https://hubspot-crm-p324.onrender.com`
- ✅ Code on GitHub: `Amaan-pathan/Hubspot_CRM`
- ✅ All config files ready

## 5-Step Deployment

### Step 1: Go to Render
```
https://dashboard.render.com
→ Click "New +" 
→ Select "Web Service"
```

### Step 2: Connect GitHub
```
→ Select "Deploy an existing repo"
→ Paste: https://github.com/Amaan-pathan/Hubspot_CRM
→ Connect
```

### Step 3: Configure
```
Name:                 hubspot-crm-frontend
Runtime:              Static Site
Build Command:        cd frontend && npm install && npm run build
Publish directory:    frontend/dist
Branch:               main
```

### Step 4: Environment Variable
```
Key:   VITE_BACKEND_URL
Value: https://hubspot-crm-p324.onrender.com/api
```

### Step 5: Deploy!
```
→ Click "Create Web Service"
→ Wait 2-3 minutes
→ Get your URL: https://hubspot-crm-frontend.onrender.com
```

## Verify It Works
```
✓ Visit your frontend URL
✓ Open DevTools (F12) → Console → No errors?
✓ Try creating a contact
✓ Check Network tab → POST to backend URL?
✓ See contact in table?
```

## Your Final URLs
- Frontend: `https://hubspot-crm-frontend.onrender.com`
- Backend: `https://hubspot-crm-p324.onrender.com`
- GitHub: `https://github.com/Amaan-pathan/Hubspot_CRM`

## Issues?
| Problem | Solution |
|---------|----------|
| Build fails | Check Render logs → fix error → push to GitHub |
| 404 on frontend | Hard refresh or wait 5 min |
| API not connecting | Verify VITE_BACKEND_URL environment variable |
| Backend down | Visit health endpoint to check |

---

**That's it! Your app will be live in ~10 minutes** 🚀
