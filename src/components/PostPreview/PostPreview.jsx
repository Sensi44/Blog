import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import dateCorrector from 'utils/dateCorrector';
import likeIcon from 'assets/img/like.svg';
import { likeArticle, dislikeArticle } from 'Api';

import { useStore } from '../../hooks/useStore';

import styles from './PostP.module.scss';

const PostPreview = ({ post }) => {
  const { token } = useStore();
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
    likeCount,
    rightTop,
  } = styles;

  const {
    createdAt,
    slug,
    description,
    title,
    tagList,
    author: { username, image },
    favoritesCount,
    favorited,
  } = post;
  const [likeArt, setLikeArt] = useState(favorited);
  const [likeNum, setLikeNum] = useState(favoritesCount);

  const handleLike = () => {
    if (likeArt) {
      dislikeArticle(token, slug).then((a) => {
        setLikeArt(!likeArt);
        setLikeNum(likeNum - 1);
      });
    }
    if (!likeArt) {
      likeArticle(token, slug).then(() => {
        setLikeArt(!likeArt);
        setLikeNum(likeNum + 1);
      });
    }
  };

  console.log(post);
  return (
    <>
      <div className={left}>
        <div className={leftTop}>
          <Link className={titleLink} to={`/articles/${slug}`}>
            {title}
          </Link>
          <button onClick={handleLike} className={likeArt ? dislike : like} />
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
          <img src={image} className={avatar} alt={`${username} avatar`} />
        </div>
      </div>
    </>
  );
};

export default PostPreview;
