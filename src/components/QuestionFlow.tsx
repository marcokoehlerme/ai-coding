'use client';

import { useState } from 'react';
import { Answer } from '@/lib/types';
import { statements } from '@/lib/statements';

interface Props {
  userName: string;
  onComplete: (answers: Answer[]) => void;
}

export default function QuestionFlow({ userName, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const currentStatement = statements[currentIndex];
  const progress = ((currentIndex + 1) / statements.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswer: Answer = {
      statementId: currentStatement.id,
      value,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setSelectedValue(null);

    if (currentIndex < statements.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(updatedAnswers);
    }
  };

  const renderAnswerOptions = () => {
    if (currentStatement.answerType === 'scale') {
      return (
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => handleAnswer(value)}
              className="w-16 h-16 rounded-lg border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-light transition-all font-semibold text-lg"
            >
              {value}
            </button>
          ))}
        </div>
      );
    }

    if (currentStatement.answerType === 'yes-no') {
      return (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleAnswer(5)}
            className="px-12 py-4 rounded-lg border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-light transition-all font-semibold text-lg min-w-[140px]"
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer(1)}
            className="px-12 py-4 rounded-lg border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-light transition-all font-semibold text-lg min-w-[140px]"
          >
            No
          </button>
        </div>
      );
    }

    if (currentStatement.answerType === 'dropdown' && currentStatement.dropdownOptions) {
      return (
        <div className="space-y-3 max-w-md mx-auto">
          {currentStatement.dropdownOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => handleAnswer(option.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-light transition-all text-left font-medium"
            >
              {option.label}
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Progress Bar */}
      <div className="max-w-2xl w-full mx-auto mb-8">
        <div className="flex justify-between text-sm text-primary/60 mb-2">
          <span>Question {currentIndex + 1} of {statements.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-primary/20 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-3xl w-full text-center">
          <div className="mb-4 text-sm font-semibold text-primary/60 uppercase tracking-wider">
            {currentStatement.dimension}
          </div>
          <h2 className="text-3xl font-bold text-primary mb-12 leading-relaxed">
            {currentStatement.question.replace(/\n/g, ' ')}
          </h2>
          {renderAnswerOptions()}
        </div>
      </div>
    </div>
  );
}
