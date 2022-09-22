import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from '../Layout';
import { Posts } from '../Posts';
import { Post } from '../Post';
import PostsBox from '../../Containers/PostsBox';
import './App.scss';

function App() {
  console.log('BLog-platform v2.1');

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/posts' replace />} />
          <Route path='posts/' element={<PostsBox />} />
          <Route path='posts/:slug' element={<Post />} />
        </Route>
        <Route path='/about' element={<p>about</p>} />
      </Routes>
    </>
  );
}

export default App;
