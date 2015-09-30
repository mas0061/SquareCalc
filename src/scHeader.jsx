import React from 'react';

export default class SCHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNewCalcClciked() {
    this.props.handleEvent('newCalcButton');
  }

  handleAnswerClciked() {
    this.props.handleEvent('answerButton');
  }

  render() {
    return (
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
    );
  }
}
