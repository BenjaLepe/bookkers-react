import React from 'react';
import '../styles/pages.css';

export default function Pages(props) {
  const {page, totalPages, setPage} = props;

  const handlePageChange = (op) => {
    op === '-' ? setPage(page - 1) : setPage(page + 1);
  };

  return (
    <div className="page-set">
      <button
        type="button"
        className="page-button"
        onClick={() => handlePageChange('-')}
        disabled={page <= 1}>
        Back
      </button>
      <p className="pages">{`${page} : ${totalPages}`}</p>
      <button
        type="button"
        className="page-button"
        onClick={() => handlePageChange('+')}
        disabled={page >= totalPages}>
        Next
      </button>
    </div>
  );
}