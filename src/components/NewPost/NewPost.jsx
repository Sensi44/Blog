import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cookie from 'cookie_js';

import { useStore } from 'hooks/useStore';
import { signIn } from 'Api';
import { setModal } from 'store/slices/loadingSlice';
import { setUser, setError } from 'store/slices/userSlice';
import styles from 'assets/css-modules/forms.module.scss';
import stylesAdd from 'assets/css-modules/newEdit.module.scss';

const NewPost = () => {
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const { modalWindow, loginError } = useStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(watch());

  const testAddTag = () => {
    setTags((prevState) => {
      console.log(prevState);
      // eslint-disable-next-line react/jsx-key
      return [...prevState, <div>aaa</div>];
    });
  };
  console.log(tags);
  const navigate = useNavigate();

  // const redirect = () => {
  //   navigate('/articles');
  // };

  const onSubmit = ({ email, password }) => {
    // signIn(email, password)
    //   .then((res) => {
    //     console.log(res);
    //     cookie.set('user_token', res.user.token, { expires: 11 });
    //     dispatch(setUser(res.user));
    //     dispatch(setModal(true));
    //     setTimeout(() => dispatch(setModal(false)), 1500);
    //     setTimeout(redirect, 1700);
    //   })
    //   .catch((err) => {
    //     if (err.response.status === 422) {
    //       dispatch(setError(err.response.data.errors));
    //       setTimeout(() => dispatch(setError(null)), 2000);
    //     }
    //   });
  };

  return (
    <div className={styles.formContainer}>
      <form
        className={`${styles.form} ${stylesAdd.formSize}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={styles.title}>Create new article</h2>
        {modalWindow ? (
          <div className={styles.success}>Login Successful</div>
        ) : null}
        {loginError ? (
          <div className={styles.loginError}>Incorrect login or password</div>
        ) : null}

        <label>
          <div className={styles.label}>Title</div>
          <input
            className={styles.input}
            type='text'
            placeholder='Title'
            {...register('title', {
              required: true,
              minLength: 3,
              maxLength: 80,
              pattern: /^[0-9A-Za-z]+$/i,
            })}
          />
          {errors.title && (
            <span className={styles.inputError}>Please enter title</span>
          )}
        </label>

        <label>
          <div className={styles.label}>Short description</div>
          <input
            className={styles.input}
            type='text'
            placeholder='Title'
            {...register('description', {
              required: true,
              minLength: 3,
              maxLength: 80,
              pattern: /^[0-9A-Za-z]+$/i,
            })}
          />
          {errors.description && (
            <span className={styles.inputError}>
              Please enter short description
            </span>
          )}
        </label>

        <label>
          <div className={styles.label}>Text</div>
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
        {tags}
        <input
          type='button'
          value='Add Tag'
          onClick={testAddTag}
          className={`${styles.mainButton} ${stylesAdd.button}`}
        />

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
