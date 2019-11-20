import React, { Component } from 'react';
import moment from 'moment';
import { throttle } from 'lodash';
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new moment(),
      timerId: null
    };
  }
  setTimer = () => {
    this.setState({ time: new moment() });
  };

  componentDidMount() {
    var throttled = throttle(this.setTimer, 1000);
    var timerId = setInterval(throttled, 1000);
    this.setState({ timerId });
  }
  componentWillUnmount() {
    const { timerId } = this.state;
    if (timerId) {
      clearInterval(timerId);
      this.setState({ timerId: null });
    }
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        Hello Timer!
        <p>{time.format('YYYY-MM-DD HH:mm:ss')}</p>
      </div>
    );
  }
}
export default Timer;
