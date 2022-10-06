import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { setModal } from 'store/slices/loadingSlice';
import { setError } from 'store/slices/userSlice';
import { useStore } from 'hooks/useStore';
import { signUp } from 'Api';
import styles from 'assets/css-modules/forms.module.scss';
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
        setTimeout(() => dispatch(setModal(false)), 1300);
        setTimeout(redirect, 1500);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          dispatch(setError(err.response.data.errors));
          setTimeout(() => dispatch(setError(null)), 2000);
        }
      });
  };
  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Create new account</h2>
        {modalWindow ? <div className={styles.success}>Success</div> : null}
        {loginError?.username ? (
          <div className={styles.loginError}>username is already taken</div>
        ) : null}
        {loginError?.email ? (
          <div className={styles.loginError}>email is already taken</div>
        ) : null}

        <label>
          <div className={styles.label}>Username</div>
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
              {console.log(errors.username)}
              enter correct username <br />
              (Only Latin and numbers from 0 - 9)
            </span>
          )}
        </label>

        <label>
          <div className={styles.label}>Email address</div>
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
          <div className={styles.label}>Password</div>
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
          <div className={styles.label}>Repeat Password</div>
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
