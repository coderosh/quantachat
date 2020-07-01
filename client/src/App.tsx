import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import { AuthContext } from './contexts/AuthContext';
import ProfilePage from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.login();
  }, []);

  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data === 'SESSION_EXISTS') {
      window.location.reload();
    }
  });

  return (
    <React.Fragment>
      <ToastContainer />
      <Router>
        <Switch>
          <Route path="/" exact={true} component={HomePage} />
          <PublicRoute path="/login" component={LoginPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
