import { Metadata } from "next";
import PDFEditorClient from "./PDFEditorClient";
import ExploreMoreTools from "@/components/ExploreMoreTools";

export const metadata: Metadata = {
  title: "Free Online PDF Editor Website — VCM Suite",
  description: "Free online PDF editor website by VCM Suite. Upload, reorder, rotate, and delete PDF pages right in your browser, then download your edited PDF instantly.",
  keywords: "pdf editor website, online pdf editor, free pdf editor, edit pdf pages, pdf page reorder, pdf tools, rearrange pdf pages",
  openGraph: {
    title: "Free Online PDF Editor Website — VCM Suite",
    description: "Free online PDF editor website by VCM Suite. Upload, reorder, rotate, and delete PDF pages right in your browser, then download your edited PDF instantly.",
    type: "website",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "VCM Suite Online PDF Editor",
      "applicationCategory": "Utility",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free online PDF editor website. Upload, reorder, rotate, and delete PDF pages in your browser.",
      "publisher": {
        "@type": "Organization",
        "name": "VCM Suite"
      }
    })
  }
};

export default function PDFEditorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <span className="inline-block bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            100% Free
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Online PDF Editor Website
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            Upload your PDF, rearrange, rotate, or delete pages, then download your edited document in seconds. No sign-up, no watermark.
          </p>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            All editing happens in your browser. Your PDF never leaves your device.
          </p>
        </div>

        <PDFEditorClient />

        <section className="mt-16 bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About this Free PDF Editor Website</h2>
          <p className="text-gray-600 mb-8">
            Looking for a reliable <strong>pdf editor website</strong> that works directly in your browser? VCM Suite's free online PDF editor lets you manipulate PDF documents without installing any software. Whether you need to rearrange pages, rotate them, or remove unwanted pages, our tool handles it all securely and privately.
          </p>

          <div className="space-y-4">
            <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Is this PDF editor website really free to use?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-600">
                Yes! This <strong>online PDF editor</strong> is completely free with no hidden costs. There's no signup required, no watermarks added to your documents, and no limits on how many PDFs you can edit. We built this as part of VCM Suite's mission to provide free creator tools.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Does my PDF leave my device when I edit it?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-600">
                No, your file stays completely private. All PDF processing happens directly in your browser using JavaScript. Your documents are never uploaded to any server, making this one of the most secure ways to <strong>edit PDF pages in your browser</strong>.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Can I rearrange and rotate PDF pages?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-600">
                Absolutely! This <strong>free pdf editor website</strong> supports full page manipulation. You can drag and drop pages to reorder them, rotate pages left or right in 90-degree increments, delete unwanted pages, and even duplicate pages. Changes are reflected in real-time before you download.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Is there a limit to how large my PDF can be?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-600">
                Since all processing happens in your browser, the limit depends on your device's memory. We recommend PDFs under 25MB for optimal performance. Larger files may work but could be slower to process on older devices.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                Can I use this online PDF editor on mobile?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-600">
                Yes! Our PDF editor is fully responsive and works on mobile phones and tablets. While the desktop experience offers easier drag-and-drop functionality, you can still upload, rotate, delete, and download PDFs from any device with a modern web browser.
              </p>
            </details>
          </div>
        </section>

        <ExploreMoreTools currentTool="/tools/pdf-editor" />
      </div>
    </div>
  );
}
