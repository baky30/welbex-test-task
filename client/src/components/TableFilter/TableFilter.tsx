import React from 'react';
import Select from "./components/Select";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {recordsSlice} from "../../redux/reducers/recordsSlice";
import {BsSearch} from "react-icons/bs";
import {IoCloseSharp} from "react-icons/io5";
import {asyncGetRecords} from "../../redux/actions/asyncGetRecords";

const fieldOptions = [
  {option: 'Дата', value: 'date'},
  {option: 'Название', value: 'title'},
  {option: 'Количество', value: 'quantity'},
  {option: 'Расстояние', value: 'distance'},
]
const filterOptions = [
  {option: 'равно', value: 'equals'},
  {option: 'содержит', value: 'contains'},
  {option: 'больше', value: 'greater'},
  {option: 'меньше', value: 'less'},
]

const TableFilter = () => {
  const dispatch = useAppDispatch();
  const { inputValue, filterField, filterCondition } = useAppSelector(state => state.recordsReducer);

  const setFilterCondition = (value: string) => {
    dispatch(recordsSlice.actions.setFilterCondition(value))
  }

  const setFieldName = (value: string) => {
    dispatch(recordsSlice.actions.setFilterField(value))
  }

  const onInputChange = (value: string) => {
    dispatch(recordsSlice.actions.setInputValue(value))
  }

  const onClear = () => {
    dispatch(recordsSlice.actions.clearFilter())
    dispatch(asyncGetRecords())
  }

  return (
    <div>
      <Select
        value={filterField}
        options={fieldOptions}
        onChange={setFieldName}
      />
      <Select
        value={filterCondition}
        options={filterOptions}
        onChange={setFilterCondition}
      />
      <input className={'border p-2'} value={inputValue} onChange={(e) => onInputChange(e.target.value)} />
      <button className={'border p-2 rounded-full mx-3 bg-green-600 hover:bg-green-700'} onClick={() => dispatch(asyncGetRecords())}>
        <BsSearch className={'text-white'} />
      </button>
      <button className={'px-2 py-1 bg-red-500 rounded-md'} onClick={onClear}>
        <IoCloseSharp className={'text-white'} />
      </button>
    </div>
  );
};

export default TableFilter;
