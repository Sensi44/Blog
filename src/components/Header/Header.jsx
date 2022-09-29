import React from 'react';
import { Link } from 'react-router-dom';

import { CustomLink } from 'components/CustomLink';
import './Header.scss';

const Header = () => {
  return (
    <header>
      <Link to='/' className='to-home'>
        RealWorldBlog
      </Link>
      <Link to='/sign-in' className='sign-in'>
        Sign In
      </Link>
      <Link to='/sign-up' className='sign-up'>
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
          posts/123
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
    </header>
  );
};

export default Header;
