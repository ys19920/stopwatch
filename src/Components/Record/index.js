import React, { Component } from 'react';
import { throttle } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { recordRequest, clearRequest } from '../../redux/records/actions';

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minSeconds: 0,
      stop: false
    };
  }
  setTimer = () => {
    this.setState(prevstate => ({
      minSeconds: prevstate.minSeconds + 1
    }));
  };

  componentDidMount() {
    var throttled = throttle(this.setTimer, 10);
    var timerId = setInterval(throttled, 10);
    this.setState({ timerId });
  }
  componentWillUnmount() {
    const { timerId } = this.state;
    if (timerId) {
      clearInterval(timerId);
      this.setState({ timerId: null });
    }
  }
  clear = () => {
    const { timerId } = this.state;
    clearInterval(timerId);
    this.setState({ timerId: null, minSeconds: 0, stop: true });
  };
  Stop = () => {
    const { timerId, stop } = this.state;
    if (stop === false) {
      if (timerId) {
        clearInterval(timerId);
        this.setState({ timerId: null, stop: true });
      }
    } else {
      console.log('hello');
      var throttled = throttle(this.setTimer, 10);
      var id = setInterval(throttled, 10);
      this.setState({ stop: false, timerId: id });
    }
  };
  record = () => {
    const { minSeconds } = this.state;
    this.props.recordRequest(minSeconds);
  };
  formatNumber = number => {
    return number >= 10 ? number : '0' + number;
  };
  renderTime = minSeconds => {
    var minsec = minSeconds % 100;
    var second = ((minSeconds - minsec) % 6000) / 100;
    var minute = parseInt(minSeconds / 6000);
    return (
      <>
        {this.formatNumber(minute)}:{this.formatNumber(second)}:{this.formatNumber(minsec)}
      </>
    );
  };
  clearRecords = () => {
    this.props.clearRequest();
  };
  render() {
    const { records } = this.props;
    const { minSeconds } = this.state;
    return (
      <div>
        <div style={{ border: '1px solid #3cde96' }}>
          {this.renderTime(minSeconds)}
          <div>
            <button onClick={this.record}>Record</button>
            <button onClick={this.clear}>Reset</button>
            <button onClick={this.Stop}>{this.state.stop === true ? 'Continue' : 'Pause'} </button>
          </div>
        </div>
        <div style={{ border: '1px solid black', padding: '10px' }}>
          {records &&
            records.map((item, index) => (
              <div key={index}>
                {index + 1}:{this.renderTime(item)}
              </div>
            ))}
          <button onClick={this.clearRecords}>Clear All</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  records: state.records.records
});
const mapDispatchToProps = {
  recordRequest,
  clearRequest
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Record);
