import React from 'react';
import { Link, useMatch } from 'react-router-dom';

import './CustomLink.scss';

const CustomLink = ({ children, to, ...props }) => {
  const match = useMatch({
    path: to,
  });

  const styles = [props.name];
  match ? styles.push('black') : styles.push('white');

  return (
    <Link className={`${styles.join(' ')}`} to={to} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;
