# Deployment Guide for AkjellRC Portfolio

## Prerequisites

Before deploying, ensure you have:
- A GitHub account
- A Vercel account (free tier available)
- Node.js 18+ installed locally
- Network connectivity to install dependencies

## Step-by-Step Deployment

### 1. Install Dependencies

```bash
# Install all required packages
npm install

# Or use alternative package managers
yarn install
# or
pnpm install
```

### 2. Environment Setup

1. Copy the environment example:
```bash
cp .env.local.example .env.local
```

2. Update `.env.local` with your configuration:
```env
# For production, consider using Vercel KV or Supabase
DATABASE_PROVIDER="sqlite"
NEXT_PUBLIC_SITE_URL="https://akjellrc.com"
```

### 3. Test Locally

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Test production build
npm run start
```

### 4. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: AkjellRC Portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/akjellrc-portfolio.git
git push -u origin main
```

### 5. Deploy to Vercel

#### Option A: Vercel Dashboard
1. Visit [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### 6. Custom Domain Setup

1. In Vercel dashboard, go to your project
2. Navigate to "Settings" → "Domains"
3. Add your custom domain: `akjellrc.com`
4. Configure DNS records as instructed by Vercel:
   ```
   Type: A
   Name: @
   Value: 76.76.19.61

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### 7. Database Configuration (Production)

#### Option A: Vercel KV (Recommended)

1. In Vercel dashboard, go to "Storage"
2. Create a new KV database
3. Add environment variables:
```env
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token
DATABASE_PROVIDER="vercel-kv"
```

#### Option B: Supabase

1. Create a Supabase project
2. Add environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
DATABASE_PROVIDER="supabase"
```

3. Run SQL schema from `src/lib/database.ts`

#### Option C: SQLite (Development Only)
```env
DATABASE_PROVIDER="sqlite"
DATABASE_URL="sqlite:./dev.db"
```

### 8. Performance Optimization

- Enable Vercel Analytics in dashboard
- Configure Speed Insights
- Set up monitoring for Core Web Vitals
- Enable Edge Functions if needed

### 9. Domain and SSL

Vercel automatically provides:
- SSL certificates
- Global CDN
- Automatic deployments
- Branch previews

### 10. Monitoring and Analytics

1. Enable Vercel Analytics
2. Configure monitoring for:
   - Page load times
   - Core Web Vitals
   - Function execution
   - Database queries

## Production Checklist

- [ ] Dependencies installed successfully
- [ ] Local development server running
- [ ] Production build completes without errors
- [ ] Environment variables configured
- [ ] Repository pushed to GitHub
- [ ] Vercel project created and deployed
- [ ] Custom domain configured
- [ ] Database setup and migrated
- [ ] SSL certificate active
- [ ] Performance monitoring enabled

## Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Network Issues
If experiencing network connectivity issues during installation:

1. Check proxy settings:
```bash
npm config get proxy
npm config get https-proxy
```

2. Try alternative registries:
```bash
npm config set registry https://registry.npmjs.org/
```

3. Use yarn or pnpm as alternatives:
```bash
yarn install
# or
pnpm install
```

### Database Issues
- Verify environment variables are set correctly
- Check database connection in production
- Monitor function logs in Vercel dashboard

## Support

- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Tailwind CSS: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

Your AkjellRC portfolio will be live at `https://akjellrc.com` once deployed!