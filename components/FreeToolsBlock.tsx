import Link from "next/link";
import { getAllCmsTools } from "@/lib/tools";

interface FreeToolsBlockProps {
  currentSlug: string;
}

export async function FreeToolsBlock({ currentSlug }: FreeToolsBlockProps) {
  const tools = await getAllCmsTools();

  const otherTools = tools.filter((t) => t.slug !== currentSlug);

  if (!otherTools.length) return null;

  const limited = otherTools.slice(0, 20);

  return (
    <section className="mt-16 gradient-border rounded-2xl p-8 text-center bg-white max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gradient mb-3">
        Explore More Free Creator Tools
      </h2>
      <p className="text-gray-500 mb-6">
        VCM Suite offers a complete ecosystem of free tools for content creators and entrepreneurs.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {limited.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            {tool.title}
          </Link>
        ))}
        <Link
          href="/vcm-os"
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Join VCM OS Waitlist →
        </Link>
      </div>
    </section>
  );
}
