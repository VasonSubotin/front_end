import { takeEvery, put } from 'redux-saga/effects';
import {
  loginSubmit,
  loginFailure,
  loginSuccess,
  logoutSubmit,
  logoutSuccess,
} from '../modules/auth';

function* loginWorker({ payload: { token, profile, history } }) {
  if (token.length) {
    yield put(
      loginSuccess({
        tokenAccess: token,
        user: {
          name: profile.getName(),
          imageURL: profile.getImageUrl(),
          email: profile.getEmail(),
        },
      }),
    );
    yield history.replace('/console');
  } else {
    yield put(loginFailure('please enter valid token'));
  }
}

function* logoutWorker({ payload: { history, gapi } }) {
  try {
    const auth2 = gapi.auth2.getAuthInstance();
    yield auth2.signOut();

    yield put(logoutSuccess());
    history.replace('/login');
  } catch (e) {
    console.log('💔 logoutWorker error \n', e);
  }
}

export default function* authWatcher() {
  yield takeEvery(loginSubmit, loginWorker);
  yield takeEvery(logoutSubmit, logoutWorker);
}
