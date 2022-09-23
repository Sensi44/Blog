import React from 'react';
import { Outlet } from 'react-router-dom';
import { Offline } from 'react-detect-offline';

import { Header } from '../Header';
import './Layout.scss';

const Layout = () => (
  <div className='app'>
    <Header />
    <Offline>
      <div className='network-e'>
        Internet connection problem, please check your network connection
      </div>
    </Offline>

    <main className='container'>
      <Outlet />
    </main>
  </div>
);

export default Layout;
