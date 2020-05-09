import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import app from './app';
import auth from './auth';
import console from './console';

export default persistCombineReducers(
  {
    key: 'primary',
    storage,
    whitelist: ['auth'],
  },
  {
    app,
    auth,
    console,
  },
);
