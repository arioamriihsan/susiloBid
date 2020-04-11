import React from 'react';
import { Route } from 'react-router-dom';

import { 
	Home,
	Register
} from './pages';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header/>
      <Route path = '/' component = {Home} exact />
      <Route path = '/register' component = {Register} />
    </div>
  );
}

export default App;