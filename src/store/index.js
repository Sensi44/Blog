import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import loadingReducer from './slices/loadingSlice';
import articleSlice from './slices/articleSlice';
import postsSlice from './slices/postsSlice';

const reducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  article: articleSlice,
  posts: postsSlice,
});

export const store = configureStore({
  reducer,
});
