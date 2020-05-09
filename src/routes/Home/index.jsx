import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ptUser } from '../../modules/auth';

import s from './styles.module.scss';

export default class RouteHome extends React.Component {
  static propTypes = {
    history: propTypes.object.isRequired,
    isLoggedIn: propTypes.bool.isRequired,
    user: ptUser,
  };

  constructor(props) {
    super(props);

    this.renderGreeting = this.renderGreeting.bind(this);
    this.renderLoginButton = this.renderLoginButton.bind(this);
    this.handleLoginPress = this.handleLoginPress.bind(this);
  }

  handleLoginPress() {
    this.props.history.replace('/login');
  }

  renderGreeting() {
    const userName = Object.keys(this.props.user).includes('name')
      ? this.props.user.name
      : '';

    return (
      <>
        <span>You logged in as {userName}</span>
        <Link className={s.button} to="/console">
          Go to console
        </Link>
      </>
    );
  }

  renderLoginButton() {
    return (
      <a className={s.button} onClick={this.handleLoginPress}>
        Go to login page
      </a>
    );
  }

  render() {
    return (
      <div className={s.container}>
        <p className={s.title}>
          Project in development that allows{' '}
          <span className={s.titleHighlight}>your electrical device</span> build
          optimal path between charging points
        </p>
        {this.props.isLoggedIn
          ? this.renderGreeting()
          : this.renderLoginButton()}
      </div>
    );
  }
}
