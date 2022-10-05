import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { editProfile } from 'Api';
import { useStore } from 'hooks/useStore';
import { setModal } from 'store/slices/loadingSlice';
import styles from 'assets/css-modules/forms.module.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const { modalWindow, token, username, email, image } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ user, mail, password, URL }) => {
    editProfile(token, user, mail, password, URL)
      .then(() => {
        dispatch(setModal(true));
        setTimeout(() => dispatch(setModal(false)), 2700);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          alert('Error changing user data');
        }
      });
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Edit Profile</h2>
        {modalWindow ? (
          <div className={styles.success}>changes applied successfully</div>
        ) : null}
        <label>
          <div className={styles.label}>Username</div>
          <input
            className={styles.input}
            type='text'
            placeholder='Username'
            defaultValue={username}
            {...register('username', {
              required: true,
              minLength: 3,
              maxLength: 20,
              pattern: /^[0-9A-Za-z]+$/i,
            })}
          />
          {errors.username && (
            <span className={styles.inputError}>
              enter username, max length 20 characters
            </span>
          )}
        </label>

        <label>
          <div className={styles.label}>Email address</div>
          <input
            className={styles.input}
            type='email'
            placeholder='Email address'
            defaultValue={email}
            {...register('email', {
              required: true,
              maxLength: 80,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && (
            <span className={styles.inputError}>
              Please enter a valid email address
            </span>
          )}
        </label>

        <label>
          <div className={styles.label}>New password</div>
          <input
            className={styles.input}
            autoComplete='on'
            type='password'
            placeholder='New password'
            defaultValue={''}
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 40,
              pattern: /^[0-9A-Za-z]+$/i,
            })}
          />
          {errors.password && (
            <span className={styles.inputError}>
              Your password needs to be at least 6 characters.
            </span>
          )}
        </label>

        <label>
          <div className={styles.label}>Avatar image (url)</div>
          <input
            className={styles.input}
            autoComplete='on'
            type='url'
            placeholder='Avatar image'
            defaultValue={image}
            {...register('URL', {})}
          />
          {errors.URL && <span className={styles.inputError}>Bad picture</span>}
        </label>

        <input type='submit' value='Save' className={styles.mainButton2} />
      </form>
    </div>
  );
};

export default Profile;
