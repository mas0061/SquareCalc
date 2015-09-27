import React from 'react';
import SCHeader from './scHeader';
import SCMain from './scMain';

export default class SquareCalc extends React.Component {
  _handleEvent(event) {
    console.log(event);

    switch (event) {
      case 'newCalcButton':
        console.log('click new question');
        break;
      case 'answerButton':
        console.log('click answer');
        break;
    }
  }

        // <SCHeader handleEvent={this._handleEvent.bind(this)} />
  render() {
    return (
      <div>
        <SCMain squareNum={5} />
      </div>
    );
  }

}
