import React from 'react';
import { Link } from 'react-router-dom';

import { CustomLink } from '../CustomLink';
import './Header.scss';

const Header = () => {
  return (
    <header>
      <Link to='/' className='to-home'>
        RealWorldBlog
      </Link>
      <Link to='/signIn' className='sign-in'>
        Sign In
      </Link>
      <Link to='/signUp' className='sign-up'>
        Sign Up
      </Link>

      <div className='dev-navigation'>
        Development Links
        <CustomLink to='/' name='test-link'>
          Home
        </CustomLink>
        <CustomLink to='/posts' name='test-link'>
          posts
        </CustomLink>
        <CustomLink to='/posts/123-eka4vn' name='test-link'>
          posts-3
        </CustomLink>
      </div>
    </header>
  );
};

export default Header;
