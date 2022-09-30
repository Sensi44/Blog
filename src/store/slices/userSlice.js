import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  username: null,
  loginError: null,
  image: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
    setError(state, action) {
      state.loginError = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { setUser, setError } = actions;

export default reducer;
