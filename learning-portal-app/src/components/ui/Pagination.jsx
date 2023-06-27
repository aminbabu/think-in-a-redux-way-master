import { useEffect, useState } from "react";
import Button from "./Button";

const PAGINATE_PAGE_LIMIT = process.env.REACT_APP_PAGINATE_PAGE_LIMIT || 5;

const Pagination = ({
  start,
  end,
  totalCount,
  pageLimit,
  handlePrevClick,
  handleNextClick,
  handlePageClick,
}) => {
  const pageCount = Math.ceil(totalCount / pageLimit);

  const [pageGap, setPageGap] = useState(1);

  const currentPage = Math.ceil(end / pageLimit);

  const numberOfPageToShow =
    pageCount > PAGINATE_PAGE_LIMIT ? PAGINATE_PAGE_LIMIT : pageCount;

  // side effects
  useEffect(() => {
    if (currentPage > PAGINATE_PAGE_LIMIT) {
      setPageGap(currentPage - PAGINATE_PAGE_LIMIT + 1);
    } else {
      setPageGap(1);
    }
  }, [currentPage]);

  return (
    pageCount > 1 && (
      <ul className="flex items-center gap-2 justify-end mt-6">
        {start > 0 && (
          <>
            <li>
              <Button
                className="border border-slate-500/60 rounded-md fill-white !w-10 !h-10 !p-0 hover:bg-slate-800"
                onClick={handlePrevClick}
              >
                <svg
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                </svg>
              </Button>
            </li>
            <li>
              <Button
                className="border border-slate-500/60 rounded-md fill-white !h-10 !py-0 hover:bg-slate-800"
                onClick={() => handlePageClick(0)}
              >
                First
              </Button>
            </li>
          </>
        )}
        {currentPage >= PAGINATE_PAGE_LIMIT && (
          <li>
            <Button className="border border-slate-500/60 rounded-md fill-white !w-10 !h-10 !p-0">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
              </svg>
            </Button>
          </li>
        )}
        {Array(numberOfPageToShow)
          .fill(numberOfPageToShow)
          .map((count, index) => (
            <li key={`${count}${index}`}>
              <Button
                className={`border border-slate-500/60 rounded-md fill-white !w-10 !h-10 !p-0 hover:bg-slate-800 ${
                  currentPage === index + pageGap ? "bg-slate-800" : ""
                }`}
                onClick={() => handlePageClick(index + pageGap - 1)}
              >
                {index + pageGap}
              </Button>
            </li>
          ))}
        {pageCount >= PAGINATE_PAGE_LIMIT && currentPage < pageCount && (
          <li>
            <Button className="border border-slate-500/60 rounded-md fill-white !w-10 !h-10 !p-0">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
              </svg>
            </Button>
          </li>
        )}
        <li>
          <Button
            className={`border border-slate-500/60 rounded-md fill-white !h-10 !py-0 hover:bg-slate-800 ${
              currentPage === pageCount ? "bg-slate-800" : ""
            }`}
            onClick={() => handlePageClick(pageCount - 1)}
          >
            Last
          </Button>
        </li>
        {end < totalCount && (
          <li>
            <Button
              className="border border-slate-500/60 rounded-md fill-white !w-10 !h-10 !p-0 hover:bg-slate-800"
              onClick={handleNextClick}
            >
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
              </svg>
            </Button>
          </li>
        )}
      </ul>
    )
  );
};

export default Pagination;
