import React, { Component } from 'react';
import Axios from 'axios';
import Loading from '../Loading/Loading';
import './Weather.css';

class Weather extends Component {
  constructor() {
    super();

    this.state = {
      weatherData: null,
    };
  }

  componentDidMount() {
    this.getWeatherData();

    // continuously update weather data
    this.interval = setInterval(() => {
      this.getWeatherData()
    }, 60000 * 10);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  getWeatherData() {
    const yahooApiLink = 'https://query.yahooapis.com/v1/public/yql?q=';
    const query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\'kansas city, mo\')&format=json';

    Axios.get(yahooApiLink + query)
      .then(data => this.extractWeatherData(data));
  }

  extractWeatherData(res) {
    const results = res.data.query.results.channel;
    const weatherData = {
      condition: results.item.condition,
      forecast: results.item.forecast,
      astronomy: results.astronomy,
      location: results.location
    };

    this.setState({
      weatherData: weatherData,
    });
  }

  buildWeatherIconCode(code) {
    return `wi wi-yahoo-${code}`;
  }

  render() {
    // data not ready, render with loader
    if (!this.state.weatherData) {
      return (
        <div className="Weather">
          <div className="loading-container"><Loading /></div>
        </div>
      );
    }

    let opacity = 1;
    const currentCodeClass = this.buildWeatherIconCode(this.state.weatherData.condition.code);
    const forcastItems = this.state.weatherData.forecast.map((item, i) => {
      const codeClass = this.buildWeatherIconCode(item.code);
      opacity -= 0.085;

      return (
        <div key={i} className="forecast-block" style={{opacity: opacity}}>
          <div className="forecast-day">{item.day}</div>
          <div className="forecast-temps">
            <span className="high">{item.high}°</span>
            <span className="slash">/</span>
            <span className="low">{item.low}°</span>
          </div>
          <div className={codeClass}></div>
        </div>
      );
    });

    return (
      <div className="Weather">
        <div className="current">
          <div className="current-temp">
            <span className="value">{this.state.weatherData.condition.temp}°</span>
            <span className={currentCodeClass}></span>
          </div>
          <div className="info">Currently in {this.state.weatherData.location.city + ', ' + this.state.weatherData.location.region}</div>
        </div>
        <div className="forecast">
          {forcastItems}
        </div>
      </div>
    );
  }
}

export default Weather;
