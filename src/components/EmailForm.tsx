'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  onSubmit: (email: string) => void;
  isLoading: boolean;
}

export default function EmailForm({ onSubmit, isLoading }: Props) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && isValidEmail(email)) {
      onSubmit(email);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValid = email.trim() && isValidEmail(email);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute top-8 left-8">
        <Image src="/logo.png" alt="PSCM House" width={180} height={60} priority />
      </div>
      <div className="max-w-xl w-full">
        <div className="text-center mb-12">
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">
            Almost There!
          </h1>
          <p className="text-lg text-primary/70">
            Enter your email to receive your personalized supply chain diagnostic results.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-primary bg-white"
              placeholder="you@company.com"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full bg-primary text-light px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating Your Results...
              </>
            ) : (
              'View My Results'
            )}
          </button>

          <p className="text-xs text-primary/50 text-center">
            We respect your privacy. Your email will only be used to send your results
            and occasional supply chain insights.
          </p>
        </form>
      </div>
    </div>
  );
}
