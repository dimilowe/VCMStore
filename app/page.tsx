import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmailCapture } from "@/components/email-capture";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section 
        className="relative h-[85vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80')",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 text-center text-white px-4">
          <Link href="/apps">
            <Button 
              variant="outline" 
              className="mb-8 bg-amber-600 hover:bg-amber-700 text-white border-0 px-8 py-6 text-sm tracking-widest"
            >
              SHOP NOW
            </Button>
          </Link>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider">
            DIGITAL TOOLS
          </h1>
          
          <p className="text-xl md:text-2xl tracking-widest">
            FOR MODERN CREATORS
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3 tracking-wide">PREMIUM APPS</h3>
              <p className="text-neutral-600">
                Professional-grade applications built for creators who demand excellence
              </p>
              <Link href="/apps" className="inline-block mt-4 text-sm font-medium underline hover:no-underline">
                EXPLORE APPS
              </Link>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3 tracking-wide">CONVERSION FUNNELS</h3>
              <p className="text-neutral-600">
                Proven sales funnels that turn visitors into customers effortlessly
              </p>
              <Link href="/funnels" className="inline-block mt-4 text-sm font-medium underline hover:no-underline">
                VIEW FUNNELS
              </Link>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3 tracking-wide">FREE RESOURCES</h3>
              <p className="text-neutral-600">
                Start your journey with our collection of free tools and templates
              </p>
              <Link href="/freebies" className="inline-block mt-4 text-sm font-medium underline hover:no-underline">
                GET FREEBIES
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <EmailCapture 
            source="homepage" 
            title="JOIN THE CREATOR MOVEMENT"
            description="Get exclusive tools, tips, and special offers delivered to your inbox."
          />
        </div>
      </section>
    </div>
  );
}
