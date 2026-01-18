# Project Context

## Tech Stack Overview

This project is built with the latest Next.js framework and modern web technologies:

- **Next.js 16.1.3** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5.x** - Type-safe JavaScript with strict mode enabled
- **Tailwind CSS 4.x** - Utility-first CSS framework with PostCSS
- **ESLint** - Code linting with Next.js recommended configuration

### Key Configuration Choices

- **App Router**: Uses the modern Next.js App Router (not Pages Router) for improved performance and developer experience
- **TypeScript Strict Mode**: Enabled for maximum type safety and error prevention
- **Import Aliases**: Configured with `@/*` pointing to `./src/*` for cleaner imports
- **Source Directory**: All application code is organized under `/src` for better project structure

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

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
