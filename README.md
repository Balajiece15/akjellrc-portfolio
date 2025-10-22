# AkjellRC Portfolio Website

A Next.js portfolio website for RC car enthusiast showcasing Speed Run Garage and Basher Fleet collections.

## Features

- **Next.js 14+ with App Router** - Modern React framework with file-based routing
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Dark theme "garage" aesthetic with custom styling
- **Interactive Dashboard** - Personal best tracking and quick stats
- **Speed Run Garage** - Arrma Limitless V1 showcase with speed logging
- **Basher Fleet** - Traxxas X-Maxx showcase with build/repair logging
- **YouTube Integration** - Embedded video galleries
- **Database Ready** - SQLite/Vercel KV for speed runs and build logs
- **Responsive Design** - Mobile-first approach
- **Vercel Ready** - Optimized for deployment

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage dashboard
│   ├── speed-run-garage/  # Speed running section
│   ├── basher-fleet/      # Bashing section
│   └── admin/             # Admin panel
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Site navigation
│   ├── PersonalBestCard.tsx
│   ├── SectionCard.tsx
│   ├── SpecSheet.tsx
│   ├── VideoGallery.tsx
│   ├── SpeedLog.tsx       # Interactive speed logging
│   └── BuildLog.tsx       # Build/repair logging
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

### Quick Deploy

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Custom Domain Setup

1. Add your domain in Vercel dashboard
2. Configure DNS records as instructed
3. Update `next.config.js` if needed

### Database Setup (Optional)

For persistent data storage, you can integrate:

**Option 1: Vercel KV (Redis)**
```bash
npm install @vercel/kv
```

**Option 2: Supabase**
```bash
npm install @supabase/supabase-js
```

**Option 3: Firebase Firestore**
```bash
npm install firebase
```

## Customization

### Theme Colors
Edit `tailwind.config.js` to customize the garage theme:
```javascript
colors: {
  'garage': {
    'darkest': '#0a0a0a',
    'dark': '#1a1a1a',
    'medium': '#2a2a2a',
    'light': '#3a3a3a',
    'accent': '#ff6b35',
    'secondary': '#f7931e',
  }
}
```

### Personal Best
Update the personal best in `src/app/page.tsx` and `src/components/PersonalBestCard.tsx`.

### Vehicle Specs
Modify vehicle specifications in the respective page files.

### Videos
Update YouTube video IDs in the component data.

## Features Overview

### Speed Run Garage
- Arrma Limitless V1 showcase
- Interactive speed log with form submission
- YouTube video embeds
- Detailed specifications
- Personal best tracking

### Basher Fleet  
- Traxxas X-Maxx showcase
- Build and repair log
- Parts upgrade tracking
- Maintenance history

### Admin Panel
- Quick stats overview
- Management shortcuts
- Database status
- Deployment information

## Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier (recommended)
- Consistent component structure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for personal use. Modify as needed for your own RC portfolio.

## Contact

- Website: [akjellrc.com](https://akjellrc.com)
- GitHub: [Your GitHub Profile]

---

Built with ❤️ for the RC community