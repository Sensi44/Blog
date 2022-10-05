import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import ReactMarkdown from 'react-markdown';

import { dislikeArticle, getPost, likeArticle } from 'Api';
import { useStore } from 'hooks/useStore';
import { Modal } from 'pages/Modal';
import dateCorrector from 'utils/dateCorrector';
import { setArticle } from 'store/slices/articleSlice';
import {
  setLoading,
  setError,
  startLoading,
  setModal,
} from 'store/slices/loadingSlice';

import styles from '../PostPreview/PostP.module.scss';
import 'antd/dist/antd.min.css';

const Post = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const {
    loading,
    error,
    username: user,
    token,
    modalWindow,
    article: {
      createdAt,
      description,
      title,
      tagList,
      body,
      author: { username, image },
      favoritesCount,
      favorited,
    },
  } = useStore();

  const handleModal = () => {
    dispatch(setModal(true));
  };

  const handleLike = () => {
    if (favorited) {
      dislikeArticle(token, slug).then((res) => {
        dispatch(setArticle(res.article));
      });
    }
    if (!favorited) {
      likeArticle(token, slug).then((res) => {
        dispatch(setArticle(res.article));
      });
    }
  };

  useEffect(() => {
    dispatch(startLoading());
    getPost(slug, token)
      // .then((res) => setPost(res.article))
      .then((res) => dispatch(setArticle(res.article)))
      .catch((err) => dispatch(setError(err.message)))
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [slug, dispatch, token]);

  return (
    <>
      {loading ? <Spin size='large' className={styles.spin} /> : null}

      {error ? (
        <div className={styles.loadingError}>
          <p>Во время загрузки данных произошла ошибка</p>
          <p>Абонент недоступен или временно ананас</p>
          <p>{`"${error}"`}</p>
        </div>
      ) : null}
      {loading || error ? null : (
        <div className={styles.article}>
          <div className={styles.articleInfo}>
            <div className={styles.left}>
              <div className={styles.leftTop}>
                <div className={styles.titleLink}>{title}</div>
                <button
                  onClick={handleLike}
                  className={favorited ? styles.dislike : styles.like}
                />
                <span className={styles.likeCount}>{favoritesCount}</span>
              </div>

              <ul className={styles.tags}>
                {tagList.length
                  ? tagList.map((element, index) => (
                      <li className={styles.tag} key={`tag-${index}`}>
                        {element}
                      </li>
                    ))
                  : null}
              </ul>
              <p className={styles.preview}>{description}</p>
            </div>

            <div className={styles.right}>
              <div className={styles.rightTop}>
                <div className={styles.rightLeft}>
                  <div className={styles.name}>{username}</div>
                  <time className={styles.date}>
                    {dateCorrector(createdAt)}
                  </time>
                </div>
                <img
                  src={image}
                  className={styles.avatar}
                  alt={`${username} avatar`}
                />
              </div>
              {username === user ? (
                <div className={styles.editable}>
                  <button className={styles.btnDelete} onClick={handleModal}>
                    Delete
                  </button>
                  <Link
                    to={`/articles/${slug}/edit`}
                    className={styles.btnEdit}
                  >
                    Edit
                  </Link>
                  {modalWindow ? <Modal slug={slug} /> : null}
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.articleBody}>
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
