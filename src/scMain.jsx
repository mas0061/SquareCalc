import React from 'react';
import SCSquare from './scSquare';

export default class SCMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: [],
      colArray: [],
      rowArray: [],
    };
  }

  componentWillMount() {
    this.setSquare();
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.event) {
      case 'newCalcButton':
        this.refreshCalc();
        break;
    }
  }

  refreshCalc() {
    this.setSquare();
  }

  setSquare() {
    var times = function(i) {
      var l = [];
      for (var index = 0; index < i; index++) {
        l.push(index + 1);
      }
      return l;
    };

    const array = this.shuffle(times(this.props.squareNum));
    const array2 = this.shuffle(times(this.props.squareNum));
    let answer = [];

    array2.forEach(function(e1) {
      array.forEach(function(e2) {
        answer.push(e1 + e2);
      });
    });

    this.setState({
      colArray: array,
      rowArray: array2,
      answer: answer,
    });
  }

  shuffle(array) {
    let m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  _isWrong() {
    console.log('isWrong is called.');
  }

  render() {
    var firstColumn = [];
    var rows = [];
    var num = this.props.squareNum;

    for (let i = 0; i < num; i++) {
      firstColumn.push(<div className="mdl-cell mdl-cell--2-col" key={'fc_' + i}>{this.state.colArray[i]}</div>);
    }

    rows.push(
      <div className="mdl-grid square-horizontal" key='hor'>
        <div className="mdl-cell mdl-cell--2-col square-cross">+</div>
        {firstColumn}
      </div>
    );

    var answerCnt = 0;

    for (let i = 0; i < num; i++) {
      var column = [];

      for (let j = 0; j < num; j++) {
        column.push(
          <SCSquare
            answer={this.state.answer[answerCnt]}
            event={this.props.event}
            key={this.state.answer[answerCnt]}
            isWrong={this._isWrong.bind(this)} />
        );
        answerCnt++;
      }

      rows.push(
        <div className="mdl-grid" key={'grid_' + i}>
          <div className="mdl-cell mdl-cell--2-col square-vertical">{this.state.rowArray[i]}</div>
          {column}
        </div>
      );
    }

    return (
      <main className="mdl-layout__content">
        <div className="page-content">
          {rows}
        </div>
      </main>
    );
  }
}
