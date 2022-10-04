import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  article: undefined,
};

const userSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticle(state, action) {
      state.article = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { setArticle } = actions;

export default reducer;
