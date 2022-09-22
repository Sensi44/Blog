import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

import { Pages } from '../Pages';
import { PostPreview } from '../PostPreview';
import { getArticles } from '../../Api';
import {
  setLoading,
  setError,
  startLoading,
} from '../../reducers/toolKitSlice';

import './Posts.scss';
import styles from './Posts.module.scss';

const Posts = ({ loading, error, dispatch }) => {
  const [posts, setPosts] = useState({ articles: [], articlesCount: 0 });
  const [page, setPage] = useState(0);

  const changePage = (num) => setPage(num);

  useEffect(() => {
    dispatch(startLoading());
    const offset = (page > 0 ? page - 1 : 0) * 5;

    getArticles(offset)
      .then((res) => setPosts(res))
      .catch((err) => {
        dispatch(setError(err.message));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [page]);

  const { articles, articlesCount } = posts;
  return (
    <>
      {loading ? <Spin size='large' className={styles.spin} /> : null}

      {error ? (
        <div className={styles.error}>
          <p>Во время загрузки данных произошла ошибка</p>
          <p>Абонент недоступен или временно ананас</p>
          <p>{`"${error}"`}</p>
        </div>
      ) : null}

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
