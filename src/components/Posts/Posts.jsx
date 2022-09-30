import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import cookie from 'cookie_js';

import { Pages } from 'components/Pages';
import { PostPreview } from 'components/PostPreview';
import { getArticles, getCurrentUser } from 'Api';
import { useStore } from 'hooks/useStore';

import { setUser } from '../../store/slices/userSlice';
import {
  setLoading,
  setError,
  startLoading,
} from '../../store/slices/loadingSlice';

import './Posts.scss';
import styles from './Posts.module.scss';

const Posts = () => {
  const dispatch = useDispatch();
  const { loading, error } = useStore();
  const [posts, setPosts] = useState({ articles: [], articlesCount: 0 });
  const [page, setPage] = useState(0);

  const changePage = (num) => setPage(num);

  // Проверка авторизации
  useEffect(() => {
    if (cookie.get('user_token')) {
      const token = cookie.get('user_token');
      getCurrentUser(token)
        .then((res) => {
          dispatch(setUser(res.user));
        })
        .catch((err) => {
          alert('failed to authorize user');
        });
    }
  }, []);

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
  }, [page, dispatch]);

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

      <Pages pages={articlesCount} changePage={changePage} />
    </>
  );
};

export default Posts;
