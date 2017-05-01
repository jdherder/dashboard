import React, { Component } from 'react';
import Clock from './Clock/Clock';
import Weather from './Weather/Weather';
import './App.css';

class App extends Component {
  render() {

    // TODO: Eventually, make backgrounds in general user configurable
    const rand = Math.floor(Math.random() * 14) + 1;

    return (
      <div className="App" style={{backgroundImage: `url('/assets/${rand}.jpg')`}}>
        <Clock />
        <Weather />
      </div>
    );
  }
}

export default App;
