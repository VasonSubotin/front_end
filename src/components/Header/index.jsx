import React from 'react';

import { Link } from 'react-router-dom';

import s from './styles.module.scss';

export default function Header({ isLoggedIn }) {
  return (
    <div className={s.container}>
      <img
        src={require('../../assets/img/logo_512x512.png')}
        className={s.image}
        alt="Logo"
      />
      <b className={s.title}>Chargeevnow </b>
      <Link className={s.link} to="/">
        Home page
      </Link>
      <Link className={s.link} to="/privacyPolicy">
        Privacy policy
      </Link>
      {isLoggedIn ? null : (
        <Link className={s.link} to="/login">
          Login
        </Link>
      )}
    </div>
  );
}
