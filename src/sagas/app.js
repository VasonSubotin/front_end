import { takeEvery } from 'redux-saga/effects';
import { initStart, initGoogleApi } from '../modules/app';

const loadAuth2Library = (gapi) => new Promise((resolve, reject) => {
  gapi.load('auth2', {
    callback: () => resolve(gapi),
    onerror: () => reject(),
    timeout: 5000,
    ontimeout: () => reject(new Error('Timeout')),
  });
});

function* startupWorker() {
  // TODO: check network connectivity first
  yield console.log('✅ startupWorker');
}

function* googleApiWorker({ payload }) {
  try {
    yield loadAuth2Library(payload);
    yield payload.auth2.init({
      client_id: '71249136768-shikkvane8oavgk2028fgfvbh04o6his.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'profile email openid https://www.googleapis.com/auth/calendar',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    });
  } catch (e) {
    console.log('💔 googleApiWorker \n', e);
  }
}

export default function* applicationWatcher() {
  yield takeEvery(initStart, startupWorker);
  yield takeEvery(initGoogleApi, googleApiWorker);
}
