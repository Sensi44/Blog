import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Posts } from 'components/Posts';
import { Post } from 'components/Post';
import { SignUp } from 'components/SignUp';
import { SignIn } from 'components/SignIn';
import { Profile } from 'components/Profile';
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
          <Route path='sign-in' element={<SignIn />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
