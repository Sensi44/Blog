import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: {
    articles: [],
    articlesCount: 0,
  },
};

const postsSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

const { actions, reducer } = postsSlice;
export const { setPosts } = actions;

export default reducer;
