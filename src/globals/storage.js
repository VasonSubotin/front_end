import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initStart } from '../modules/app';
import reducer from '../modules/index';
import saga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = createStore(
    reducer,
    undefined,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  const persistor = persistStore(store, undefined, () =>
    store.dispatch(initStart()),
  );

  sagaMiddleware.run(saga);

  return {
    persistor,
    store,
  };
};
