import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {asyncGetRecords} from "../../redux/actions/asyncGetRecords";

const ROWS_PER_REQUEST = 4;

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector(state => state.recordsReducer.totalCount);
  const pages = Array.from({length: Math.ceil(+totalCount / ROWS_PER_REQUEST)}, (_, i) => i + 1);

  const onPageClick = (page: number) => {
    setCurrentPage(page);
    dispatch(asyncGetRecords(page));
  }

  return (
    <div className={'justify-center flex mt-4'}>
      { pages.map(page => (
        <button
          key={page}
          className={`border border-white rounded-md p-2 mx-1 ${page === currentPage ? 'bg-green-600 text-white' : 'bg-green-200'}`}
          onClick={() => onPageClick(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
