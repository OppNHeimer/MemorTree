import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Tree from './components/Tree/Tree.js'

class App extends Component {
  render() {
    return (
        <div className="App">
          <Tree/>
        </div>
  
    )
  }
}

export default App;
