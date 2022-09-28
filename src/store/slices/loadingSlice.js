import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  modalWindow: false,
};

const loadingSlice = createSlice({
  name: 'loading',
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
    setModal(state, action) {
      state.modalWindow = action.payload;
    },
  },
});

const { actions, reducer } = loadingSlice;
export const { setLoading, setError, startLoading, setModal } = actions;

export default reducer;
