import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">A shared canvas for your team&apos;s ideas</h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">Real-time collaborative drawing. No setup, no downloads. Just share a link and start creating together.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/signup" className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
              Create a canvas
            </Link>
            <Link href="/canvas/demo" className="px-6 py-3 bg-white text-gray-900 text-sm font-medium rounded-md border border-gray-300 hover:border-gray-400 transition-colors">
              View demo
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Demo */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 md:p-16">
          <div className="aspect-video bg-white rounded border border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Canvas preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-200">
        <div className="grid md:grid-cols-3 gap-16">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Real-time sync</h3>
            <p className="text-gray-600 leading-relaxed">See everyone&apos;s changes instantly. No refresh needed, no lag. Draw together like you&apos;re in the same room.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Simple sharing</h3>
            <p className="text-gray-600 leading-relaxed">Create a room, copy the link. Anyone with the link can join and collaborate immediately.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Built-in chat</h3>
            <p className="text-gray-600 leading-relaxed">Discuss ideas while you draw. Every room includes a chat so your team stays in sync.</p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-12">Built for teams</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Brainstorming sessions</h3>
              <p className="text-gray-600">Visualize ideas together. Mind maps, flowcharts, wireframes—sketch it out in real-time.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Design collaboration</h3>
              <p className="text-gray-600">Quick mockups and feedback loops. Get everyone on the same page before diving into details.</p>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Remote workshops</h3>
              <p className="text-gray-600">Facilitate engaging sessions. Participants can contribute visually, making workshops more interactive.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick explanations</h3>
              <p className="text-gray-600">Sometimes a sketch says more than a thousand words. Draw to explain complex concepts clearly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-200">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start collaborating today</h2>
          <p className="text-lg text-gray-600 mb-8">No credit card required. Create unlimited canvases and invite your team.</p>
          <Link href="/signup" className="inline-block px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
            Get started for free
          </Link>
        </div>
      </section>
    </div>
  );
}
