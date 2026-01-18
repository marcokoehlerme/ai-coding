import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { DiagnosticSubmission } from '@/lib/types';

const DATA_FILE = path.join(process.cwd(), 'data', 'submissions.json');

/**
 * GET /api/submissions - Retrieve all submissions (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
    const submissions: DiagnosticSubmission[] = JSON.parse(fileContent);

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Error reading submissions:', error);
    return NextResponse.json({ submissions: [] });
  }
}

/**
 * POST /api/submissions - Save a new submission
 */
export async function POST(request: NextRequest) {
  try {
    const submission: DiagnosticSubmission = await request.json();

    // Read existing submissions
    let submissions: DiagnosticSubmission[] = [];
    try {
      const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
      submissions = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet, start with empty array
      submissions = [];
    }

    // Add new submission
    submissions.push(submission);

    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2));

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save submission' },
      { status: 500 }
    );
  }
}
