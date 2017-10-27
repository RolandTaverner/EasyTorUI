import React, { Component } from "react";
import logo from "./Logo.png";
import "./App.css";
import TorController from "../tor_controller/TorController";

class App extends Component {
  render() {
    return (
      <div className="Wrapper">
        <div className="App">
          <header className="App-header">
            <a href="https://praetor.space"><img src={logo} className="App-logo" alt="logo" /></a>
            <span className="App-title"> <h1 className="App-title-text">Control panel</h1> </span>
          </header>
          <div>
            <TorController />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
