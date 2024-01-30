import React from "react";
import styles from "./pagination.module.scss";
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={styles.pagination_button}
          style={{
            backgroundColor: currentPage === number ? "#db6f39" : "black",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "0.5rem",
            marginRight: "0.5rem",
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
