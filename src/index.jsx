import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import reducer, { chooseFilter } from './reducers/toolKitSlice';
import { App } from './components/App';

const logger = () => (next) => (action) => {
  console.log('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬');
  console.log(action.type);
  const result = next(action);
  console.log(store.getState());
  return result;
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([logger]);
  },
});

store.dispatch(chooseFilter('cheap'));

render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <div className='main'>
          <App />
        </div>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
