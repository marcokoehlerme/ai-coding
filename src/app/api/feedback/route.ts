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
  let context = `You are a Senior Supply Chain Consultant analyzing diagnostic results for ${userInfo.name}, who works as ${userInfo.role} at ${userInfo.company}.\n\n`;

  context += `CATEGORY SCORES (out of 5):\n`;
  Object.entries(categoryScores).forEach(([category, data]) => {
    context += `- ${category}: ${data.score.toFixed(1)}\n`;
  });

  context += `\nDETAILED RESPONSES:\n`;
  answers.forEach((answer) => {
    const statement = statements.find((s) => s.id === answer.statementId);
    if (statement) {
      context += `\nQ: ${statement.question}\n`;
      context += `A: ${answer.value}/5\n`;
      context += `Context: ${statement.interpretation}\n`;
    }
  });

  context += `\n\nBased on this analysis, provide feedback in the following format:\n\n`;
  context += `SUMMARY: (2-3 sentences summarizing what you observe about their supply chain maturity, mentioning specific areas where they are strong or weak)\n\n`;
  context += `KEY OBSERVATION: (One paragraph identifying the most critical pattern or insight from their responses)\n\n`;
  context += `FIRST THING TO CHANGE: (One specific, actionable recommendation for immediate improvement)\n\n`;
  context += `WATCH-OUTS: (2-3 specific risks or challenges they should monitor based on their current state)\n\n`;
  context += `Keep the tone professional but conversational. Reference specific responses they gave, not just scores.`;

  return context;
}

/**
 * Parse Claude's response into structured feedback
 */
function parseFeedback(text: string): Feedback {
  const summaryMatch = text.match(/SUMMARY:?\s*([^\n]+(?:\n(?!KEY OBSERVATION|FIRST THING|WATCH)[^\n]+)*)/i);
  const observationMatch = text.match(/KEY OBSERVATION:?\s*([^\n]+(?:\n(?!FIRST THING|WATCH)[^\n]+)*)/i);
  const changeMatch = text.match(/FIRST THING TO CHANGE:?\s*([^\n]+(?:\n(?!WATCH)[^\n]+)*)/i);
  const watchOutsMatch = text.match(/WATCH-?OUTS?:?\s*([^\n]+(?:\n(?!$)[^\n]+)*)/i);

  return {
    summary: summaryMatch?.[1]?.trim() || 'Analysis completed.',
    keyObservation: observationMatch?.[1]?.trim() || 'Multiple areas identified for improvement.',
    firstThingToChange: changeMatch?.[1]?.trim() || 'Focus on process clarity and ownership.',
    watchOuts: watchOutsMatch?.[1]?.trim() || 'Monitor capacity and decision-making speed.',
  };
}

/**
 * Generate placeholder feedback when API is not available
 */
function generatePlaceholderFeedback(userInfo: UserInfo): Feedback {
  return {
    summary: `Thank you for completing the diagnostic, ${userInfo.name}. Your responses reveal important insights about your supply chain operations and areas where strategic improvements could drive significant impact.`,
    keyObservation: 'Based on your responses, there appears to be a need for stronger end-to-end visibility and clearer process ownership across your supply chain operations. This is a common challenge for growing organizations.',
    firstThingToChange: 'Establish clear decision-making authority for each key process. Start by documenting who owns each critical decision point in your supply chain flow.',
    watchOuts: 'Watch for capacity constraints as you scale. Monitor how well your current processes handle volume increases, and ensure your team has bandwidth for strategic work, not just firefighting.',
  };
}
