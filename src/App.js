import React, { Component } from 'react';
import Clock from './Clock/Clock';
import Weather from './Weather/Weather';
import Backgrounds from './backgrounds.module';
import './App.css';

class App extends Component {
  render() {
    const rand = Math.floor(Math.random() * Backgrounds.length );
    const bg = Backgrounds[rand];

    return (
      <div className="App" style={{backgroundImage: `url('${bg}')`}}>
        <Clock />
        <Weather />
      </div>
    );
  }
}

export default App;
