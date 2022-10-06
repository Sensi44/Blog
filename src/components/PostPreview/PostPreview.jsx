import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { likeArticle, dislikeArticle } from 'Api';
import { useStore } from 'hooks/useStore';
import dateCorrector from 'utils/dateCorrector';
import styles from 'assets/css-modules/PostP.module.scss';

const classNames = require('classnames');

const PostPreview = ({ post, update }) => {
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

  const handleLike = () => {
    if (token) {
      if (favorited) {
        dislikeArticle(token, slug).finally(() => {
          update();
        });
      }
      if (!favorited) {
        likeArticle(token, slug).finally(() => {
          update();
        });
      }
    }
  };

  const likeClass = classNames({
    [styles.dislike]: favorited,
    [styles.like]: !favorited,
    [styles.notActiveLike]: !token,
  });

  return (
    <>
      <div className={styles.left}>
        <div className={styles.leftTop}>
          <Link className={styles.titleLink} to={`/articles/${slug}`}>
            {title}
          </Link>
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

PostPreview.propTypes = {
  post: PropTypes.object,
  update: PropTypes.func,
};

export default PostPreview;
