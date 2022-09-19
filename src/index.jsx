import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/antd.min.css';
import { App } from './components/App';

render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='main'>
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
