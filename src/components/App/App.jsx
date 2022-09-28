import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Posts } from 'components/Posts';
import { Post } from 'components/Post';
import { SignUp } from 'components/SignUp';
import { Layout } from 'components/Layout';
import { HomePage } from 'pages/HomePage';
import './App.scss';

function App() {
  console.log('BLog-platform v3.0');
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='posts/' element={<Posts />} />
          <Route path='posts/:slug' element={<Post />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='sign-in' element={<div>Логин</div>} />
          <Route path='profile' element={<div>Профиль</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
