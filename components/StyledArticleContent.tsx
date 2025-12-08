'use client';

import ReactMarkdown from 'react-markdown';

interface StyledArticleContentProps {
  content: string;
}

function isHTML(str: string): boolean {
  return /<[a-z][\s\S]*>/i.test(str);
}

export default function StyledArticleContent({ content }: StyledArticleContentProps) {
  if (isHTML(content)) {
    return (
      <div 
        className="styled-article-content prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-orange-600 prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div className="styled-article-content prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-orange-600 prose-strong:text-gray-900">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="text-gray-700">{children}</li>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-orange-600 hover:text-orange-700 underline">
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
