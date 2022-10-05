import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Offline } from 'react-detect-offline';
import { useDispatch } from 'react-redux';
import cookie from 'cookie_js';

import { getCurrentUser } from 'Api';
import { Header } from 'components/Header';
import { setUser } from 'store/slices/userSlice';
import './Layout.scss';

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (cookie.get('user_token')) {
      const token = cookie.get('user_token');
      getCurrentUser(token)
        .then((res) => {
          dispatch(setUser(res.user));
        })
        .catch(() => alert('failed to authorize user'));
    }
  }, [dispatch]);

  return (
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
};

export default Layout;
