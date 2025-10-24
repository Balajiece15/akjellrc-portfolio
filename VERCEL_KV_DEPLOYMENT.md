# 🚀 Vercel Pro Deployment with KV Storage

This guide will help you deploy your AkjellRC Portfolio website to Vercel Pro with persistent KV (Redis) storage for speed runs and build logs.

## 📋 Prerequisites

- ✅ Vercel Pro subscription (you have this!)
- ✅ GitHub account with repository access
- ✅ Node.js 18+ installed locally

## 🗄️ Step 1: Set Up Vercel KV Database

### 1.1 Create KV Database
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** tab
3. Click **"Create Database"**
4. Select **"KV (Redis)"**
5. Name it: `akjellrc-storage`
6. Choose region closest to your users (recommended: US East for fastest performance)

### 1.2 Connect to Project
1. In the KV database settings, click **"Connect Project"**
2. Select your `akjellrc-portfolio` project
3. Vercel will automatically add these environment variables:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

## 🌐 Step 2: Deploy to Vercel

### 2.1 Auto Deployment (Recommended)
1. Push your latest changes to GitHub:
   ```bash
   git add .
   git commit -m "Add Vercel KV storage integration"
   git push origin main
   ```

2. Vercel will automatically detect the changes and deploy

### 2.2 Manual Deployment
If auto-deployment isn't set up:

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

## 🔧 Step 3: Verify Environment Variables

### 3.1 Check KV Variables
1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Verify these exist:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

### 3.2 Add Custom Variables (Optional)
For enhanced security, you can add:
- `ADMIN_PASSWORD` (set to your preferred admin password)
- `NODE_ENV` (set to "production")

## 🧪 Step 4: Test Your Deployment

### 4.1 Test Website Access
1. Visit your deployed URL (e.g., `https://akjellrc-portfolio.vercel.app`)
2. Verify all pages load correctly
3. Check that videos and images display properly

### 4.2 Test Admin Authentication
1. Navigate to Speed Run Garage or Basher Fleet
2. Try to add a new entry (should prompt for admin login)
3. Use your admin password (`akjellrc2025` or `admin123`)
4. Verify you can add/edit/delete entries

### 4.3 Test Data Persistence
1. Add a test speed run or build entry
2. Refresh the page
3. Verify the data persists (it should!)
4. Check from different browsers/devices

## 📊 Step 5: Monitor Your KV Database

### 5.1 View KV Data
1. Go to Vercel Dashboard → Storage → your KV database
2. Use the **"Data Browser"** to view stored data
3. You should see keys: `speed_runs` and `build_entries`

### 5.2 KV Usage Monitoring
- **Vercel Pro includes**: 100,000 KV operations/month
- Monitor usage in the Storage dashboard
- Your RC logs should use minimal operations

## 🔄 Step 6: Data Migration (If Needed)

If you have existing data in localStorage that you want to migrate:

### 6.1 Export Existing Data
1. Open browser console on your current site
2. Run: `console.log(JSON.stringify(localStorage.getItem('speedRuns')))`
3. Copy the output

### 6.2 Import to KV
Use the admin interface to manually add entries, or contact support for bulk import.

## 🚀 Features Now Available

### ✅ **Persistent Storage**
- Speed runs and build logs stored in Vercel KV
- Data survives deployments and browser changes
- Accessible from any device

### ✅ **Admin Authentication**
- Secure admin login system
- Public viewing, admin-only editing
- Password protection for data modification

### ✅ **API Endpoints**
- `/api/speed-runs` - CRUD operations for speed runs
- `/api/build-logs` - CRUD operations for build logs
- RESTful API design with proper error handling

### ✅ **Enhanced Components**
- `SpeedLogKV` - KV-enabled speed run logging
- `BuildLogKV` - KV-enabled build log management
- Loading states and error handling
- Real-time data synchronization

## 🔍 Troubleshooting

### Issue: "Cannot find module '@vercel/kv'"
**Solution**: Install dependencies after deployment
```bash
npm install @vercel/kv
```

### Issue: KV operations failing
**Solution**: Check environment variables are set correctly in Vercel Dashboard

### Issue: Admin login not working
**Solution**: Verify admin password in authentication system

### Issue: Data not persisting
**Solution**: 
1. Check KV database connection
2. Verify API routes are deployed
3. Check browser console for errors

## 📱 Mobile Optimization

Your site is already mobile-optimized with:
- Responsive design with Tailwind CSS
- Touch-friendly admin interface
- Mobile-optimized form inputs
- Fast loading on mobile networks

## 🔐 Security Features

- **Password-protected admin access**
- **API validation and error handling**
- **Secure KV token management**
- **HTTPS encryption** (automatic with Vercel)

## 💡 Pro Tips

1. **Backup Strategy**: KV data is automatically backed up by Vercel
2. **Performance**: KV operations are extremely fast (sub-millisecond)
3. **Scaling**: Your setup can handle thousands of entries
4. **Cost**: Very cost-effective with Vercel Pro's included KV quota

## 📞 Support

If you encounter issues:
1. Check the Vercel Dashboard for deployment logs
2. Use browser developer tools to check for console errors
3. Verify KV database connectivity in the Vercel Storage dashboard

---

## 🎉 Congratulations!

Your AkjellRC Portfolio is now deployed with:
- ✅ Vercel Pro hosting
- ✅ KV Redis storage
- ✅ Admin authentication
- ✅ Persistent data storage
- ✅ Mobile-optimized interface
- ✅ Professional deployment setup

Your RC car logs will now persist forever and be accessible from anywhere! 🏁