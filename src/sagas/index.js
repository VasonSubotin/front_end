import { all } from 'redux-saga/effects';

import app from './app';
import auth from './auth';
import consoleSaga from './console';

export default function* rootSaga() {
  yield all([app(), auth(), consoleSaga()]);
}
