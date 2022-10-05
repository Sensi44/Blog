import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { likeArticle, dislikeArticle } from 'Api';
import dateCorrector from 'utils/dateCorrector';
import { useStore } from 'hooks/useStore';

import styles from './PostP.module.scss';

const PostPreview = ({ post }) => {
  const { token } = useStore();
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
  const [likeCount, setLikeNum] = useState(favoritesCount);

  const handleLike = () => {
    if (token) {
      if (likeArt) {
        dislikeArticle(token, slug).then(() => {
          setLikeArt(!likeArt);
          setLikeNum(likeCount - 1);
        });
      }
      if (!likeArt) {
        likeArticle(token, slug).then(() => {
          setLikeArt(!likeArt);
          setLikeNum(likeCount + 1);
        });
      }
    }
  };

  return (
    <>
      <div className={styles.left}>
        <div className={styles.leftTop}>
          <Link className={styles.titleLink} to={`/articles/${slug}`}>
            {title}
          </Link>
          <button
            onClick={handleLike}
            className={likeArt ? styles.dislike : styles.like}
          />
          <span className={styles.likeCount}>{likeCount}</span>
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
            <time className={styles.date}>{dateCorrector(createdAt)}</time>
          </div>
          <img
            src={image}
            className={styles.avatar}
            alt={`${username} avatar`}
          />
        </div>
      </div>
    </>
  );
};

export default PostPreview;
