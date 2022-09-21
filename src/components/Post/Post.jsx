import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import likeIcon from '../../assets/img/like.svg';
import styles from '../PostPreview/PostP.module.scss';
import dateCorrector from '../../utils/dateCorrector';

const Post = () => {
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
  } = styles;

  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => setPost(data.article));
  }, [slug]);

  return (
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
  );
};

export default Post;
