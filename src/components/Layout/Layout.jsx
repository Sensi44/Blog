import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Offline } from 'react-detect-offline';
import { useDispatch } from 'react-redux';
import { Alert } from 'antd';

import { getCurrentUser } from 'api';
import { Header } from 'components/Header';
import { setUser } from 'store/slices/userSlice';
import './Layout.scss';

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('user_token')) {
      const token = localStorage.getItem('user_token');
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
          <Alert
            message='Internet connection problem, please check your network connection'
            type='error'
          />
        </div>
      </Offline>
      <main className='container'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
