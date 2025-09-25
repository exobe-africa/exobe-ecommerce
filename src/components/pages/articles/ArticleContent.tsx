"use client";

interface ArticleContentProps {
  content: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
      <div 
        className="prose prose-lg max-w-none text-[#4A4A4A] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          '--tw-prose-headings': '#000000',
          '--tw-prose-bold': '#000000',
          '--tw-prose-links': '#C8102E',
        } as any}
      />
    </div>
  );
};

export default ArticleContent;
