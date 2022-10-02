import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Posts } from 'components/Posts';
import { Post } from 'components/Post';
import { SignUp } from 'components/SignUp';
import { SignIn } from 'components/SignIn';
import { Profile } from 'components/Profile';
import { NewPost } from 'components/NewPost';
import { Layout } from 'components/Layout';
import { HomePage } from 'pages/HomePage';
import { CustomLink } from 'components/CustomLink';
import './App.scss';

function App() {
  console.log('BLog-platform v3.0');
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='articles/' element={<Posts />} />
          <Route path='articles/:slug' element={<Post />} />
          <Route path='articles/:slug/edit' element={<div>Edit Post</div>} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='sign-in' element={<SignIn />} />
          <Route path='profile' element={<Profile />} />
          <Route path='new-article' element={<NewPost />} />
        </Route>
      </Routes>
      <div>
        <div className='dev-navigation'>
          Development Links
          <CustomLink to='/' name='test-link'>
            Home
          </CustomLink>
          <CustomLink to='/articles' name='test-link'>
            posts
          </CustomLink>
          <CustomLink to='/articles/zagolovok-test-ck513' name='test-link'>
            posts/MyPost
          </CustomLink>
          <CustomLink to='/articles/werwer-q6kwlk' name='test-link'>
            posts/NotMy
          </CustomLink>
          <CustomLink to='/sign-up' name='test-link'>
            Регистрация
          </CustomLink>
          <CustomLink to='/sign-in' name='test-link'>
            Login / SignIn
          </CustomLink>
          <CustomLink to='/profile' name='test-link'>
            Профиль
          </CustomLink>
        </div>
      </div>
    </>
  );
}

export default App;
