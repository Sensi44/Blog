import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Alert } from 'antd';

import { setModal } from 'store/slices/loadingSlice';
import { setError } from 'store/slices/userSlice';
import { useStore } from 'hooks/useStore';
import { signUp } from 'api';
import styles from 'components/SignUp/forms.module.scss';
import './SignUp.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const { modalWindow, loginError, isAuth } = useStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate('/articles');
  });

  const redirect = () => {
    navigate('/sign-in');
  };

  const onSubmit = ({ username, email, password }) => {
    signUp(username, email, password)
      .then(() => {
        dispatch(setModal(true));
        setTimeout(() => dispatch(setModal(false)), 1200);
        setTimeout(redirect, 1800);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          dispatch(setError(err.response.data.errors));
          setTimeout(() => dispatch(setError(null)), 2400);
        }
      });
  };
  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Create new account</h2>
        {modalWindow ? <Alert message='Success' type='success' /> : null}
        {loginError?.username ? (
          <Alert message='username is already taken' type='error' showIcon />
        ) : null}
        {loginError?.email ? (
          <Alert message='email is already taken' type='error' showIcon />
        ) : null}

        <label>
          Username
          <input
            className={styles.input}
            type='text'
            placeholder='Username'
            {...register('username', {
              required: true,
              minLength: 3,
              maxLength: 20,
              pattern: /^[0-9A-Za-z]+$/i,
            })}
          />
          {errors.username && (
            <span className={styles.inputError}>
              enter correct username <br />
              (Only Latin and numbers from 0 - 9)
            </span>
          )}
        </label>

        <label>
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

        <label>
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
              Your password needs to be at least 6 characters &<br />
              Only Latin and numbers from 0 - 9
            </span>
          )}
        </label>

        <label>
          Repeat Password
          <input
            className={styles.input}
            autoComplete='on'
            type='password'
            placeholder='Password'
            {...register('repeatPassword', {
              required: true,
              minLength: 6,
              maxLength: 40,
              pattern: /^[0-9A-Za-z]+$/i,
            })}
          />
          {errors.repeatPassword && (
            <span className={styles.inputError}>
              Your password needs to be at least 6 characters &<br />
              Only Latin and numbers from 0 - 9
            </span>
          )}
          <div>
            {watch('password') !== watch('repeatPassword') ? (
              <span className={styles.inputError}>Passwords do not match</span>
            ) : null}
          </div>
        </label>

        <div className={styles.line}>
          <label className='check option'>
            <input
              className='cp check__input'
              type='checkbox'
              {...register('check', {
                required: true,
              })}
            />
            <span className='check__box' />
          </label>
          <div className={styles.checkLabel}>
            I agree to the processing of my personal information
          </div>
        </div>
        {errors.check && (
          <span className={styles.inputError}>
            you must consent to the processing of personal data
          </span>
        )}

        <input type='submit' value='Create' className={styles.mainButton} />
        <div className={styles.replace}>
          <span>Already have an account?</span>
          <Link to='/sign-in' className={styles.link}>
            Sign In.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
