# Deployment Guide - Render

## Prerequisites

1. **GitHub Repository** ✅ (Already done: https://github.com/sheikarshath941-oss/Real-Estate-App)
2. **MongoDB Atlas Account** - Create at https://www.mongodb.com/cloud/atlas
3. **Render Account** - Sign up at https://render.com

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Add your IP to the IP Whitelist (or use 0.0.0.0/0 for development)
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/real-estate`

## Step 2: Deploy to Render

### Option A: Using render.yaml (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository (sheikarshath941-oss/Real-Estate-App)
4. Select **main** branch
5. Render will automatically detect `render.yaml` and use those settings

### Option B: Manual Setup

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name:** real-estate-app
   - **Environment:** Node
   - **Region:** Oregon (or nearest to you)
   - **Branch:** main
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free (or Pro for better performance)

## Step 3: Configure Environment Variables on Render

In the Render dashboard for your service:

1. Go to **Environment** section
2. Add these environment variables:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/real-estate
JWT_SECRET=your-very-secure-secret-key-here
JWT_EXPIRE=7d
```

**Important:** Replace:
- `username` and `password` with your MongoDB Atlas credentials
- `cluster` with your actual cluster name
- `JWT_SECRET` with a strong, unique secret key

## Step 4: Build and Deploy

1. Render will automatically trigger a build when you push to the main branch
2. Monitor the build logs in the Render dashboard
3. Once deployed, you'll get a URL like: `https://real-estate-app.onrender.com`

## Step 5: Test Your Deployment

```bash
# Test the API
curl https://your-app-name.onrender.com/api/health

# Expected response:
# {"message":"Server is running"}
```

## Troubleshooting

### MongoDB Connection Error
- Verify your connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure credentials are accurate

### Build Failure
- Check build logs in Render dashboard
- Ensure all dependencies are installed correctly
- Verify Node version is compatible (v14+)

### Service Not Starting
- Check start command: `npm start`
- Verify PORT environment variable (Render auto-assigns this)
- Check server logs for errors

## Frontend URL Configuration

After deployment, update your frontend API calls if needed:

In `client/src/services/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

During production build, the frontend is bundled with the backend, so the proxy works automatically.

## Automatic Deployments

Every time you push to the `main` branch on GitHub:
1. Render detects the change
2. Triggers a new build
3. Deploys automatically if build succeeds

To disable auto-deployments, go to **Settings** → **Auto-deploy** in your Render dashboard.

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| NODE_ENV | Deployment environment | production |
| MONGODB_URI | Database connection string | mongodb+srv://... |
| JWT_SECRET | Secret key for JWT tokens | your-secret-key |
| JWT_EXPIRE | Token expiration time | 7d |
| PORT | Server port (auto-assigned by Render) | 10000 |

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user credentials set
- [ ] Environment variables configured on Render
- [ ] Repository pushed to GitHub
- [ ] Render service created
- [ ] Health endpoint responding
- [ ] Frontend loads correctly
- [ ] Authentication endpoints working
- [ ] Property endpoints working

## SSL/HTTPS

Render automatically provides SSL certificates for your domain. Your app is secured with HTTPS by default.

## Performance Tips

- **Free Plan:** App may spin down after 15 minutes of inactivity
- **Pro Plan ($7/month):** Always-on, better performance
- **Database:** Keep MongoDB queries optimized
- **Images:** Consider CDN for property images in future

## Monitoring

In the Render dashboard, monitor:
- Build logs
- Runtime logs
- CPU and memory usage
- Network requests

## Support

- Render Documentation: https://render.com/docs
- MongoDB Documentation: https://docs.mongodb.com
- Real Estate App GitHub: https://github.com/sheikarshath941-oss/Real-Estate-App
