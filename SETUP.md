# Quick Setup Guide

## Step 1: Install Dependencies

Already done! Dependencies are installed.

## Step 2: Set Up Anthropic API Key

1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in
3. Generate an API key
4. Create a file `.env.local` in the root directory
5. Add this line:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

## Step 3: Test the Application

The dev server is already running at [http://localhost:3000](http://localhost:3000)

### Test Flow:

1. **Homepage** - Click "Start Free Diagnostic"
2. **User Info** - Enter name, role, company
3. **Questions** - Answer all 15 questions
4. **Email** - Enter email address
5. **Results** - View spider chart and AI feedback

### Test Admin Dashboard:

Visit [http://localhost:3000/admin](http://localhost:3000/admin) to see all submissions

## Step 4: Customize

### Update Booking Link

Edit `src/components/ResultsPage.tsx` line 26:
```typescript
window.open('https://calendly.com/YOUR-LINK', '_blank');
```

### Update Questions (Optional)

Edit `src/lib/statements.ts` to modify questions and scoring.

### Update Colors (Optional)

Edit `src/app/globals.css` to change brand colors.

## Step 5: Deploy

### Deploy to Vercel:

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variable: `ANTHROPIC_API_KEY`
5. Deploy

## Troubleshooting

### No AI Feedback?
- Check that `ANTHROPIC_API_KEY` is set in `.env.local`
- Restart the dev server after adding the key

### Data Not Saving?
- Check that `data/submissions.json` exists and is writable
- The file is created automatically on first submission

### Styling Issues?
- Clear browser cache
- Restart dev server
- Check that Tailwind classes are working

## Next Steps

1. Add your Anthropic API key
2. Test the full flow
3. Update the booking link
4. Deploy to production
5. Share the link with potential clients!
