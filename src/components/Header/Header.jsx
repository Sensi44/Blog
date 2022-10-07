import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useStore } from 'hooks/useStore';
import { setUser } from 'store/slices/userSlice';
import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth, username, image } = useStore();

  const handleLogOut = () => {
    localStorage.removeItem('user_token');
    dispatch(
      setUser({
        email: null,
        token: null,
        username: null,
        loginError: null,
        image: null,
      })
    );
  };

  return (
    <header>
      <Link to='/' className='to-home'>
        RealWorldBlog
      </Link>

      {isAuth ? (
        <div className='auth'>
          <Link to='/new-article' className='newArticle'>
            Create article
          </Link>
          <Link to='/profile' className='profile'>
            {
              <div>
                {username}
                {image ? <img src={image} alt={`${username} avatar`} /> : null}
              </div>
            }
          </Link>
          <button className='logOut' onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      ) : (
        <div className='noAuth'>
          <Link to='/sign-in' className='sign-in'>
            Sign In
          </Link>
          <Link to='/sign-up' className='sign-up'>
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
