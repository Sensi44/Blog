import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from '../Layout';
import { SignUp } from '../SignUp';
import { PostsBox, PostBox } from '../../Containers/PostsBox';
import './App.scss';

function App() {
  console.log('BLog-platform v2.2');

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/posts' replace />} />
          <Route path='posts/' element={<PostsBox />} />
          <Route path='posts/:slug' element={<PostBox />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='sign-in' element={<div>Логин</div>} />
          <Route path='profile' element={<div>Профиль</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
