import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmailCapture } from "@/components/email-capture";
import { ArrowRight, Code, BookOpen, Download, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          VCM Store
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Apps, systems, and downloads to help creators & digital nomads make money online
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/store">
            <Button size="lg" className="w-full sm:w-auto">
              Browse Store <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/strategy-ai">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Get AI Strategy
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Find</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apps</h3>
              <p className="text-muted-foreground">Ready-to-use applications for your business</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Funnels</h3>
              <p className="text-muted-foreground">Conversion-optimized sales funnels</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Courses</h3>
              <p className="text-muted-foreground">Learn skills to grow your business</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Downloads</h3>
              <p className="text-muted-foreground">Templates, PDFs, and resources</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <EmailCapture source="homepage" />
        </div>
      </section>
    </div>
  );
}
