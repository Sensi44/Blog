import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';

import { useStore } from 'hooks/useStore';
import { getPost, deleteArticle } from 'Api';
import dateCorrector from 'utils/dateCorrector';
import likeIcon from 'assets/img/like.svg';

import {
  setLoading,
  setError,
  startLoading,
} from '../../store/slices/loadingSlice';
import styles from '../PostPreview/PostP.module.scss';
import 'antd/dist/antd.min.css';

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, username: user, token } = useStore();
  const { slug } = useParams();
  const [post, setPost] = useState({
    tagList: [],
    author: {},
  });

  const {
    createdAt,
    description,
    title,
    tagList,
    author: { username, image },
    favoritesCount,
  } = post;

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

  const handleDeleteArticle = () => {
    console.log('delete article');
    deleteArticle(token, slug)
      .then((res) => {
        console.log(res);
        navigate('/articles');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(startLoading());
    getPost(slug, token)
      .then((res) => setPost(res.article))
      .catch((err) => dispatch(setError(err.message)))
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [slug, dispatch, token]);

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
                <img src={likeIcon} className={like} alt='Like' />
                <span className={likeCount}>{favoritesCount}</span>
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
                  <button className={btnDelete} onClick={handleDeleteArticle}>
                    Delete
                  </button>
                  <Link to={`/articles/${slug}/edit`} className={btnEdit}>
                    Edit
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
          <div className={articleBody}>
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
