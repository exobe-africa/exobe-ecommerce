"use client";

interface ArticleImageProps {
  image: string;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ image }) => {
  return (
    <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
      <div className="h-64 sm:h-80 bg-gradient-to-br from-[#C8102E]/10 to-[#C8102E]/20 rounded-2xl flex items-center justify-center">
        <span className="text-8xl sm:text-9xl">{image}</span>
      </div>
    </div>
  );
};

export default ArticleImage;
