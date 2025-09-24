"use client";

import { useState } from "react";
import { CategoryFilter } from "../../common/index";

interface Tag {
  id: string;
  title: string;
}

interface PopularTagsSectionProps {
  tags: Tag[];
  title?: string;
  onTagSelect?: (tagId: string) => void;
  redirectUrl?: string;
}

const PopularTagsSection: React.FC<PopularTagsSectionProps> = ({
  tags,
  title = "Popular Right Now",
  onTagSelect,
  redirectUrl = "/category/electronics"
}) => {
  const [selectedTag, setSelectedTag] = useState('');

  const handleTagSelect = (tagId: string) => {
    setSelectedTag(tagId);
    
    if (onTagSelect) {
      onTagSelect(tagId);
    } else {
      const tag = tags.find(t => t.id === tagId);
      if (tag) {
        window.location.href = `${redirectUrl}?filter=${tagId}`;
      }
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-[#000000] mb-8">{title}</h2>
      <CategoryFilter
        categories={tags}
        selectedCategory={selectedTag}
        onCategoryChange={handleTagSelect}
        variant="light"
        size="medium"
        showAllOption={false}
        layout="horizontal"
        showIcons={false}
        className="justify-center"
      />
    </div>
  );
};

export default PopularTagsSection;
