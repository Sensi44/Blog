import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteArticle } from 'Api';
import { setModal } from 'store/slices/loadingSlice';
import styles from 'components/PostPreview/PostP.module.scss';

import { useStore } from '../hooks/useStore';

const Modal = ({ slug }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useStore();

  const handleDecline = () => {
    dispatch(setModal(false));
  };

  const handleDeleteArticle = () => {
    console.log('delete article');
    deleteArticle(token, slug)
      .then((res) => {
        console.log(res);
        dispatch(setModal(false));
        navigate('/articles');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalTop}>
        <div className={styles.sign} />
        <span className={styles.topText}>
          Are you sure to delete this article?
        </span>
      </div>
      <div className={styles.modalBot}>
        <button className={styles.btnDecline} onClick={handleDecline}>
          No
        </button>
        <button className={styles.btnConfirm} onClick={handleDeleteArticle}>
          Yes
        </button>
      </div>
    </div>
  );
};

export { Modal };
