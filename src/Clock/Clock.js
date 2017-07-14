import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {
  constructor() {
    super();

    this.state = {
      time: {
        hr: 0,
        min: 0,
        amPm: '',
      },
    };
  }

  componentDidMount() {
    this.setTimeVars();

    // continuously update time vars
    this.interval = setInterval(() => {
      this.setTimeVars()
    }, 30000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  setTimeVars() {
    this.setState({
      time: this.getTimeObj(),
    });
  }

  getTimeObj() {
    const d = new Date();
    let hr = d.getHours();
    let min = d.getMinutes();
    let amPm = 'am';

    /* set pm at noon and after */
    if (hr >= 12) { amPm = 'pm'; }

    /* convert 24 hour time */
    if (hr > 12)  { hr -= 12; }

    /* convert midnight hour (0) to 12 */
    if (hr === 0) { hr = 12; }

    /* pad single digit minutes with leading 0 */
    if (min < 10) { min = '0' + min; }

    return {
      hr: hr,
      min: min,
      amPm: amPm
    };
  }

  render() {
    return (
      <div className="Clock">
        <div className="hour">{this.state.time.hr}</div>
        <div className="colon">:</div>
        <div className="minute">{this.state.time.min}</div>
        <div className="amPm">{this.state.time.amPm}</div>
      </div>
    );
  }
}

export default Clock;
