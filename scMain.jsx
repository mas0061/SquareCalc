import React from 'react';

export default class SCMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: [],
      displayAnswer: [],
      colArray: [],
      rowArray: []
    };
  }

  componentWillMount() {
    this.setSquare();
  }

  refreshCalc() {
    this.setSquare();
  }

  setDisplayAnswer() {
    this.setState({
      displayAnswer: this.state.answer
    });
  }

  setSquare() {
    let array = this.shuffle([1, 2, 3, 4, 5]);
    let array2 = this.shuffle([1, 2, 3, 4, 5]);
    let answer = [];

    array2.forEach(function(e1, i1) {
      array.forEach(function(e2, i2) {
        answer.push(e1 + e2);
      });
    });

    this.setState({
      colArray: array,
      rowArray: array2,
      answer: answer,
      displayAnswer: []
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

  handleNewCalcClciked() {
    this.setSquare();
  }

  handleAnswerClciked() {
    this.setDisplayAnswer();
  }

  render() {
    var firstColumn = [];
    var rows = [];
    var num = this.props.squareNum;

    for (let i = 0; i < num; i++) {
      firstColumn.push(<div className="mdl-cell mdl-cell--2-col" id={"sq-h-" + (i + 1)}>{this.state.colArray[i]}</div>);
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
          <div className="mdl-cell mdl-cell--2-col">
            <input type="number" className="square-input" maxLength="2" value={this.state.displayAnswer[answerCnt]} />
          </div>
        );
        answerCnt++;
      }

      rows.push(
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--2-col square-vertical" id={'sq-v-' + (i + 1)}>{this.state.rowArray[i]}</div>
          {column}
        </div>
      );
    }

    return (
      <div>
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">25マスけいさん</span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">
            <div className="mdl-navigation__link">
              <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" id="new-calc-button" onClick={this.handleNewCalcClciked.bind(this)}>あたらしいけいさん</button>
            </div>
            <div className="mdl-navigation__link">
              <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" id="answer-button" onClick={this.handleAnswerClciked.bind(this)}>こたえ</button>
            </div>
          </nav>
        </div>
      </header>

      <main className="mdl-layout__content">
        <div className="page-content">
        {rows}
        </div>
      </main>
      </div>
    );
  }
}
