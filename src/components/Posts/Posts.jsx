import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';

import { Pages } from 'components/Pages';
import { PostPreview } from 'components/PostPreview';
import { getArticles } from 'Api';
import { useStore } from 'hooks/useStore';

import {
  setLoading,
  setError,
  startLoading,
} from '../../store/slices/loadingSlice';

import './Posts.scss';
import styles from './Posts.module.scss';

const Posts = () => {
  const dispatch = useDispatch();
  const { loading, error, token } = useStore();
  const [posts, setPosts] = useState({ articles: [], articlesCount: 0 });
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(startLoading());
    const offset = (page > 0 ? page - 1 : 0) * 5;

    getArticles(offset, 5, token)
      .then((res) => setPosts(res))
      .catch((err) => {
        dispatch(setError(err.message));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [page, dispatch, token]);

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

      {loading || error ? null : (
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
      )}

      <Pages pages={articlesCount} changePage={(num) => setPage(num)} />
    </>
  );
};

export default Posts;
