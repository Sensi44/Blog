import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Posts.scss';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { articles } = posts;

  useEffect(() => {
    fetch('https://blog.kata.academy/api/articles/')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  console.log(posts);

  return (
    <div>
      <p>post && articles</p>
      {articles ? (
        articles.map((post, index) => (
          <Link key={index} to={`/posts/${post.title}`}>
            <li>{post.title}</li>
          </Link>
        ))
      ) : (
        <p>Постов нет</p>
      )}
    </div>
  );
};

export default Posts;
