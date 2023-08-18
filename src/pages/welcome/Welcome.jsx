import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import welcomeImage from '../../images/welcome.png';
import Icon from '../../components/icon/Icon';
import css from './welcome.module.scss';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { getCurrentUser, setToken } from 'redux/auth/auth-operation';

const Welcome = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const sessionId = searchParams.get('sessionId');

  useEffect(() => {
    if (
      !accessToken ||
      accessToken === '' ||
      !refreshToken ||
      refreshToken === '' ||
      !sessionId ||
      sessionId === ''
    ) {
      return;
    }
    setToken(accessToken);
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    localStorage.setItem('sessionId', JSON.stringify(sessionId));

    dispatch(getCurrentUser());
  }, [accessToken, dispatch, refreshToken, searchParams, sessionId]);

  return (
    <div className={css.welcomeBackground}>
      <div className={css.welcomeContent}>
        <img className={css.welcomeImage} src={welcomeImage} alt="boy" />
        <div className={css.welcomeLogoContainer}>
          <span className={css.logoIconContainer}>
            <span className={css.logoIcon}>
              <Icon className={css.a} id="logo" width="18" height="24"></Icon>
            </span>
          </span>
          <h1 className={css.logoTitle}>Task Pro</h1>
        </div>
        <p className={css.welcomeDescription}>
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don't wait, start achieving your goals now!
        </p>
        <NavLink className={css.buttonLink} to="/auth/register">
          Registration
        </NavLink>
        <NavLink className={css.buttonLink} to="/auth/login">
          Log In
        </NavLink>
        <p className={css.choiceLine}>or</p>
        <button
          className={css.googleButton}
          onClick={() =>
            (window.location.href =
              'https://goit-final-project.onrender.com/api/users/google')
          }
        >
          <span className={css.logoGoogleBox}>
            <Icon id="logo-google" width="24" height="24"></Icon>
          </span>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Welcome;
