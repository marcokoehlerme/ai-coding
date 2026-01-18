import { NextRequest, NextResponse } from 'next/server';
import { Answer, UserInfo, CategoryScores, Feedback } from '@/lib/types';
import { statements } from '@/lib/statements';

/**
 * POST /api/feedback - Generate AI feedback based on user answers
 */
export async function POST(request: NextRequest) {
  try {
    const { userInfo, answers, categoryScores } = await request.json() as {
      userInfo: UserInfo;
      answers: Answer[];
      categoryScores: CategoryScores;
    };

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.warn('ANTHROPIC_API_KEY not set, using placeholder feedback');
      return NextResponse.json(generatePlaceholderFeedback(userInfo));
    }

    // Build context for Claude
    const context = buildAnalysisContext(userInfo, answers, categoryScores);

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: context,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const data = await response.json();
    const feedbackText = data.content[0].text;

    // Parse the feedback (expecting structured format)
    const feedback = parseFeedback(feedbackText);

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error generating feedback:', error);
    return NextResponse.json(
      generatePlaceholderFeedback({ name: 'User' } as UserInfo),
      { status: 200 } // Return placeholder instead of error
    );
  }
}

/**
 * Build context for Claude to analyze
 */
function buildAnalysisContext(
  userInfo: UserInfo,
  answers: Answer[],
  categoryScores: CategoryScores
): string {
  let context = `You are a senior Procurement and Supply Chain advisor.\n\n`;

  context += `Context:\n`;
  context += `This is a short diagnostic report based on a self-assessment.\n`;
  context += `The input below contains statement-level results across multiple dimensions.\n\n`;

  context += `Observed results (evidence):\n`;
  Object.entries(categoryScores).forEach(([category, data]) => {
    context += `\nDimension: ${category}\n`;
    // Find all answers for this dimension
    const dimensionStatements = statements.filter(s => s.dimension === category);
    dimensionStatements.forEach((statement) => {
      const answer = answers.find(a => a.statementId === statement.id);
      if (answer) {
        context += `- Statement: ${statement.question}\n`;
        context += `  Response: ${answer.value}/5\n`;
        context += `  Interpretation: ${statement.interpretation}\n`;
      }
    });
  });

  context += `\n\nTask:\n`;
  context += `Write holistic feedback for ${userInfo.name} (${userInfo.role} at ${userInfo.company}).\n\n`;

  context += `Output format:\n\n`;
  context += `KEY OBSERVATION\n`;
  context += `- 1-2 sentences. Clean, crisp, clear.\n`;
  context += `- Focus on what you observe, leave room for questions.\n\n`;

  context += `FIRST THING TO CHANGE\n`;
  context += `- 1-2 sentences. One specific, concrete action.\n`;
  context += `- Operational and actionable.\n\n`;

  context += `WATCH-OUTS\n`;
  context += `- 2-3 sentences. Specific risks or challenges to monitor.\n`;
  context += `- Based on their current state.\n\n`;

  context += `Rules:\n`;
  context += `- Do NOT mention scores, numbers, or quote statements\n`;
  context += `- Do NOT explain methodology or mention dimension names\n`;
  context += `- Keep it concrete and operational\n`;
  context += `- Avoid buzzwords and frameworks\n`;
  context += `- Write directly to ${userInfo.name} using 'You' language\n\n`;

  context += `Tone:\n`;
  context += `Direct, calm, senior advisor. No fluff.`;

  return context;
}

/**
 * Parse Claude's response into structured feedback
 */
function parseFeedback(text: string): Feedback {
  const observationMatch = text.match(/KEY OBSERVATION:?\s*([^\n]+(?:\n(?!FIRST THING|WATCH)[^\n]+)*)/i);
  const changeMatch = text.match(/FIRST THING TO CHANGE:?\s*([^\n]+(?:\n(?!WATCH)[^\n]+)*)/i);
  const watchOutsMatch = text.match(/WATCH-?OUTS?:?\s*([^\n]+(?:\n(?!$)[^\n]+)*)/i);

  return {
    keyObservation: observationMatch?.[1]?.trim() || 'Your responses reveal important insights about operational clarity and decision-making patterns that warrant deeper exploration.',
    firstThingToChange: changeMatch?.[1]?.trim() || 'Establish clear decision-making authority for each key process, documenting who owns each critical decision point.',
    watchOuts: watchOutsMatch?.[1]?.trim() || 'Monitor how well your current processes handle volume increases. Ensure your team has bandwidth for strategic work, not just firefighting.',
  };
}

/**
 * Generate placeholder feedback when API is not available
 */
function generatePlaceholderFeedback(userInfo: UserInfo): Feedback {
  return {
    keyObservation: 'Your responses point to gaps in how decisions get made and how work flows between functions. You know where things should happen, but the actual triggers and handoffs seem less defined than they could be.',
    firstThingToChange: 'Map out one end-to-end process—pick the one that causes the most friction. Document every handoff, every decision point, and who actually makes the call. You'll find the gaps quickly.',
    watchOuts: 'Watch your planning assumptions. If demand behavior is shifting and you're not adjusting structures to match, you're building on sand. Also, check if your team is stretched too thin—reactive mode kills strategic progress.',
  };
}
