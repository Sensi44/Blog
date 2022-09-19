import React from 'react';
import { Outlet } from 'react-router-dom';

import { CustomLink } from '../CustomLink';
import './Layout.scss';

const Layout = () => (
  <div className='app'>
    <div className='dev-navigation'>
      <CustomLink to='/'>Home</CustomLink>
      <CustomLink to='/posts'>posts</CustomLink>
      <CustomLink to='/posts/3'>posts-3</CustomLink>
    </div>

    <header>
      <h1>Header</h1>
    </header>

    <main className='container'>
      <Outlet />
    </main>

    <div className='navigation'>Навигация / пагинация</div>
  </div>
);

export default Layout;
