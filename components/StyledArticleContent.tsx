'use client';

interface StyledArticleContentProps {
  content: string;
}

export default function StyledArticleContent({ content }: StyledArticleContentProps) {
  return (
    <div 
      className="styled-article-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
