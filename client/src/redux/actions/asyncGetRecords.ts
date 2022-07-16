import {AppDispatch, RootState} from "../store";
import axios from "axios";
import {recordsSlice} from "../reducers/recordsSlice";

export const asyncGetRecords = (page = 1) => (dispatch: AppDispatch, getState: () => RootState) => {
  let queryParams = '';
  const { filterField, filterCondition, inputValue } = getState().recordsReducer;

  if (filterField && filterCondition && inputValue)
    queryParams = `&fieldName=${filterField}&condition=${filterCondition}&inputValue=${inputValue}`;

  dispatch(recordsSlice.actions.recordsFetching())

  axios.get(`http://localhost:8080/api/records?page=${page}${queryParams}`)
    .then(({ data }) => {
      const { records, totalCount } = data

      dispatch(recordsSlice.actions.recordsFetchingSuccess({ records, totalCount }))
    })
    .catch(e => {
      dispatch(recordsSlice.actions.recordsFetchingError('Error fetching records'))
    })
}
