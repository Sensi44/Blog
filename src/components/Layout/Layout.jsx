import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Offline } from 'react-detect-offline';
import { Alert } from 'antd';

import { getCurrentUser } from 'api';
import { useStore } from 'hooks/useStore';
import { Header } from 'components/Header';
import { setError, setUser } from 'store/slices/userSlice';
import './Layout.scss';

const Layout = () => {
  const dispatch = useDispatch();
  const { loginError } = useStore();

  useEffect(() => {
    if (localStorage.getItem('user_token')) {
      const token = localStorage.getItem('user_token');
      getCurrentUser(token)
        .then((res) => {
          dispatch(setUser(res.user));
        })
        .catch((err) => {
          dispatch(setError(err.response.data.errors));
          setTimeout(() => dispatch(setError(null)), 2000);
        });
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
        {loginError ? (
          <Alert message='failed to authorize user' type='error' showIcon />
        ) : null}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
