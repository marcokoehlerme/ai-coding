'use client';

import { useEffect, useState } from 'react';
import { DiagnosticSubmission, CategoryScores } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<DiagnosticSubmission[]>([]);
  const [averageScores, setAverageScores] = useState<CategoryScores>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions');
      const data = await response.json();
      setSubmissions(data.submissions || []);
      calculateAverages(data.submissions || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAverages = (subs: DiagnosticSubmission[]) => {
    if (subs.length === 0) return;

    const totals: CategoryScores = {};

    subs.forEach((sub) => {
      Object.entries(sub.categoryScores).forEach(([category, data]) => {
        if (!totals[category]) {
          totals[category] = { score: 0, count: 0 };
        }
        totals[category].score += data.score;
        totals[category].count += 1;
      });
    });

    // Calculate averages
    Object.keys(totals).forEach((category) => {
      totals[category].score = totals[category].score / totals[category].count;
    });

    setAverageScores(totals);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Admin Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Total Submissions
            </h2>
            <div className="text-5xl font-bold text-primary">{submissions.length}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Average Category Scores
            </h2>
            <div className="space-y-2">
              {Object.entries(averageScores).map(([category, data]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm text-primary/70">{category}</span>
                  <span className="text-lg font-semibold text-primary">
                    {data.score.toFixed(1)}/5
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-primary/10">
            <h2 className="text-2xl font-bold text-primary">All Submissions</h2>
          </div>

          {submissions.length === 0 ? (
            <div className="px-6 py-12 text-center text-primary/60">
              No submissions yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-light">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                      Scores
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-light/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                        {submission.userInfo.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary/70">
                        {submission.userInfo.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary/70">
                        {submission.userInfo.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary/70">
                        {submission.userInfo.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary/70">
                        {formatDate(submission.timestamp)}
                      </td>
                      <td className="px-6 py-4">
                        <details className="cursor-pointer">
                          <summary className="text-sm text-primary font-medium hover:underline">
                            View Scores
                          </summary>
                          <div className="mt-2 space-y-1">
                            {Object.entries(submission.categoryScores).map(([category, data]) => (
                              <div key={category} className="text-xs text-primary/70">
                                {category}: {data.score.toFixed(1)}/5
                              </div>
                            ))}
                          </div>
                        </details>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-primary/60 hover:text-primary transition-colors underline"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
