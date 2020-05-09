import React from 'react';
import PropTypes from 'prop-types';

import s from './styles.module.scss';

const FullScreenLoader = ({ loading }) => {
  if (loading) {
    return (
      <div className={s.container}>
        <div className={s.spinner}>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
  return null;
};

FullScreenLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default FullScreenLoader;
