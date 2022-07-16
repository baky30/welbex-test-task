import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRecord} from "../../commonInterfaces";

interface IInitialState {
  records: IRecord[]
  totalCount: string
  inputValue: string
  filterField: string
  filterCondition: string
  isLoading: boolean
  error: string
}

const initialState: IInitialState = {
  records: [],
  totalCount: '',
  inputValue: '',
  filterField: '',
  filterCondition: '',
  isLoading: false,
  error: ''
}

export const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    setInputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload
    },
    setFilterField(state, action: PayloadAction<string>) {
      state.filterField = action.payload
    },
    setFilterCondition(state, action: PayloadAction<string>) {
      state.filterCondition = action.payload
    },
    recordsFetching(state) {
      state.isLoading = true;
    },
    recordsFetchingSuccess(state, action: PayloadAction<{ records: IRecord[], totalCount: string }>) {
      state.records = action.payload.records;
      state.totalCount = action.payload.totalCount;
      state.error = '';
      state.isLoading = false;
    },
    recordsFetchingError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    sortRecords(state, action: PayloadAction<{ fieldName: 'title' | 'quantity' | 'distance', isAscending: boolean }>) {
      const { fieldName, isAscending } = action.payload;

      state.records = state.records.sort((a, b) =>
        isAscending
          ? a[fieldName] > b[fieldName] ? 1 : -1
          : a[fieldName] < b[fieldName] ? 1 : -1
      )
    },
    clearFilter(state) {
      state.filterCondition = '';
      state.filterField = '';
      state.inputValue = '';
    }
  }
})

export default recordsSlice.reducer;
