import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-4">
      <div className="absolute top-8 left-8">
        <Image src="/logo.png" alt="PSCM House" width={180} height={60} priority />
      </div>
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-bold text-primary mb-6">
          Supply Chain Diagnostic Tool
        </h1>
        <p className="text-xl text-primary/80 mb-8 leading-relaxed">
          Discover the strengths and opportunities in your supply chain operations.
          This free diagnostic takes just 5 minutes and provides personalized insights
          from a Senior Supply Chain Consultant.
        </p>
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center gap-3 text-primary/70">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>15 targeted questions</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-primary/70">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Instant personalized feedback</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-primary/70">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Actionable recommendations</span>
          </div>
        </div>
        <Link
          href="/diagnostic"
          className="inline-block bg-primary text-light px-12 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Start Free Diagnostic
        </Link>
      </div>
    </div>
  );
}
