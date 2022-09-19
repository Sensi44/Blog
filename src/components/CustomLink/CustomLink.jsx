import React from 'react';
import { Link, useMatch } from 'react-router-dom';

const CustomLink = ({ children, to, ...props }) => {
  const match = useMatch({
    path: to,
  });
  return (
    <Link
      className='test-link'
      to={to}
      {...props}
      style={{
        color: match ? 'white' : 'black',
        backgroundColor: match ? 'black' : 'white',
      }}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
