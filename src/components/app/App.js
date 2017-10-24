import React, { Component } from 'react';
import logo from './Logo.png';
import './App.css';
import TorController from '../tor_controller/TorController';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="App-title"> <h1 className="App-title-text">Welcome to PraeTor</h1> </span>
        </header>
        <div>
            <TorController />
        </div>
      </div>
    );
  }
}

export default App;
