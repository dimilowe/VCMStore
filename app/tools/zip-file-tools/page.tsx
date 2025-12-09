import { Metadata } from "next";
import Link from "next/link";
import { FileArchive, FolderArchive, Lock, Download, CheckCircle, ArrowRight, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Free ZIP File Tools - Compress, Create & Protect Files Online",
  description: "Free online ZIP file tools to compress, create, and password-protect ZIP archives. No software download required. Works on all devices.",
  keywords: "zip file, compress files, create zip, password protect zip, file compression, zip archive, online zip tool",
  alternates: {
    canonical: "/tools/zip-file-tools",
  },
};

const zipTools = [
  {
    slug: "zip-file-compression",
    name: "ZIP File Compression",
    description: "Compress files into smaller ZIP archives",
    icon: FileArchive,
    benefit: "Reduce file sizes by up to 80%"
  },
  {
    slug: "zip-file-folder",
    name: "ZIP Folder",
    description: "Archive entire folders into a single ZIP",
    icon: FolderArchive,
    benefit: "Bundle multiple files for easy sharing"
  },
  {
    slug: "zip-file-in-linux",
    name: "ZIP File in Linux",
    description: "Linux-compatible ZIP file creation",
    icon: FileArchive,
    benefit: "Cross-platform compatibility"
  },
  {
    slug: "zip-file-linux",
    name: "ZIP File Linux",
    description: "Create ZIP files for Linux systems",
    icon: FileArchive,
    benefit: "Works with all Linux distributions"
  },
  {
    slug: "zip-file-make",
    name: "Make ZIP File",
    description: "Create ZIP archives from any files",
    icon: FileArchive,
    benefit: "Simple drag-and-drop ZIP creation"
  },
  {
    slug: "zip-file-on-linux",
    name: "ZIP File on Linux",
    description: "Online ZIP tool for Linux users",
    icon: FileArchive,
    benefit: "No command line required"
  },
  {
    slug: "zip-file-password-protection",
    name: "Password Protect ZIP",
    description: "Add password protection to ZIP files",
    icon: Lock,
    benefit: "Secure sensitive files with encryption"
  }
];

const proTips = [
  "Compress before emailing to avoid attachment limits",
  "Password-protect ZIPs containing sensitive documents",
  "Group related files into folders before zipping",
  "Use maximum compression for archives you'll store long-term",
  "Keep original files until you verify the ZIP works"
];

const faqs = [
  {
    question: "Is it safe to use online ZIP tools?",
    answer: "Yes! Our tools process files securely in your browser or on encrypted servers. We don't store your files after processing, and all transfers use HTTPS encryption."
  },
  {
    question: "Is there a file size limit?",
    answer: "Most of our ZIP tools support files up to 100MB for free. For larger files, you may need to split them into smaller archives or use desktop software."
  },
  {
    question: "Do you store my files?",
    answer: "No. Your files are processed temporarily and automatically deleted after you download your ZIP. We never store or access your personal files."
  },
  {
    question: "Are these tools really free?",
    answer: "Yes! All our ZIP file tools are 100% free with no watermarks, no signup required, and no hidden fees. We support ourselves through non-intrusive advertising."
  },
  {
    question: "What file types can I ZIP?",
    answer: "You can ZIP any file type: documents, images, videos, code, spreadsheets, and more. ZIP compression works on all common file formats."
  }
];

export default function ZipFileToolsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full mb-4">
            Free Online Tools
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ZIP File Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compress, create, and protect ZIP archives online. No software to download, 
            works on any device, completely free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Secure & Private</h3>
            <p className="text-sm text-gray-600">Files are processed securely and never stored</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Fast Processing</h3>
            <p className="text-sm text-gray-600">Create and compress ZIPs in seconds</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">No Download Required</h3>
            <p className="text-sm text-gray-600">Works entirely in your browser</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-12 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Tool</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Best For</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {zipTools.map((tool) => (
                  <tr key={tool.slug} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{tool.name}</td>
                    <td className="py-3 px-4 text-gray-600">{tool.description}</td>
                    <td className="py-3 px-4 text-gray-600">{tool.benefit}</td>
                    <td className="py-3 px-4">
                      <Link 
                        href={`/tools/${tool.slug}`}
                        className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Use Tool <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {zipTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-orange-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <IconComponent className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
                <p className="text-xs text-orange-600 font-medium">{tool.benefit}</p>
              </Link>
            );
          })}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-12 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pro Tips for ZIP Files</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {proTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Ready to Create a ZIP File?</h2>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Choose the tool that fits your needs. All tools are free, fast, and secure.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/tools/zip-file-compression"
              className="px-6 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors"
            >
              Start Compressing
            </Link>
            <Link
              href="/tools/zip-file-password-protection"
              className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
            >
              Password Protect
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "ZIP File Tools",
              description: "Free online tools to compress, create, and protect ZIP files",
              numberOfItems: zipTools.length,
              itemListElement: zipTools.map((tool, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "WebApplication",
                  name: tool.name,
                  description: tool.description,
                  url: `https://vcmsuite.com/tools/${tool.slug}`,
                  applicationCategory: "UtilitiesApplication",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD"
                  }
                }
              }))
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer
                }
              }))
            })
          }}
        />
      </div>
    </main>
  );
}
