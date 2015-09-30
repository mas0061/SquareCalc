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

  _changeValue(event) {
    var strAnswer = this.props.answer.toString();

    if (strAnswer === event.target.value) {
      this.setState({ inputText: event.target.value, style: this.styleBlack });
    } else {
      this.setState({ inputText: event.target.value, style: this.styleRed });
    }
  }

  render() {
    return (
      <div className="mdl-cell mdl-cell--2-col">
        <input type="number" className="square-input" maxLength="2"
          style={this.state.style}
          value={this.state.inputText}
          onChange={this._changeValue.bind(this)} />
      </div>
    );
  }
}
