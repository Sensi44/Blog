import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Posts } from 'components/Posts';
import { Post } from 'components/Post';
import { SignUp } from 'components/SignUp';
import { SignIn } from 'components/SignIn';
import { Profile } from 'components/Profile';
import { NewPost } from 'components/NewPost';
import { EditPost } from 'components/EditPost';
import { Layout } from 'components/Layout';
import { HomePage } from 'pages/HomePage';
import './App.scss';

function App() {
  console.log('BLog-platform v2.4.1');
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='articles/' element={<Posts />} />
          <Route path='articles/page-:p' element={<Posts />} />
          <Route path='articles/:slug' element={<Post />} />
          <Route path='articles/:slug/edit' element={<EditPost />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='sign-in' element={<SignIn />} />
          <Route path='profile' element={<Profile />} />
          <Route path='new-article' element={<NewPost />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
