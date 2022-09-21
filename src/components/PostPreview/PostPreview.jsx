import React from 'react';
import { Link } from 'react-router-dom';

import dateCorrector from '../../utils/dateCorrector';
import likeIcon from '../../assets/img/like.svg';

import styles from './PostP.module.scss';

const PostPreview = ({ post }) => {
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
    likeCount,
  } = styles;

  const {
    createdAt,
    slug,
    description,
    title,
    tagList,
    author: { username, image },
  } = post;

  return (
    <>
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
    </>
  );
};

export default PostPreview;