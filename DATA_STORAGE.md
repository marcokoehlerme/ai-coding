# Data Storage Explanation

## How Results Are Saved

### Storage Location
All diagnostic submissions are saved in a **JSON file**:
```
nextjs-app/data/submissions.json
```

### Storage Method
- **No database required** - uses simple file-based storage
- Data is stored in plain JSON format
- Easy to backup, export, or migrate

### What Gets Saved
When a user completes the diagnostic, the following information is saved:

```json
{
  "id": "1737201234567-abc123xyz",
  "userInfo": {
    "name": "John Doe",
    "role": "Supply Chain Manager",
    "company": "Acme Corp",
    "email": "john@acme.com"
  },
  "answers": [
    { "statementId": 1, "value": 4 },
    { "statementId": 2, "value": 5 },
    // ... all 15 answers
  ],
  "categoryScores": {
    "External Risk & Demand Stability": { "score": 3.7, "count": 3 },
    "Decision Ownership & Speed": { "score": 4.3, "count": 3 },
    "End-to-End Process Flow": { "score": 3.0, "count": 3 },
    "Process Clarity & Ownership": { "score": 4.0, "count": 3 },
    "Strategic Focus & Capacity": { "score": 3.3, "count": 3 }
  },
  "timestamp": "2026-01-18T12:34:56.789Z"
}
```

## Accessing the Dashboard

### During Development (Local)
1. **From any page**, click the "Dashboard" link in the top-right corner
2. **Or navigate directly** to: http://localhost:3000/admin

### What You'll See
The admin dashboard shows:
- **Total number of submissions**
- **Average scores across all submissions** for each category
- **Detailed table** with all submissions including:
  - Name, Role, Company
  - Email address (for follow-up)
  - Submission date/time
  - Individual category scores (expandable)

### Dashboard Features
- **No authentication required** (for now - add this for production!)
- **Real-time data** - refreshes when you visit the page
- **Sortable columns** - organize by any field
- **Export-ready** - data is in JSON format for easy export

## How to Export Data

### Manual Export (Current Setup)
1. Navigate to: `nextjs-app/data/submissions.json`
2. Copy the file or its contents
3. Import into Excel, Google Sheets, or any tool that reads JSON

### Automated Export (Future Enhancement)
You could add:
- CSV download button in the admin dashboard
- Email delivery of submissions
- Integration with Google Sheets API
- CRM integration (Salesforce, HubSpot)

## Data Persistence

### Local Development
- Data survives server restarts
- Stored in your local file system
- Not affected by code changes

### Production Deployment
**Important**: When deploying to production:

#### Option 1: File Storage (Current)
- **Pros**: Simple, no database needed
- **Cons**: Data resets on each deployment (unless using persistent volumes)
- **Best for**: Testing, prototypes, low volume

#### Option 2: Database (Recommended for Production)
Consider upgrading to a database for production:
- **PostgreSQL** (Vercel Postgres, Supabase)
- **MongoDB** (MongoDB Atlas)
- **MySQL** (PlanetScale)

This ensures:
- Data persists across deployments
- Better scalability
- Concurrent access handling
- Backup and recovery features

## Security Notes

### Current Setup (Development)
- ✅ Data stored locally
- ✅ Not exposed via API (only internal)
- ❌ No admin authentication
- ❌ File permissions not restricted

### Production Recommendations
1. **Add authentication** to `/admin` route
2. **Restrict file permissions** on submissions.json
3. **Use environment variables** for admin credentials
4. **Consider database** for better security
5. **Enable HTTPS** for data in transit
6. **Regular backups** of submissions.json

## Viewing Data Programmatically

### Read the JSON file directly
```bash
cat nextjs-app/data/submissions.json
```

### Or use Node.js
```javascript
const fs = require('fs');
const data = JSON.parse(
  fs.readFileSync('./data/submissions.json', 'utf-8')
);
console.log(`Total submissions: ${data.length}`);
```

### Or use the API endpoint
```bash
curl http://localhost:3000/api/submissions
```

## Backup Strategy

### Recommended Backup Routine
1. **Daily**: Copy `submissions.json` to a backup location
2. **Before deployment**: Always backup current data
3. **Version control**: Consider committing anonymized test data

### Simple Backup Script
```bash
# Create backup with timestamp
cp data/submissions.json "data/backups/submissions-$(date +%Y%m%d-%H%M%S).json"
```

## Migration to Database

If you want to migrate to a database later:
1. Export current JSON data
2. Set up database (e.g., Supabase)
3. Update API routes in `src/app/api/submissions/route.ts`
4. Import existing data into database
5. Update admin dashboard to query database

The data structure is already designed to work with databases - each submission has a unique ID and proper relationships.
