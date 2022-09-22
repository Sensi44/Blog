import React, { useEffect, useState } from 'react';

import { Pages } from '../Pages';
import { PostPreview } from '../PostPreview';
import { getArticles } from '../../Api';
import { setLoading } from '../../reducers/toolKitSlice';

import './Posts.scss';
import styles from './Posts.module.scss';

const Posts = ({ loading, dispatch }) => {
  const [posts, setPosts] = useState({ articles: [], articlesCount: 0 });
  const [page, setPage] = useState(0);

  const changePage = (num) => setPage(num);

  useEffect(() => {
    dispatch(setLoading(true));
    const offset = (page > 0 ? page - 1 : 0) * 5;
    getArticles(offset)
      .then((res) => setPosts(res))
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [page]);

  const { articles, articlesCount } = posts;
  return (
    <>
      <div>
        {articles ? (
          articles.map((post, index) => (
            <div key={`post-${index}`} className={styles.post}>
              <PostPreview post={post} />
            </div>
          ))
        ) : (
          <p>Постов нет</p>
        )}
      </div>
      <Pages pages={articlesCount} changePage={changePage} />
    </>
  );
};

export default Posts;
