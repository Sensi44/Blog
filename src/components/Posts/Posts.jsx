import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';

import { Pages } from 'components/Pages';
import { PostPreview } from 'components/PostPreview';
import { getArticles } from 'Api';
import { useStore } from 'hooks/useStore';
import { setLoading, setError, startLoading } from 'store/slices/loadingSlice';
import { setPosts } from 'store/slices/postsSlice';

import './Posts.scss';
import styles from './Posts.module.scss';

const Posts = () => {
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
      // .then((res) => setPosts(res))
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
      {loading ? <Spin size='large' className={styles.spin} /> : null}

      {error ? (
        <div className={styles.error}>
          <p>An error occurred while loading data</p>
          <p>{`"${error}"`}</p>
        </div>
      ) : null}

      {loading || error ? null : (
        <div>
          {articles ? (
            articles.map((post, index) => (
              <div key={`post-${index}`} className={styles.post}>
                <PostPreview post={post} update={update} />
              </div>
            ))
          ) : (
            <p>Постов нет</p>
          )}
        </div>
      )}
      <Pages pages={articlesCount} current={page === 0 ? 1 : +page} />
    </>
  );
};

export default Posts;
