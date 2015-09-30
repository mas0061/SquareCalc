import React from 'react';
import SCSquare from './scSquare';

export default class SCMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: [],
      colArray: [],
      rowArray: []
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
      case 'answerButton':
        this.setDisplayAnswer();
        break;
    }
  }

  refreshCalc() {
    this.setSquare();
  }

  setDisplayAnswer() {
  }

  setSquare() {
    let array = this.shuffle([1, 2, 3, 4, 5]);
    let array2 = this.shuffle([1, 2, 3, 4, 5]);
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
    var m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  render() {
    var firstColumn = [];
    var rows = [];
    var num = this.props.squareNum;

    for (let i = 0; i < num; i++) {
      firstColumn.push(<div className="mdl-cell mdl-cell--2-col">{this.state.colArray[i]}</div>);
    }

    rows.push(
      <div className="mdl-grid square-horizontal">
        <div className="mdl-cell mdl-cell--2-col square-cross">+</div>
        {firstColumn}
      </div>
    );

    var answerCnt = 0;

    for (let i = 0; i < num; i++) {
      var column = [];

      for (let j = 0; j < num; j++) {
        column.push(
          <SCSquare answer={this.state.answer[answerCnt]} />
        );
        answerCnt++;
      }

      rows.push(
        <div className="mdl-grid">
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
