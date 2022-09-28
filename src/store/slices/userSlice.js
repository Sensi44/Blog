import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
  },
});

const { actions, reducer } = userSlice;
export const { setUser } = actions;

export default reducer;
