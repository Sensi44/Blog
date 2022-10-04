import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import loadingReducer from './slices/loadingSlice';
import articleSlice from './slices/articleSlice';

const reducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  article: articleSlice,
});

const logger = () => (next) => (action) => {
  // console.log(`▬▬▬▬▬▬▬ ${action.type} ▬▬▬▬▬▬▬`);
  const result = next(action);
  // console.log(store.getState());
  return result;
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([logger]);
  },
});
