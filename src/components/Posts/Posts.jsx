import React, { useEffect, useState } from 'react';

import { PostPreview } from '../PostPreview';

import './Posts.scss';
import styles from './Posts.module.scss';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { articles } = posts;

  useEffect(() => {
    fetch('https://blog.kata.academy/api/articles/')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      {articles ? (
        articles
          .filter((post, index) => index >= 15)
          .map((post, index) => (
            <div key={`post-${index}`} className={styles.post}>
              <PostPreview post={post} />
            </div>
          ))
      ) : (
        <p>Постов нет</p>
      )}
    </div>
  );
};

export default Posts;
