import React from 'react';

export default function PaginationButtons({
  totalPages,
  currentPage,
  setPage,
}) {
  const createMarkup = () => {
    let pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  };

  return (
    <ul className="PaginationButtons">
      {totalPages &&
        createMarkup().map((el) => (
          <li key={el}>
            <button
              className={currentPage === el ? 'btn active' : 'btn'}
              onClick={() => {
                setPage(el);
              }}
            >
              {el}
            </button>
          </li>
        ))}
    </ul>
  );
}
