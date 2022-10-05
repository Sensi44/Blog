import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  article: {
    createdAt: '',
    description: '',
    title: '',
    tagList: [],
    body: '',
    author: { username: '', image: '' },
    favoritesCount: 0,
    favorited: 0,
  },
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticle(state, action) {
      state.article = action.payload;
    },
  },
});

const { actions, reducer } = articleSlice;
export const { setArticle } = actions;

export default reducer;
