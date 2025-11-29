import Link from "next/link";

const tools = [
  { name: "AI Logo Generator", href: "/tools/logo-generator" },
  { name: "Keyword Finder", href: "/tools/keyword-finder" },
  { name: "Image Compressor", href: "/tools/image-compressor" },
  { name: "Word Counter", href: "/tools/word-counter" },
  { name: "GIF Compressor", href: "/tools/gif-compressor" },
  { name: "Emoji Combos", href: "/tools/emoji-combos" },
  { name: "Thumbnail Coach", href: "/tools/ai-thumbnail-coach" },
  { name: "Visualization", href: "/tools/visualization" },
  { name: "Affirmations", href: "/tools/affirmation-about-self-love" },
  { name: "Horoscope", href: "/tools/horoscope-of-the-day" },
  { name: "Ideas Hub", href: "/ideas" },
  { name: "VCM Answers", href: "/answers" },
];

interface ExploreMoreToolsProps {
  currentTool?: string;
}

export default function ExploreMoreTools({ currentTool }: ExploreMoreToolsProps) {
  const filteredTools = currentTool 
    ? tools.filter(tool => tool.href !== currentTool)
    : tools;

  return (
    <section className="mt-16 gradient-border rounded-2xl p-8 text-center bg-white">
      <h2 className="text-2xl font-bold text-gradient mb-3">
        Explore More Free Creator Tools
      </h2>
      <p className="text-gray-500 mb-6">
        VCM Hub offers a complete ecosystem of free tools for content creators and entrepreneurs.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {filteredTools.map((tool) => (
          <Link 
            key={tool.href}
            href={tool.href} 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            {tool.name}
          </Link>
        ))}
        <Link 
          href="https://ape.vcm.fyi" 
          target="_blank" 
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Open VCM OS →
        </Link>
      </div>
    </section>
  );
}
