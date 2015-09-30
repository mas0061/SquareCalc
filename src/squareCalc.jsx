import React from 'react';
import SCHeader from './scHeader';
import SCMain from './scMain';

export default class SquareCalc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: '',
    };
  }

  _handleEvent(event) {
    this.setState({
      event: event
    });
  }

  render() {
    return (
      <div>
        <SCHeader handleEvent={this._handleEvent.bind(this)} />
        <SCMain squareNum={5} event={this.state.event} />
      </div>
    );
  }

}
