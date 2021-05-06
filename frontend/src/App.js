import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LOGOUT } from './utils/constant';

import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actinos/auth';

import Routes from './components/routing/Routes';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

function App() {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
