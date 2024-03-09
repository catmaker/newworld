import { useState, useEffect } from "react";
import {
  getAttendanceRankingAPI,
  getScoreRankingAPI,
  getTotalRankingAPI,
} from "../lib/api/ranking";

const useCategory = (initialCategory: any, setCurrentPage: any) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let response: any;
      switch (selectedCategory) {
        case "문제":
          response = await getTotalRankingAPI();
          break;
        case "출석":
          response = await getAttendanceRankingAPI();
          break;
        default:
          response = await getScoreRankingAPI();
          break;
      }
      setData(response);
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return { selectedCategory, handleCategoryClick, data };
};

export default useCategory;
