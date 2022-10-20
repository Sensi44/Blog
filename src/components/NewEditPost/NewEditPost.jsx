import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Alert } from 'antd';

import { addTag, deleteTag, getTagList } from 'utils/tagsReduce';
import { createArticle, editArticle, getPost } from 'api';
import { useStore } from 'hooks/useStore';
import { NewTag } from 'components/NewTag';
import { setLoading, setModal, startLoading } from 'store/slices/loadingSlice';
import { setArticle } from 'store/slices/articleSlice';
import { setError } from 'store/slices/userSlice';
import stylesAdd from 'components/NewEditPost/newEdit.module.scss';
import styles from 'components/SignUp/forms.module.scss';

const NewEditPost = ({ newPost }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [count, setCount] = useState(2);
  const {
    modalWindow,
    loginError,
    token,
    article = { tagList: [] },
  } = useStore();
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [tags, setTags] = useState(
    newPost
      ? [{ key: 1, title: `tag${1}`, last: true, id: 1, required: true }]
      : getTagList(article.tagList)
  );

  const addFirstTag = () => {
    setTags(getTagList(['enter tag']));
  };

  const redirect = () => {
    navigate('/articles');
  };

  const onSubmit = ({ title, description, text, ...tagsArray }) => {
    if (newPost) {
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
    }
    editArticle(token, slug, title, description, text, Object.values(tagsArray))
      .then((res) => {
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
    if (newPost) {
      setTags([
        { key: 1, title: `tag${1}`, last: true, id: 1, required: true },
      ]);

      reset({
        title: '',
        description: '',
        text: '',
        tag1: '',
      });
    }
  }, [newPost]);

  useEffect(() => {
    if (!newPost) {
      dispatch(startLoading());
      getPost(slug, token)
        .then((res) => {
          dispatch(setArticle(res.article));
        })
        .catch((err) => dispatch(setError(err.message)))
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [slug, dispatch, token, newPost]);

  useEffect(() => {
    if (!localStorage.getItem('user_token')) navigate('/sign-in');
  });

  return (
    <div className={`${styles.formContainer} ${stylesAdd.formContainer}`}>
      <form
        className={`${styles.form} ${stylesAdd.formSize}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={styles.title}>
          {newPost ? 'Create new article' : 'Edit article'}
        </h2>
        {modalWindow ? (
          <Alert
            message={newPost ? 'Article created' : 'Successfully edited'}
            className={styles.success}
            type='success'
            showIcon
          />
        ) : null}
        {loginError ? (
          <Alert
            message={newPost ? 'Article was not created' : 'Edit failed'}
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
            defaultValue={newPost ? null : article.title}
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
            defaultValue={newPost ? null : article.description}
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
            defaultValue={newPost ? null : article.body}
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
                defaultValue={elem.value}
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

export default NewEditPost;
