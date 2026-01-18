// Answer types for different question formats
export type AnswerType = 'scale' | 'yes-no' | 'dropdown';

// Dropdown option with label and point value
export interface DropdownOption {
  label: string;
  value: number;
}

// Individual statement/question
export interface Statement {
  id: number;
  dimension: string;
  question: string;
  answerType: AnswerType;
  dropdownOptions?: DropdownOption[];
  interpretation: string;
}

// User's answer to a statement
export interface Answer {
  statementId: number;
  value: number; // 1-5 for all answer types
}

// User information collected at start
export interface UserInfo {
  name: string;
  role: string;
  company: string;
  email: string;
}

// Category scores (5 categories, each with average score)
export interface CategoryScores {
  [category: string]: {
    score: number; // Average score for this category
    count: number; // Number of questions in this category
  };
}

// Complete diagnostic submission
export interface DiagnosticSubmission {
  id: string;
  userInfo: UserInfo;
  answers: Answer[];
  categoryScores: CategoryScores;
  timestamp: string;
}

// AI-generated feedback
export interface Feedback {
  keyObservation: string;
  firstThingToChange: string;
  watchOuts: string;
}

// Admin dashboard data
export interface AdminStats {
  totalSubmissions: number;
  averageCategoryScores: CategoryScores;
}
