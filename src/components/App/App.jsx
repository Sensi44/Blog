import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from '../Layout';
import { HomePage } from '../../pages/HomePage';
import './App.scss';

function App() {
  console.log('app');

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='posts/' element={<p>Posts / Articles</p>} />
          <Route path='posts/:id' element={<p>Current post</p>} />
        </Route>
        <Route path='/about' element={<p>about</p>} />
      </Routes>
    </>
  );
}

export default App;
