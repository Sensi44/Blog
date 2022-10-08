import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Alert } from 'antd';

import { addTag, deleteTag, getTagList } from 'utils/tagsReduce';
import { createArticle } from 'api';
import { useStore } from 'hooks/useStore';
import { NewTag } from 'components/NewTag';
import { setModal } from 'store/slices/loadingSlice';
import { setError } from 'store/slices/userSlice';
import stylesAdd from 'components/NewPost/newEdit.module.scss';
import styles from 'components/SignUp/forms.module.scss';

const NewPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modalWindow, loginError, token, username } = useStore();
  const [count, setCount] = useState(2);
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [tags, setTags] = useState([
    { key: 1, title: `tag${1}`, last: true, id: 1, required: true },
  ]);
  const addFirstTag = () => {
    setTags(getTagList(['enter tag']));
  };
  const redirect = () => {
    navigate('/articles');
  };

  const onSubmit = ({ title, description, text, ...tagsArray }) => {
    createArticle(token, title, description, text, Object.values(tagsArray))
      .then(() => {
        dispatch(setModal(true));
        setTimeout(() => dispatch(setModal(false)), 1500);
        setTimeout(redirect, 1700);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          dispatch(setError(err.response.data.errors));
          setTimeout(() => dispatch(setError(null)), 2000);
        }
      });
  };

  useEffect(() => {
    if (!username) navigate('/sign-in');
  });

  return (
    <div className={`${styles.formContainer} ${stylesAdd.formContainer}`}>
      <form
        className={`${styles.form} ${stylesAdd.formSize}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={styles.title}>Create new article</h2>
        {modalWindow ? (
          <Alert
            message='Article created'
            className={styles.success}
            type='success'
            showIcon
          />
        ) : null}
        {loginError ? (
          <Alert
            message='Article was not created'
            type='error'
            className={styles.loginError}
            showIcon
          />
        ) : null}

        <label>
          Title
          <input
            className={styles.input}
            type='text'
            placeholder='Title'
            {...register('title', {
              required: true,
              minLength: 3,
              maxLength: 80,
              pattern: /^[0-9A-Za-zА-Яа-яё\s]+$/gi,
            })}
          />
          {errors.title && (
            <span className={styles.inputError}>Please enter title</span>
          )}
        </label>

        <label>
          Short description
          <input
            className={styles.input}
            type='text'
            placeholder='Title'
            {...register('description', {
              required: true,
              minLength: 3,
              maxLength: 80,
              pattern: /^[0-9A-Za-zА-Яа-яё\s]+$/i,
            })}
          />
          {errors.description && (
            <span className={styles.inputError}>
              Please enter short description
            </span>
          )}
        </label>

        <label>
          Text
          <textarea
            className={stylesAdd.textArea}
            placeholder='Text'
            {...register('text', { maxLength: 5000 })}
          />
          {errors.description && (
            <span className={styles.inputError}>
              Please enter short description
            </span>
          )}
        </label>

        <div className={stylesAdd.tags}>
          <div className={styles.label}>Tags</div>
          {tags.map((elem, index) => {
            elem.last = index === tags.length - 1;
            const { id, title } = elem;
            return (
              <NewTag
                key={elem.key}
                title={elem.title}
                addTag={() => addTag(setCount, setTags, count)}
                register={register}
                deleteTag={() => deleteTag(id, title, unregister, setTags)}
                last={elem.last}
                id={elem.id}
                errors={errors}
              />
            );
          })}
          {!tags.length ? (
            <input
              type='button'
              value='Add Tag'
              onClick={addFirstTag}
              className={stylesAdd.addTagButton}
            />
          ) : null}
        </div>

        <input
          type='submit'
          value='Send'
          className={`${styles.mainButton} ${stylesAdd.button}`}
        />
      </form>
    </div>
  );
};

export default NewPost;
