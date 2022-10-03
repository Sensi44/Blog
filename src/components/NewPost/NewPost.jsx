import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useStore } from 'hooks/useStore';
import { NewTag } from 'components/NewTag';
import { createArticle } from 'Api';
import { setModal } from 'store/slices/loadingSlice';
import { setError } from 'store/slices/userSlice';
import styles from 'assets/css-modules/forms.module.scss';
import stylesAdd from 'assets/css-modules/newEdit.module.scss';

const NewPost = () => {
  const navigate = useNavigate();
  const { modalWindow, loginError, token, username } = useStore();
  const [count, setCount] = useState(2);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const deleteTag = (id) => {
    setTags((prevState) => {
      if (prevState.length === 1) {
        return [...prevState];
      }
      const temp = prevState;
      const result = temp.filter((elem) => {
        console.log(elem.id, id);
        return elem.id !== id;
      });
      return [...result];
    });
  };

  const addTag = () => {
    setCount(count + 1);
    setTags((prevState) => {
      return [
        ...prevState,
        {
          key: count,
          title: `tag${count}`,
          last: true,
          id: count,
          required: false,
        },
      ];
    });
  };

  const [tags, setTags] = useState([
    { key: 1, title: `tag${1}`, last: true, id: 1, required: true },
  ]);

  const dispatch = useDispatch();

  const redirect = () => {
    navigate('/articles');
  };

  const onSubmit = ({ title, description, text, ...tagsArray }) => {
    console.log(title, description, text, Object.values(tagsArray));
    createArticle(token, title, description, text, Object.values(tagsArray))
      .then((res) => {
        console.log(res);
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

  console.table(tags);
  return (
    <div className={`${styles.formContainer} ${stylesAdd.formContainer}`}>
      <form
        className={`${styles.form} ${stylesAdd.formSize}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={styles.title}>Create new article</h2>
        {modalWindow ? (
          <div className={styles.success}>Article created</div>
        ) : null}
        {loginError ? (
          <div className={styles.loginError}>Article was not created</div>
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

        <div className={stylesAdd.tags}>
          <div className={styles.label}>Tags</div>
          {tags.map((elem, index) => {
            elem.last = index === tags.length - 1;
            return (
              <NewTag
                key={elem.key}
                title={elem.title}
                addTag={addTag}
                register={register}
                deleteTag={deleteTag}
                last={elem.last}
                id={elem.id}
                errors={errors}
              />
            );
          })}
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
