import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
};

const ticketsSlice = createSlice({
  name: 'toolkit',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    startLoading(state) {
      state.loading = true;
      state.error = '';
    },
  },
});

const { actions, reducer } = ticketsSlice;
export const { setLoading, setError, startLoading } = actions;

export default reducer;
