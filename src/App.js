import React, { Component } from 'react';

import Question from './Components/Question';
import LoadTest from './Components/LoadTest';

import './App.css';

class App extends Component {

  constructor () {
    super();
    this.state = {
      question: null,
      loadingDone: false,
      index: 0,
      allQuestionsLength: null,
      questionType: null
    }
  }

  nextHandler = () => {
    if (this.state.index < (this.state.allQuestionsLength - 1)) {
      this.setState((prevState) => ({
        index: prevState.index + 1
      }));

      this.loadTestHandler(this.state.questionType);
    }
  }

  backHandler = () => {
    if (this.state.index !== 0) {
      this.setState((prevState) => ({
        index: prevState.index - 1
      }));

      this.loadTestHandler(this.state.questionType);
    }
  }

  loadTestHandler = (path) => {
    fetch(path)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then(resData => {
        const allQuestionsLength = resData.length;
        const index = this.state.index;
        const question = resData[index];
        this.setState({
          question: question,
          allQuestionsLength: allQuestionsLength,
          loadingDone: true
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loadingDone: true });
      })
  }

  loadTestFirstTime = (path) => {
    this.setState({ questionType: path });
    this.loadTestHandler(path);
  }

  exitHandler = () => {
    this.setState({
      question: null,
      loadingDone: false,
      index: 0,
      allQuestionsLength: null,
      questionType: null
    });
  }

  render () {
    return (
      <div>
        {(!this.state.loadingDone) && (
          <div className="loadtest_container">
            <LoadTest loadTestHandler={() => this.loadTestFirstTime('./Automatyka.json')} text="Automatyka" />
            <LoadTest loadTestHandler={() => this.loadTestFirstTime('./Elektroenergetyka.json')} text="Elektroenergetyka" />
            <LoadTest loadTestHandler={() => this.loadTestFirstTime('./Maszyny.json')} text="Maszyny" />
            <LoadTest loadTestHandler={() => this.loadTestFirstTime('./Metrologia.json')} text="Metrologia" />
            <LoadTest loadTestHandler={() => this.loadTestFirstTime('./Mikroprocesory.json')} text="Mikroprocesory" />
            <LoadTest loadTestHandler={() => this.loadTestFirstTime('./Naped.json')} text="Napęd" />
            <LoadTest loadTestHandler={() => this.loadTestFirstTime('./TWN.json')} text="TWN" />
            <LoadTest loadTestHandler={() => this.loadTestFirstTime('./Urzadzenia.json')} text="Urządzenia" />
          </div>
        )}
        {(this.state.loadingDone) && (
          <Question
            index={this.state.index}
            allQuestionsLength={this.state.allQuestionsLength}
            question={this.state.question}
            nextHandler={this.nextHandler}
            backHandler={this.backHandler}
            exitHandler={this.exitHandler}
          />
        )}
      </div>
    );
  }
}

export default App;
