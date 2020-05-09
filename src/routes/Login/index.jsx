import React from 'react';
import propTypes from 'prop-types';

import s from './styles.module.scss';

export default class RouteLogin extends React.Component {
  static propTypes = {
    errorMessage: propTypes.string.isRequired,
    tokenAccess: propTypes.string.isRequired,
    // handleGoogleLogin: propTypes.func.isRequired,
    loginSubmit: propTypes.func.isRequired,
    history: propTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const { history, tokenAccess } = props;
    if (tokenAccess.length !== 0) {
      history.replace('/');
    }

    this.handlePressLogin = this.handlePressLogin.bind(this);
  }

  handlePressLogin() {
    const that = this;
    const auth2 = window.gapi.auth2.getAuthInstance();

    auth2.signIn().then(googleUser => {
      // console.log('googleUser', googleUser);
      that.props.loginSubmit({
        token: googleUser.getAuthResponse().id_token,
        history: that.props.history,
        profile: googleUser.getBasicProfile(),
      });
    });
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <div className={s.container}>
        <b>Any login notes</b>
        <a className={s.button} onClick={this.handlePressLogin}>
          Login with google
        </a>
        {errorMessage.length ? <p>{errorMessage}</p> : null}
      </div>
    );
  }
}
