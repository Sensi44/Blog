import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Alert } from 'antd';
import { useDispatch } from 'react-redux';

import { Pages } from 'components/Pages';
import { PostPreview } from 'components/PostPreview';
import { getArticles } from 'api';
import { useStore } from 'hooks/useStore';
import { setLoading, setError, startLoading } from 'store/slices/loadingSlice';
import { setPosts } from 'store/slices/postsSlice';

import styles from './PostList.module.scss';

const PostList = () => {
  const dispatch = useDispatch();
  const { p: page = 0 } = useParams();
  const { loading, error, token, posts } = useStore();

  const update = () => {
    const offset = (page > 0 ? page - 1 : 0) * 5;
    getArticles(offset, 5, token).then((res) => dispatch(setPosts(res)));
  };

  useEffect(() => {
    dispatch(startLoading());
    const offset = (page > 0 ? page - 1 : 0) * 5;

    getArticles(offset, 5, token)
      .then((res) => dispatch(setPosts(res)))
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
      {loading ? (
        <section className={styles.section}>
          <Spin size='large' className={styles.spin} />
        </section>
      ) : null}

      {error ? (
        <section className={styles.section}>
          <Alert
            message='An error occurred while loading data'
            type='error'
            showIcon
          />
        </section>
      ) : null}

      {loading || error ? null : (
        <ul className={styles.section}>
          {articles ? (
            articles.map((post, index) => (
              <li key={`post-${index}`} className={styles.post}>
                <PostPreview post={post} update={update} />
              </li>
            ))
          ) : (
            <p>Постов нет</p>
          )}
        </ul>
      )}
      <Pages pages={articlesCount} current={page === 0 ? 1 : +page} />
    </>
  );
};

export default PostList;
