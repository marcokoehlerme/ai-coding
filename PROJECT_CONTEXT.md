# Supply Chain Diagnostic Tool - Project Context

## Overview

A professional typeform-style diagnostic tool for supply chain assessment that provides AI-powered personalized feedback. Users answer 15 questions across 5 dimensions and receive actionable insights from a Senior Supply Chain Consultant.

## Tech Stack

- **Next.js 16.1.3** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5.x** - Type-safe JavaScript with strict mode enabled
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Recharts** - Spider/radar chart visualization
- **Anthropic Claude API** - AI-powered feedback generation
- **File-based JSON storage** - No database required

## Key Features

### User Journey
1. **Landing Page** - Clean welcome with CTA button
2. **User Info Collection** - Name, role, company
3. **15-Question Flow** - Typeform-style, one question at a time with progress bar
4. **Email Collection** - Mandatory for viewing results
5. **Results Page** - Spider chart + AI feedback + booking CTA
6. **Admin Dashboard** - View all submissions and analytics

### Question Types
- **Scale (1-5)**: Visual button selection
- **Yes/No**: Yes = 5 points, No = 1 point
- **Dropdown**: Multiple options with custom scoring

### AI Feedback
- Powered by Anthropic Claude API
- Three sections: Key Observation, First Thing To Change, Watch-Outs
- Direct, senior advisor tone
- No scores or numbers mentioned
- Uses "You" language to engage client

### Branding
- **Colors**: #1b5443 (primary dark green), #f5f6f4 (light background)
- **Font**: Inter (Google Fonts)
- **Logo**: PSCM House dark version in top-left corner
- **Buttons**: Dark with rounded edges, light text

## Folder Structure

```
nextjs-app/
├── .next/                  # Next.js build output (auto-generated)
├── node_modules/           # Dependencies
├── public/                 # Static assets (images, fonts, etc.)
│   └── [served at root URL path]
├── src/                    # Source code directory
│   ├── app/               # App Router directory
│   │   ├── layout.tsx     # Root layout component
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles with Tailwind
│   ├── components/        # Reusable React components
│   └── lib/              # Utility functions, helpers, and shared logic
├── .eslintrc.json         # ESLint configuration
├── .gitignore            # Git ignore rules
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration for Tailwind
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

### Directory Purpose

#### `/src/app`
The App Router directory using file-system based routing. Each folder represents a route segment:
- `layout.tsx` - Shared UI wrapper for pages
- `page.tsx` - Route endpoint that renders a page
- Special files: `loading.tsx`, `error.tsx`, `not-found.tsx`

#### `/src/components`
Reusable React components that can be used across multiple pages:
- UI components (buttons, cards, forms, etc.)
- Composite components (headers, footers, navigation)
- Feature-specific components

#### `/src/lib`
Shared utilities and business logic:
- Helper functions
- API client configurations
- Constants and type definitions
- Custom hooks
- Data fetching utilities

#### `/public`
Static files served directly at the root URL:
- Images, icons, and media files
- Fonts
- robots.txt, sitemap.xml, etc.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Next Steps for Development

### 1. Environment Setup
- Create `.env.local` for environment variables
- Configure any external services (databases, APIs, authentication)

### 2. Project Customization
- Update `src/app/layout.tsx` with your app metadata
- Customize Tailwind configuration in `tailwind.config.ts`
- Add custom fonts or modify the default theme

### 3. Component Development
- Create reusable components in `src/components/`
- Build out your UI component library
- Consider adding a component documentation tool (Storybook)

### 4. Routing & Pages
- Add new routes by creating folders in `src/app/`
- Implement layouts for different sections
- Add loading and error states

### 5. Styling
- Extend Tailwind theme with custom colors, spacing, etc.
- Create global CSS utilities in `src/app/globals.css`
- Consider adding shadcn/ui or other component libraries

### 6. Data Fetching
- Set up API routes in `src/app/api/`
- Implement data fetching utilities in `src/lib/`
- Configure server components for optimal performance

### 7. Testing
- Add testing framework (Jest, Vitest, Playwright)
- Write unit tests for components
- Add E2E tests for critical user flows

### 8. Optimization
- Optimize images using next/image
- Implement proper caching strategies
- Add analytics and monitoring

### 9. Deployment
- Choose hosting platform (Vercel, Netlify, AWS, etc.)
- Configure CI/CD pipeline
- Set up production environment variables

## TypeScript Configuration

The project uses strict TypeScript settings:
- `strict: true` - Enables all strict type checking options
- Path aliases configured: `@/*` maps to `./src/*`
- React JSX transform enabled for optimal bundle size

Example import using alias:
```typescript
import { MyComponent } from '@/components/MyComponent'
import { helper } from '@/lib/utils'
```

## Data Storage & Admin Access

### How Data is Saved
- **Location**: `data/submissions.json`
- **Format**: JSON file (no database required)
- **Persistence**: Survives server restarts during development
- **Structure**: Each submission contains user info, answers, scores, and timestamp

### Accessing the Dashboard
- **Development**: Click "Dashboard" link in top-right corner OR visit http://localhost:3000/admin
- **No authentication** (add for production!)
- **Features**: View all submissions, average scores, export data

See [DATA_STORAGE.md](DATA_STORAGE.md) for detailed information about:
- What data is saved
- How to export submissions
- Backup strategies
- Migration to database for production

## 5 Diagnostic Dimensions

1. **External Risk & Demand Stability** (3 questions)
   - Demand predictability
   - Risk adjustment
   - Surprise frequency

2. **Decision Ownership & Speed** (3 questions)
   - Decision clarity
   - Authority boundaries
   - Decision speed

3. **End-to-End Process Flow** (3 questions)
   - Order flow understanding
   - Cross-functional impact
   - Lead time consideration

4. **Process Clarity & Ownership** (3 questions)
   - Trigger clarity
   - Input/output ownership
   - Handoff quality

5. **Strategic Focus & Capacity** (3 questions)
   - Growth alignment
   - Priority clarity
   - Operational load

## Important Files

- **[README.md](README.md)** - Complete setup and deployment guide
- **[SETUP.md](SETUP.md)** - Quick start guide
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical details
- **[DATA_STORAGE.md](DATA_STORAGE.md)** - How data is saved and accessed
- **[statements.csv](statements.csv)** - Original question data source

## Current Status

✅ **Fully Functional**
- All 15 questions implemented
- AI feedback working (with Anthropic API key)
- Spider chart visualization
- Admin dashboard accessible
- Mobile responsive

⚠️ **For Production Deployment**
- Add authentication to `/admin` route
- Configure Anthropic API key in environment variables
- Update booking link in ResultsPage.tsx
- Consider database migration for data persistence
- Enable HTTPS

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Recharts Documentation](https://recharts.org/)
