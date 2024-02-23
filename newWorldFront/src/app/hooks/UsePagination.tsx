import { useState, useEffect } from "react";

function usePagination(initialItems: any, itemsPerPage: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentItems(initialItems.slice(start, end));
  }, [currentPage, itemsPerPage]);

  const handlePageClick = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return { currentPage, currentItems, handlePageClick };
}
export default usePagination;
