import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Menu from './components/Menu/Menu';
import Snake from './components/Snake/Snake';

function App() {
  return (
    <div className="App container">
      <Router>
        <Switch>
          <Route exact path='/' component={Menu} />
          <Route path='/snake' component={Snake} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
