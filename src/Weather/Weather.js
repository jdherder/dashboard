import React, { Component } from 'react';
import Axios from 'axios';
import Loading from '../Loading/Loading';
import './Weather.css';

class Weather extends Component {
  constructor() {
    super();

    this.state = {
      weatherData: null,
      loading: true,
      error: false,
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
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.getAll('location')[0];
    const yahooApiLink = 'https://query.yahooapis.com/v1/public/yql?q=';
    const locationText = location ? location : 'kansas city, mo';
    const query = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\'${locationText}\')&format=json`;

    Axios.get(yahooApiLink + query)
      .then(data => this.extractWeatherData(data))
      .catch(e => this.weatherFailure(e));
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
      loading: false,
      error: false,
    });
  }

  weatherFailure(e) {
    console.error(e);

    this.setState({
      weatherData: null,
      loading: false,
      error: true,
    });
  }

  buildWeatherIconClass(code) {
    return `wi wi-yahoo-${code}`;
  }

  buildForecastItem(item, i) {
    const codeClass = this.buildWeatherIconClass(item.code);
    return (
      <div key={i} className="forecast-block">
        <div className="forecast-day">{item.day}</div>
        <div className="forecast-temps">
          <span className="high">{item.high}°</span>
          <span className="slash">/</span>
          <span className="low">{item.low}°</span>
        </div>
        <div className={codeClass}></div>
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      const loadingContent = (<div className="loading-container"><Loading /></div>);
      return this.weatherContainerWithContent(loadingContent);
    }

    if (this.state.error) {
      const errorContent = (<div className="error-container"><span>Weather data could not be loaded.</span></div>);
      return this.weatherContainerWithContent(errorContent);
    }

    /* we now have data available */
    const currentCodeClass = this.buildWeatherIconClass(this.state.weatherData.condition.code);
    const forecastItems = this.state.weatherData.forecast.map((item, i) => {
      return this.buildForecastItem(item, i);
    });

    const dataContent = (
      <div>
        <div className="current">
          <div className="current-temp">
            <span className="value">{this.state.weatherData.condition.temp}°</span>
            <span className={currentCodeClass}></span>
          </div>
          <div className="info">Currently in {this.state.weatherData.location.city + ', ' + this.state.weatherData.location.region}</div>
        </div>
        <div className="forecast">
          {forecastItems}
        </div>
      </div>
    );

    return this.weatherContainerWithContent(dataContent);
  }

  weatherContainerWithContent(content) {
    return (
      <div className="Weather">
        {content}
      </div>
    );
  }
}

export default Weather;
