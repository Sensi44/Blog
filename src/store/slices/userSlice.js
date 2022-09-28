import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
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

const { actions, reducer } = userSlice;
export const { setLoading, setError, startLoading, setModal } = actions;

export default reducer;
