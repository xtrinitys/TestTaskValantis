import React from "react";
import { generateArrayFromN } from "../../../utils/utils";
import cl from "./Pagination.module.css";
import classNames from "classnames";

interface PaginationProps {
  currentPage: number;
  pagesCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pagesCount,
  onPageChange,
}) => {
  const pages = generateArrayFromN(pagesCount);
  const MAX_VISIBLE_PAGES = 5;

  const middlePage = Math.floor(MAX_VISIBLE_PAGES / 2);
  const startPage = Math.max(currentPage - middlePage, 0);
  const endPage = Math.min(startPage + MAX_VISIBLE_PAGES, pagesCount);

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onPageChange(parseInt(e.currentTarget.textContent as string) - 1);
  };

  const handleOnFirst = () => {
    onPageChange(0);
  };

  const handleOnLast = () => {
    onPageChange(pagesCount - 1);
  };

  return (
    <div className={cl.pagination}>
      {pagesCount > 1 && (
        <div
          className={classNames(cl.paginationItem, cl.paginationArrow)}
          key={-1}
          onClick={handleOnFirst}
        >
          <i className="ri-arrow-left-s-fill"></i>
        </div>
      )}

      {pages.slice(startPage, endPage).map((page) => (
        <div
          className={classNames(cl.paginationItem, {
            active: currentPage === page,
          })}
          key={page}
          onClick={handleOnClick}
        >
          {page + 1}
        </div>
      ))}
      {pagesCount > 1 && (
        <div
          className={classNames(cl.paginationItem, cl.paginationArrow)}
          key={pagesCount + 1}
          onClick={handleOnLast}
        >
          <i className="ri-arrow-right-s-fill"></i>
        </div>
      )}
    </div>
  );
};

export default Pagination;
