import { Metadata } from "next";
import NotepadClient from "./NotepadClient";
import ExploreMoreTools from "@/components/ExploreMoreTools";

export const metadata: Metadata = {
  title: "Free Online Notepad — Write Notes Online | VCM Suite",
  description: "Free online notepad with auto-save, word count, and AI-powered writing tools. Write notes online, format text, and use AI to summarize, rewrite, expand, or shorten your content instantly.",
  keywords: "online notepad, free online notepad, online notes, ai notepad, write notes online, online text editor, browser notepad, quick notes online",
  openGraph: {
    title: "Free Online Notepad — Write Notes Online | VCM Suite",
    description: "Free online notepad with auto-save, word count, and AI-powered writing tools. Write notes online, format text, and use AI to summarize, rewrite, expand, or shorten your content instantly.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "VCM Suite Online Notepad",
  "applicationCategory": "Utility",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free online notepad with auto-save, formatting, and AI-powered writing assistance.",
  "publisher": {
    "@type": "Organization",
    "name": "VCM Suite"
  }
};

export default function OnlineNotepadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <span className="inline-block bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              100% Free
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Free Online Notepad
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Write notes online with auto-save, word count, and AI-powered tools. Format your text, then use AI to summarize, rewrite, expand, or shorten.
            </p>
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Auto-saves to your browser. Your notes stay private.
            </p>
          </div>

        <NotepadClient />

        <section className="mt-16 bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Free Online Notepad</h2>
          <p className="text-gray-600 mb-8">
            Looking for a simple <strong>online notepad</strong> to quickly jot down ideas? VCM Suite's free notepad lets you <strong>write notes online</strong> without signing up or installing anything. Your notes auto-save in your browser, and you can use AI to transform your writing instantly.
          </p>

          <div className="space-y-4">
            <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Is this online notepad really free?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-600">
                Yes! This <strong>free online notepad</strong> is completely free to use with no hidden costs. There's no signup required, no ads interrupting your writing, and no limits on how much you can write. The AI features are also free.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Are my notes saved automatically?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-600">
                Yes! Your <strong>online notes</strong> are automatically saved to your browser's local storage as you type. This means your notes persist even if you close the tab or browser. However, clearing your browser data will remove saved notes, so download important content.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                What AI features are available?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-600">
                This <strong>AI notepad</strong> includes four powerful AI actions: <strong>Summarize</strong> (condense your notes into key points), <strong>Rewrite</strong> (make your text clearer and more readable), <strong>Expand</strong> (add more detail and elaboration), and <strong>Shorten</strong> (reduce length while keeping meaning).
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Can I format my notes?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-600">
                Yes! Our <strong>online notepad</strong> supports basic text formatting including headings, bold, and italics. Use the toolbar buttons or keyboard shortcuts (Ctrl+B for bold, Ctrl+I for italic) to style your text as you write.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Can I use this notepad on mobile?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-600">
                Absolutely! This <strong>online notepad</strong> is fully responsive and works great on phones and tablets. The interface adapts to smaller screens, and all features including auto-save and AI actions work on mobile devices.
              </p>
            </details>
          </div>
        </section>

        <ExploreMoreTools currentTool="/tools/online-notepad" />
        </div>
      </div>
    </>
  );
}
