import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// children
import { 
	Home,
  Register,
  Admin,
  Verify,
  NotFound
} from './pages';
import Header from './components/Header';

const App = () => {

  const role = useSelector(({ auth }) => auth.role_id);
  // console.log(role);
  return (
    <Fragment>
      <Switch>
      {
        role === 1
        ?
        <Route path = '/internal' component = {Admin} />
        : 
        null
      }
        <Header/>
        <Route path = '/' component = {Home} exact />
        <Route path = '/register' component = {Register} />
        <Route path = '/verify' component = {Verify} />
        <Route path = '*' component = {NotFound} />
      </Switch>
    </Fragment>
  );
};

export default App;