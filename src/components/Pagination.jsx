const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div style={{ margin: "20px 0" }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            backgroundColor: currentPage === page ? "#007bff" : "#e0e0e0",
            color: currentPage === page ? "white" : "black",
            border: "none",
            cursor: "pointer",
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
