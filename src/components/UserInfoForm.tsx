'use client';

import { useState } from 'react';
import { UserInfo } from '@/lib/types';

interface Props {
  onSubmit: (userInfo: Omit<UserInfo, 'email'>) => void;
}

export default function UserInfoForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && role && company) {
      onSubmit({ name, role, company, email: '' });
    }
  };

  const isValid = name.trim() && role.trim() && company.trim();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Let's Get Started
          </h1>
          <p className="text-lg text-primary/70">
            First, tell us a bit about yourself so we can personalize your experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-primary bg-white"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-primary mb-2">
              Your Role
            </label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-primary bg-white"
              placeholder="Supply Chain Manager"
              required
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-primary mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-primary bg-white"
              placeholder="Acme Corporation"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-primary text-light px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Diagnostic
          </button>
        </form>
      </div>
    </div>
  );
}
