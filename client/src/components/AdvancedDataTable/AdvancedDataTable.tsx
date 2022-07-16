import React, {useEffect} from 'react';
import Table from "../Table/Table";
import Loader from "../../common/Loader";
import {asyncGetRecords} from "../../redux/actions/asyncGetRecords";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import TableFilter from "../TableFilter/TableFilter";
import Pagination from "../Pagination/Pagination";

const AdvancedDataTable = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, records } = useAppSelector(state => state.recordsReducer)

  useEffect(() => {
    dispatch(asyncGetRecords())
  }, [])


  return (
    <div className={''}>
      <TableFilter />
      {records && <Table records={records}/>}
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <Pagination />
    </div>
  );
};

export default AdvancedDataTable;
