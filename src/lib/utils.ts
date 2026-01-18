import { Answer, CategoryScores } from './types';
import { statements } from './statements';

/**
 * Calculate category scores from user answers
 */
export function calculateCategoryScores(answers: Answer[]): CategoryScores {
  const categoryScores: CategoryScores = {};

  // Group answers by dimension/category
  answers.forEach((answer) => {
    const statement = statements.find((s) => s.id === answer.statementId);
    if (!statement) return;

    const category = statement.dimension;
    if (!categoryScores[category]) {
      categoryScores[category] = { score: 0, count: 0 };
    }

    categoryScores[category].score += answer.value;
    categoryScores[category].count += 1;
  });

  // Calculate averages
  Object.keys(categoryScores).forEach((category) => {
    const total = categoryScores[category].score;
    const count = categoryScores[category].count;
    categoryScores[category].score = total / count;
  });

  return categoryScores;
}

/**
 * Generate a unique ID for submissions
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
