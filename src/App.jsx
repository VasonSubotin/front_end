import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import StoreConfig from './globals/storage';
import { initGoogleApi } from './modules/app';

import FullScreenLoader from './containers/FullScreenLoader';
import Header from './containers/Header';
import Home from './containers/RouteHome';
import Console from './containers/RouteConsole';
import Login from './containers/RouteLogin';
import RoutePrivacyPolicy from './routes/PrivacyPolicy';

import './App.css';

const { store, persistor } = StoreConfig();

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      store.dispatch(initGoogleApi(window.gapi));
    }, 100);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Header />
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/console" component={Console} exact />
            <Route path="/privacyPolicy" component={RoutePrivacyPolicy} exact />
          </Router>
          <FullScreenLoader />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
