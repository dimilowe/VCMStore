import { EmailCapture } from "@/components/email-capture";

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-white">
      <div 
        className="relative h-[40vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 to-neutral-900/70" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wider mb-4">NEWSLETTER</h1>
          <p className="text-xl tracking-wide text-neutral-100">Join thousands of creators building their empire</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 bg-stone-50">
        <div className="max-w-2xl mx-auto">
          <EmailCapture 
            source="newsletter-page" 
            title="STAY IN THE LOOP"
            description="Get exclusive tools, early access, and insider tips delivered weekly."
          />
        </div>

        <div className="max-w-3xl mx-auto mt-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4 tracking-wide text-stone-900">WEEKLY INSIGHTS</h3>
              <ul className="space-y-3 text-stone-600">
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Proven strategies from 6-figure creators</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Behind-the-scenes case studies</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Market trends and opportunities</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 tracking-wide text-stone-900">EXCLUSIVE ACCESS</h3>
              <ul className="space-y-3 text-stone-600">
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Early product launches and beta access</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Subscriber-only discounts up to 50% off</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Free templates and resources monthly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
