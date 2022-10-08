import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Alert } from 'antd';

import { useStore } from 'hooks/useStore';
import { signIn } from 'api';
import { setUser, setError } from 'store/slices/userSlice';
import { setModal } from 'store/slices/loadingSlice';
import styles from 'components/SignUp/forms.module.scss';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modalWindow, loginError, username } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirect = () => {
    navigate('/articles');
  };

  const onSubmit = ({ email, password }) => {
    signIn(email, password)
      .then((res) => {
        localStorage.setItem('user_token', res.user.token);
        dispatch(setUser(res.user));
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
    if (username) navigate('/articles');
  });

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Sign In</h2>
        {modalWindow ? (
          <Alert message='Login Successful' type='success' />
        ) : null}
        {loginError ? (
          <Alert message='Incorrect login or password' type='error' showIcon />
        ) : null}

        <label className={styles.label}>
          Email address
          <input
            className={styles.input}
            type='email'
            placeholder='Email address'
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

        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            autoComplete='on'
            type='password'
            placeholder='Password'
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

        <input type='submit' value='Login' className={styles.mainButton} />
        <div className={styles.replace}>
          <span>Don’t have an account?</span>
          <Link to='/sign-up' className={styles.link}>
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
