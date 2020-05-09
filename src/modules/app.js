import { createAction, handleActions } from 'redux-actions';

// global loader handling + modals handling
import {
  loginSubmit,
  loginSuccess,
  logoutSubmit,
  logoutSuccess,
  loginFailure,
} from './auth';

export const initStart = createAction('INIT_START');
export const initGoogleApi = createAction('INIT_GAPI');

const defaultState = {
  initialized: false,
  loading: false,
};

export default handleActions(
  {
    [initStart]: state => ({
      ...state,
      initialized: true,
    }),
    [loginSubmit]: state => ({
      ...state,
      loading: true,
    }),
    [loginSuccess]: state => ({
      ...state,
      loading: false,
    }),
    [loginFailure]: state => ({
      ...state,
      loading: false,
    }),
    [logoutSubmit]: state => ({
      ...state,
      loading: true,
    }),
    [logoutSuccess]: state => ({
      ...state,
      loading: false,
    }),
  },
  defaultState,
);
