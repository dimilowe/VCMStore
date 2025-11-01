import { EmailCapture } from "@/components/email-capture";

export default function NewsletterPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Join the Newsletter
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Get exclusive tips, product updates, and special deals delivered to your inbox.
          No spam, unsubscribe anytime.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <EmailCapture 
          source="newsletter-page" 
          title="Subscribe Now"
          description="Join thousands of creators building their businesses"
        />
      </div>

      <div className="max-w-2xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-6">What you'll get:</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="mr-3 text-primary">✓</span>
            <span>Weekly tips and strategies for digital creators</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-primary">✓</span>
            <span>Early access to new products and features</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-primary">✓</span>
            <span>Exclusive discounts and special offers</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3 text-primary">✓</span>
            <span>Case studies from successful creators</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
