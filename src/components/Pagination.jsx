import "./Pagination.css";

const Pagination = ({ currentPage, totalPage, onPrev, onNext, postsPerPage, setPostsPerPage }) => {
  return (
    <div className="pagination">
     
     <select 
  value={postsPerPage} 
  onChange={(e) => {
    setPostsPerPage(Number(e.target.value));
    // Reset to first page to avoid "out of bounds" errors
    setCurrentPage(1); 
  }}
>
        <option value="10">10</option>
        <option value="20">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <button className="page-btn" onClick={onPrev} disabled={currentPage === 1}>PREV</button>

      <span>{currentPage} of {totalPage}</span>
      
      <button  className="page-btn" onClick={onNext} disabled={currentPage === totalPage}>NEXT</button>
    </div>
  );
};
  export default Pagination;