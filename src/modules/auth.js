import { createAction, handleActions } from 'redux-actions';
import propTypes from 'prop-types';

export const loginSubmit = createAction('👇 login submit');
export const loginSuccess = createAction('login success');
export const loginFailure = createAction('login failure');
export const logoutSubmit = createAction('👇 logout submit');
export const logoutSuccess = createAction('logout success');
export const logoutFailure = createAction('logout failure');

const defaultState = {
  isLoggedIn: false,
  errorMessage: '',
  tokenAccess: '',
  user: {},
};

export const ptUser = propTypes.shape({
  name: propTypes.string,
  imageURL: propTypes.string,
  email: propTypes.string,
});

export default handleActions(
  {
    [loginSubmit]: state => ({
      ...state,
      errorMessage: '',
    }),
    [loginSuccess]: (state, { payload: { tokenAccess, user } }) => ({
      ...state,
      isLoggedIn: true,
      tokenAccess,
      user,
    }),
    [loginFailure]: (state, { payload }) => ({
      ...state,
      errorMessage: payload,
    }),
    [logoutSuccess]: () => ({
      ...defaultState,
    }),
  },
  defaultState,
);
