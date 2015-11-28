import React from 'react';

export default class SCSquare extends React.Component {
  constructor(props) {
    super(props);

    this.styleRed = { color: 'red' };
    this.styleBlack = { color: 'black' };

    this.state = {
      inputText: '',
      style: this.styleBlack
    };
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.event) {
      case 'newCalcButton':
          this.setState({ inputText: '', style: this.styleBlack });
        break;
      case 'answerButton':
        if (this.state.inputText === '') {
          this.setState({ inputText: this.props.answer, style: this.styleRed });
        } else {
          this.setState({ style: this._judgeStyle(this.state.inputText, nextProps.answer) });
        }
        break;
    }
  }

  _changeValue(event) {
    // var style = this._judgeStyle(event.target.value, this.props.answer);
    // this.setState({ inputText: event.target.value, style: style });
    this.setState({ inputText: event.target.value, style: this.styleBlack });
  }

  _judgeStyle(input, answer) {
    return (answer.toString() === input ? this.styleBlack : this.styleRed);
  }

  render() {
    return (
      <div className="mdl-cell mdl-cell--2-col">
        <input type="number" className="square-input" min ={0} max={99}
          style={this.state.style}
          value={this.state.inputText}
          onChange={this._changeValue.bind(this)} />
      </div>
    );
  }
}
