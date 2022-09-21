import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header';
import './Layout.scss';

const Layout = () => (
  <div className='app'>
    <Header />

    <main className='container'>
      <Outlet />
    </main>
  </div>
);

export default Layout;
