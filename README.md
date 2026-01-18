# Supply Chain Diagnostic Tool

A professional, interactive diagnostic tool for supply chain assessment, built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Interactive Diagnostic Flow**: 15 statements across 5 key categories
- **Multiple Question Types**: Scale (1-5), Yes/No, and Dropdown answers
- **AI-Powered Feedback**: Personalized insights using Anthropic Claude API
- **Visual Results**: Spider/Radar chart showing performance across categories
- **Admin Dashboard**: View all submissions and average scores
- **Data Persistence**: JSON file-based storage (no database required)
- **Mobile Responsive**: Works seamlessly on all devices

## Tech Stack

- **Next.js 16.1.3** with App Router
- **TypeScript** (strict mode)
- **Tailwind CSS 4.x** for styling
- **Recharts** for data visualization
- **Anthropic Claude API** for AI feedback generation

## Getting Started

### Prerequisites

- Node.js 24.x or higher
- npm

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd nextjs-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

5. Edit `.env.local` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```
   Get your API key from [Anthropic Console](https://console.anthropic.com/)

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── feedback/          # AI feedback generation endpoint
│   │   └── submissions/       # Data storage endpoint
│   ├── admin/                 # Admin dashboard
│   ├── diagnostic/            # Main diagnostic flow
│   └── page.tsx              # Landing page
├── components/
│   ├── UserInfoForm.tsx      # Name, role, company collection
│   ├── QuestionFlow.tsx      # 15-statement questionnaire
│   ├── EmailForm.tsx         # Email collection
│   └── ResultsPage.tsx       # Results with spider chart
└── lib/
    ├── types.ts              # TypeScript type definitions
    ├── statements.ts         # Question data from CSV
    └── utils.ts              # Scoring and utility functions

data/
└── submissions.json          # Stored diagnostic results
```

## User Flow

1. **Landing Page** (`/`)
   - Welcome message with CTA button
   - "Start Free Diagnostic" leads to diagnostic flow

2. **User Information** (`/diagnostic`)
   - Collect name, role, and company
   - Personalize the experience

3. **Questionnaire**
   - 15 statements across 5 categories
   - Progress bar shows completion
   - Three answer types:
     - Scale: 1-5 buttons
     - Yes/No: Two buttons (Yes=5, No=1)
     - Dropdown: Multiple options with different scores

4. **Email Collection**
   - Required to view results
   - Validates email format

5. **Results Page**
   - Spider/radar chart showing scores across 5 categories
   - AI-generated feedback:
     - Summary (2-3 sentences)
     - Key Observation
     - First Thing To Change
     - Watch-Outs
   - CTA button to book consulting call

6. **Admin Dashboard** (`/admin`)
   - View all submissions
   - See average scores across all responses
   - Access user contact information

## Categories

The diagnostic evaluates 5 key dimensions:

1. **External Risk & Demand Stability** (3 questions)
2. **Decision Ownership & Speed** (3 questions)
3. **End-to-End Process Flow** (3 questions)
4. **Process Clarity & Ownership** (3 questions)
5. **Strategic Focus & Capacity** (3 questions)

## Customization

### Branding

Colors are defined in `src/app/globals.css`:
- Primary (dark): `#1b5443`
- Light: `#f5f6f4`
- Font: Inter

To change colors, update the CSS variables in `globals.css`.

### Questions

Edit `src/lib/statements.ts` to modify questions. The structure matches the provided CSV file.

### Booking Link

Update the booking link in `src/components/ResultsPage.tsx`:
```typescript
const handleBookCall = () => {
  window.open('https://calendly.com/your-link', '_blank');
};
```

### AI Feedback

The AI feedback is generated using Anthropic Claude. You can customize the prompt in `src/app/api/feedback/route.ts` in the `buildAnalysisContext()` function.

## Data Storage

Submissions are stored in `data/submissions.json`. Each submission includes:
- Unique ID
- User information (name, role, company, email)
- All answers
- Category scores
- Timestamp

To export data, simply copy the JSON file.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add `ANTHROPIC_API_KEY` environment variable in Vercel dashboard
4. Deploy

### Other Platforms

Ensure the platform supports:
- Next.js 16
- File system access for JSON storage
- Environment variables

## Security Notes

- The admin dashboard is currently open (no authentication)
- For production, add authentication to `/admin`
- Consider using a database for better data management at scale
- Store the Anthropic API key securely in environment variables

## Future Enhancements

- [ ] Add authentication for admin dashboard
- [ ] Email delivery of results
- [ ] Database integration (PostgreSQL, MongoDB)
- [ ] Export results as PDF
- [ ] Multi-language support
- [ ] A/B testing for questions
- [ ] Integration with CRM systems

## License

Proprietary - All rights reserved

## Support

For questions or support, contact: [your-email@company.com]
