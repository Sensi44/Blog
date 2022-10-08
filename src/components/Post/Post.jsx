import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Spin, Popconfirm, Button, Alert } from 'antd';
import ReactMarkdown from 'react-markdown';

import { deleteArticle, dislikeArticle, getPost, likeArticle } from 'api';
import { useStore } from 'hooks/useStore';
import dateCorrector from 'utils/dateCorrector';
import { setArticle } from 'store/slices/articleSlice';
import { setLoading, setError, startLoading } from 'store/slices/loadingSlice';
import styles from 'components/PostPreview/PostP.module.scss';
import 'antd/dist/antd.min.css';

const classNames = require('classnames');

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const {
    loading,
    error,
    username: user,
    token,
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

  const handleDeleteArticle = () => {
    deleteArticle(token, slug)
      .then(() => {
        navigate('/articles');
      })
      .catch((err) => dispatch(setError(err)));
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

  const likeClass = classNames({
    [styles.dislike]: favorited,
    [styles.like]: !favorited,
    [styles.notActiveLike]: !token,
  });

  return (
    <>
      {loading ? <Spin size='large' className={styles.spin} /> : null}

      {error ? (
        <Alert
          message='An error occurred while loading data'
          type='error'
          showIcon
        />
      ) : null}
      {loading || error ? null : (
        <div className={styles.article}>
          <div className={styles.articleInfo}>
            <div className={styles.left}>
              <div className={styles.leftTop}>
                <div className={styles.titleLink}>{title}</div>
                <button onClick={handleLike} className={likeClass} />
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
                  <Popconfirm
                    className={styles.btnDelete}
                    placement='rightTop'
                    title='Are you sure to delete this article?'
                    onConfirm={handleDeleteArticle}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button>Delete</Button>
                  </Popconfirm>
                  <Link
                    to={`/articles/${slug}/edit`}
                    className={styles.btnEdit}
                  >
                    Edit
                  </Link>
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
