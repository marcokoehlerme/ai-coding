'use client';

import { useState } from 'react';
import UserInfoForm from '@/components/UserInfoForm';
import QuestionFlow from '@/components/QuestionFlow';
import EmailForm from '@/components/EmailForm';
import ResultsPage from '@/components/ResultsPage';
import { UserInfo, Answer, CategoryScores, Feedback } from '@/lib/types';
import { calculateCategoryScores, generateId } from '@/lib/utils';

type Step = 'user-info' | 'questions' | 'email' | 'results';

export default function DiagnosticPage() {
  const [step, setStep] = useState<Step>('user-info');
  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>({});
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [categoryScores, setCategoryScores] = useState<CategoryScores>({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInfoSubmit = (info: Omit<UserInfo, 'email'>) => {
    setUserInfo(info);
    setStep('questions');
  };

  const handleQuestionsComplete = (completedAnswers: Answer[]) => {
    setAnswers(completedAnswers);
    setStep('email');
  };

  const handleEmailSubmit = async (email: string) => {
    setIsLoading(true);
    const fullUserInfo: UserInfo = { ...userInfo as Omit<UserInfo, 'email'>, email };
    setUserInfo(fullUserInfo);

    // Calculate scores
    const scores = calculateCategoryScores(answers);
    setCategoryScores(scores);

    // Get AI feedback
    try {
      const feedbackResponse = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInfo: fullUserInfo,
          answers,
          categoryScores: scores,
        }),
      });
      const feedbackData = await feedbackResponse.json();
      setFeedback(feedbackData);

      // Save submission
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: generateId(),
          userInfo: fullUserInfo,
          answers,
          categoryScores: scores,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Error submitting diagnostic:', error);
    } finally {
      setIsLoading(false);
      setStep('results');
    }
  };

  return (
    <div className="min-h-screen bg-light">
      {step === 'user-info' && <UserInfoForm onSubmit={handleUserInfoSubmit} />}
      {step === 'questions' && (
        <QuestionFlow userName={userInfo.name || 'there'} onComplete={handleQuestionsComplete} />
      )}
      {step === 'email' && <EmailForm onSubmit={handleEmailSubmit} isLoading={isLoading} />}
      {step === 'results' && feedback && (
        <ResultsPage
          userInfo={userInfo as UserInfo}
          categoryScores={categoryScores}
          feedback={feedback}
        />
      )}
    </div>
  );
}
