import React from "react";
import "../styles-components/Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesToShow = 10;
  const pages = [];

  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  if (totalPages > pagesToShow) {
    if (endPage === totalPages) {
      startPage = endPage - pagesToShow + 1;
    } else if (startPage === 1) {
      endPage = startPage + pagesToShow - 1;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const goToNextSet = () => {
    const nextSetPage = endPage + 1;
    onPageChange(nextSetPage);
  };

  const goToPreviousSet = () => {
    const previousSetPage = startPage - 1;
    onPageChange(previousSetPage);
  };

  return (
    <div className="pagination-container">
      <button
        onClick={goToPreviousSet}
        disabled={startPage === 1}
        className="pagination-arrow"
      >
        {"<"}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-button ${
            currentPage === page ? "active" : ""
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={goToNextSet}
        disabled={endPage === totalPages}
        className="pagination-arrow"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
