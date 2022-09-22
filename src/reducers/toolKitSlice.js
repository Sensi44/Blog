import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import chooseBoxes from '../utils/chooseBoxes';
// import { fetchId, getTickets } from '../actions/actions';

const initialState = {
  loading: false,
};

const ticketsSlice = createSlice({
  name: 'toolkit',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

const { actions, reducer } = ticketsSlice;
export const { setLoading } = actions;

export default reducer;
