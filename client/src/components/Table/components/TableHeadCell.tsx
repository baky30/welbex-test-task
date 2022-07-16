import React, {FC, useState} from 'react';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import {useAppDispatch} from "../../../redux/hooks";
import {recordsSlice} from "../../../redux/reducers/recordsSlice";

interface ITableHeadCell {
  children: string
  fieldName?: 'title' | 'quantity' | 'distance'
}

const TableHeadCell: FC<ITableHeadCell> = ({ children, fieldName }) => {
  const [isArrowUp, setIsArrowUp] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onSortClick = (isAscending: boolean) => {
    if (!fieldName) return;

    setIsArrowUp(isAscending);
    dispatch(recordsSlice.actions.sortRecords({ fieldName, isAscending }))
  }

  return (
    <th className={'p-3 text-white'}>
      <div className={'flex items-center justify-between'}>
        {children}
        { fieldName &&
          <button>
            {isArrowUp
              ? <AiFillCaretUp className={'ml-1'} onClick={() => onSortClick(false)}/>
              : <AiFillCaretDown className={'ml-1'} onClick={() => onSortClick(true)}/>
            }
          </button>
        }
      </div>
    </th>
  );
};

export default TableHeadCell;
