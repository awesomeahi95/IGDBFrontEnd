import React, { Component } from 'react';
import './App.css';
import GetGames from './GetGames.js';
import GetRatings from './GetRatings.js'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div className="App">
      <h1> IGDB </h1>
      <RouterCode/>
        <br/>
      </div>
    );
  }
}

export default App;

function RouterCode() {
  return (
  <Router>
      <div>
          <hr />
          <Route exact path= "/" component={GetGames} />
          <Route path= "/getAllRatings" component={GetRatings}/>
      </div>
  </Router>
);
}