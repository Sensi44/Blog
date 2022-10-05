import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getTagList, addTag, deleteTag } from 'utils/tagsReduce';
import { editArticle, getPost } from 'Api';
import { useStore } from 'hooks/useStore';
import { NewTag } from 'components/NewTag';
import { setLoading, setModal, startLoading } from 'store/slices/loadingSlice';
import { setArticle } from 'store/slices/articleSlice';
import { setError } from 'store/slices/userSlice';
import stylesAdd from 'assets/css-modules/newEdit.module.scss';
import styles from 'assets/css-modules/forms.module.scss';

const EditPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const {
    modalWindow,
    loginError,
    token,
    article = { tagList: [] },
  } = useStore();
  const [tags, setTags] = useState(getTagList(article.tagList));
  const [count, setCount] = useState(25);
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirect = () => {
    navigate('/articles');
  };

  const onSubmit = ({ title, description, text, ...tagsArray }) => {
    editArticle(token, slug, title, description, text, Object.values(tagsArray))
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
    setTags(getTagList(article.tagList));
  }, [article]);

  useEffect(() => {
    dispatch(startLoading());
    getPost(slug, token)
      .then((res) => {
        dispatch(setArticle(res.article));
      })
      .catch((err) => dispatch(setError(err.message)))
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [slug, dispatch, token]);

  const addFirstTag = () => {
    setTags(getTagList(['enter tag']));
  };

  return (
    <div className={`${styles.formContainer} ${stylesAdd.formContainer}`}>
      <form
        className={`${styles.form} ${stylesAdd.formSize}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={styles.title}>Edit article</h2>
        {modalWindow ? (
          <div className={styles.success}>successfully edited</div>
        ) : null}
        {loginError ? (
          <div className={styles.loginError}>edit failed</div>
        ) : null}

        <label>
          <div className={styles.label}>Title</div>
          <input
            className={styles.input}
            type='text'
            placeholder='Title'
            defaultValue={article.title}
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
          <div className={styles.label}>Short description</div>
          <input
            className={styles.input}
            type='text'
            placeholder='Title'
            defaultValue={article.description}
            {...register('description', {
              required: true,
              minLength: 3,
              maxLength: 80,
              pattern: /^[0-9A-Za-zА-Яа-я\s]+$/i,
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
            defaultValue={article.body}
            {...register('text', { maxLength: 5000 })}
          />
          {errors.description && (
            <span className={styles.inputError}>Please enter article text</span>
          )}
        </label>

        <div className={stylesAdd.tags}>
          <div className={styles.label}>Tags</div>
          {tags.map((elem, index) => {
            elem.last = index === tags.length - 1;
            console.log(elem);
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

export default EditPost;
