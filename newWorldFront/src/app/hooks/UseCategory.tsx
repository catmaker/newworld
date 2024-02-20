import { useState } from "react";

const useCategory = (initialCategory: any, setCurrentPage: any) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return { selectedCategory, handleCategoryClick };
};

export default useCategory;
