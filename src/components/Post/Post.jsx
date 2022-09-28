import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';

import { useAuth } from 'hooks/useAuth';
import { getPost } from 'Api';
import likeIcon from 'assets/img/like.svg';
import dateCorrector from 'utils/dateCorrector';

import {
  setLoading,
  setError,
  startLoading,
} from '../../store/slices/loadingSlice';
import 'antd/dist/antd.min.css';
import styles from '../PostPreview/PostP.module.scss';

const Post = () => {
  const dispatch = useDispatch();
  const { loading, error } = useAuth();
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
    articleInfo,
    spin,
    loadingError,
  } = styles;

  useEffect(() => {
    dispatch(startLoading());
    getPost(slug)
      .then((res) => setPost(res.article))
      .catch((err) => dispatch(setError(err.message)))
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [slug, dispatch]);

  return (
    <>
      {loading ? <Spin size='large' className={spin} /> : null}

      {error ? (
        <div className={loadingError}>
          <p>Во время загрузки данных произошла ошибка</p>
          <p>Абонент недоступен или временно ананас</p>
          <p>{`"${error}"`}</p>
        </div>
      ) : (
        <div className={article}>
          <div className={articleInfo}>
            <div className={left}>
              <div className={leftTop}>
                <Link className={titleLink} to={`/posts/${slug}`}>
                  {title}
                </Link>
                <img src={likeIcon} className={like} alt='aaa' />
                <span className={likeCount}>1</span>
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
              <div className={rightLeft}>
                <div className={name}>{username}</div>
                <time className={date}>{dateCorrector(createdAt)}</time>
              </div>
              <img src={image} className={avatar} alt={`${username} avatar`} />
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
