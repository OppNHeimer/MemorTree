import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   Switch
// } from "react-router-dom"

import Tree from './components/Tree/Tree.js'

class App extends Component {
  render() {
    return (
      // <Router>
        <div className="App">
          {/* <Link to="/memorTree"> */}
            <Tree/>
          {/* </Link> */}
        </div>
      {/* </Router> */}
  
    )
  }
}

export default App;
