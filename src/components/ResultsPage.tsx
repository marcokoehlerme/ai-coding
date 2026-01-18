'use client';

import { UserInfo, CategoryScores, Feedback } from '@/lib/types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface Props {
  userInfo: UserInfo;
  categoryScores: CategoryScores;
  feedback: Feedback;
}

export default function ResultsPage({ userInfo, categoryScores, feedback }: Props) {
  // Transform category scores for radar chart
  const chartData = Object.entries(categoryScores).map(([category, data]) => ({
    category: category.split('&')[0].trim(), // Shorten category names for chart
    score: Number(data.score.toFixed(1)),
    fullMark: 5,
  }));

  const handleBookCall = () => {
    // Replace with your actual booking link
    window.open('https://calendly.com/your-link', '_blank');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-3">
            Your Supply Chain Diagnostic Results
          </h1>
          <p className="text-lg text-primary/70">
            {userInfo.name} · {userInfo.role} at {userInfo.company}
          </p>
        </div>

        {/* Spider Chart */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Performance Overview
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={chartData}>
              <PolarGrid stroke="#1b5443" strokeOpacity={0.2} />
              <PolarAngleAxis
                dataKey="category"
                tick={{ fill: '#1b5443', fontSize: 12 }}
                tickFormatter={(value) => {
                  // Wrap long category names
                  const words = value.split(' ');
                  if (words.length > 2) {
                    return words.slice(0, 2).join(' ') + '...';
                  }
                  return value;
                }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#1b5443' }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#1b5443"
                fill="#1b5443"
                fillOpacity={0.5}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>

          {/* Category Scores List */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(categoryScores).map(([category, data]) => (
              <div key={category} className="flex justify-between items-center p-3 bg-light rounded-lg">
                <span className="text-sm font-medium text-primary">{category}</span>
                <span className="text-lg font-bold text-primary">{data.score.toFixed(1)}/5</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Feedback */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-primary mb-3">Summary</h3>
            <p className="text-primary/80 leading-relaxed">{feedback.summary}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-primary mb-3">Key Observation</h3>
            <p className="text-primary/80 leading-relaxed">{feedback.keyObservation}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-primary mb-3">First Thing To Change</h3>
            <p className="text-primary/80 leading-relaxed">{feedback.firstThingToChange}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary mb-3">Watch-Outs</h3>
            <p className="text-primary/80 leading-relaxed">{feedback.watchOuts}</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary rounded-xl p-8 shadow-lg text-center text-light">
          <h3 className="text-2xl font-bold mb-3">Want to Discuss Your Results?</h3>
          <p className="text-light/90 mb-6 leading-relaxed">
            Book a free 25-minute consulting call to dive deeper into your supply chain
            opportunities and get personalized recommendations.
          </p>
          <button
            onClick={handleBookCall}
            className="bg-light text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity inline-block"
          >
            Schedule Free Consultation
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
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
