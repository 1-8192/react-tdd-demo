import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';
import TotalGuesses from './TotalGuesses';
import NewWordButton from './NewWordButton';

import { getSecretWord } from './actions';

export class UnconnectedApp extends Component  {

  componentDidMount() {
    this.props.getSecretWord();
  };

  render() {
  return (
    <div className="container">
      <h1>Jotto</h1>
     <NewWordButton display={false}/>
     <Congrats success={this.props.success} />
     <Input />
     <GuessedWords guessedWords={this.props.guessedWords} />
     <TotalGuesses guessCount = {this.props.guessedWords.length}/>
    </div>
  );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord };
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
