import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';

import { useStore } from 'hooks/useStore';
import { dislikeArticle, getPost, likeArticle } from 'Api';
import { Modal } from 'pages/Modal';
import dateCorrector from 'utils/dateCorrector';
import { setArticle } from 'store/slices/articleSlice';

import {
  setLoading,
  setError,
  startLoading,
  setModal,
} from '../../store/slices/loadingSlice';
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
    article: art = {
      createdAt: '',
      description: '',
      title: '',
      tagList: [],
      author: { username: '', image: '' },
      favoritesCount: 0,
      favorited: 0,
    },
  } = useStore();

  const {
    createdAt,
    description,
    title,
    tagList,
    author: { username, image },
    favoritesCount,
    favorited,
  } = art;

  const {
    titleLink,
    left,
    right,
    tags,
    tag,
    preview,
    date,
    rightLeft,
    avatar,
    name,
    leftTop,
    like,
    dislike,
    article,
    likeCount,
    articleBody,
    editable,
    articleInfo,
    spin,
    loadingError,
    rightTop,
    btnDelete,
    btnEdit,
  } = styles;

  const [likeArt, setLikeArt] = useState(favorited);
  const [likeNum, setLikeNum] = useState(favoritesCount);

  const handleModal = () => {
    dispatch(setModal(true));
  };

  const handleLike = () => {
    if (likeArt) {
      dislikeArticle(token, slug).then((res) => {
        setLikeArt(!likeArt);
        setLikeNum(likeNum - 1);
        // dispatch(setArticle(res.article));
        // setLikeArt(!likeArt);
        // setLikeNum(likeNum - 1);
      });
    }
    if (!likeArt) {
      likeArticle(token, slug).then((res) => {
        setLikeArt(!likeArt);
        setLikeNum(likeNum + 1);
        // dispatch(setArticle(res.article));
        // setLikeArt(!likeArt);
        // setLikeNum(likeNum + 1);
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
  }, [slug, dispatch, token, favorited, favoritesCount]);

  return (
    <>
      {loading ? <Spin size='large' className={spin} /> : null}

      {error ? (
        <div className={loadingError}>
          <p>Во время загрузки данных произошла ошибка</p>
          <p>Абонент недоступен или временно ананас</p>
          <p>{`"${error}"`}</p>
        </div>
      ) : null}
      {loading || error ? null : (
        <div className={article}>
          <div className={articleInfo}>
            <div className={left}>
              <div className={leftTop}>
                <Link className={titleLink} to={`/posts/${slug}`}>
                  {title}
                </Link>
                <button
                  onClick={handleLike}
                  className={likeArt ? dislike : like}
                />
                <span className={likeCount}>{likeNum}</span>
              </div>

              <ul className={tags}>
                {tagList.length
                  ? tagList.map((element, index) => (
                      <li className={tag} key={`tag-${index}`}>
                        {element}
                      </li>
                    ))
                  : null}
              </ul>
              <p className={preview}>{description}</p>
            </div>

            <div className={right}>
              <div className={rightTop}>
                <div className={rightLeft}>
                  <div className={name}>{username}</div>
                  <time className={date}>{dateCorrector(createdAt)}</time>
                </div>
                <img
                  src={image}
                  className={avatar}
                  alt={`${username} avatar`}
                />
              </div>
              {username === user ? (
                <div className={editable}>
                  <button className={btnDelete} onClick={handleModal}>
                    Delete
                  </button>
                  <Link to={`/articles/${slug}/edit`} className={btnEdit}>
                    Edit
                  </Link>
                  {modalWindow ? <Modal slug={slug} /> : null}
                </div>
              ) : null}
            </div>
          </div>
          <div className={articleBody}>
            <ReactMarkdown>{art.body}</ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
