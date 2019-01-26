import React, { Component } from 'react';
import './Question.css';

class Question extends Component {

   constructor () {
      super();
      this.state = {
         isClicked: false,
         clickedAnswer: null
      }
   }

   isItCorrect = (evt) => {
      this.setState({ isClicked: true, clickedAnswer: evt.target })
      const correctIndex = this.props.question.correct;
      const correctAnswer = this.props.question[correctIndex];

      if (!this.state.isClicked) {
         if (evt.target.textContent === correctAnswer) {
            evt.target.classList.add('correct-answer');
         } else {
            evt.target.classList.add('incorrect-answer');
         }
      }
   }

   nextQuestion = () => {
      this.setState({ isClicked: false });

      if (this.state.isClicked) {
         this.state.clickedAnswer.classList.remove('correct-answer');
         this.state.clickedAnswer.classList.remove('incorrect-answer');
      }

      this.props.nextHandler();
   }

   backQuestion = () => {
      this.setState({ isClicked: false });

      if (this.state.isClicked) {
         this.state.clickedAnswer.classList.remove('correct-answer');
         this.state.clickedAnswer.classList.remove('incorrect-answer');
      }

      this.props.backHandler();
   }

   render () {
      return (
         <div className="question_container">
            <div className="question">{this.props.question.pytanie}</div>
            <div className="answers">
               <div onClick={this.isItCorrect} className="answer answer_1">{this.props.question.a}</div>
               <div onClick={this.isItCorrect} className="answer answer_2">{this.props.question.b}</div>
               <div onClick={this.isItCorrect} className="answer answer_3">{this.props.question.c}</div>
               <div onClick={this.isItCorrect} className="answer answer_4">{this.props.question.d}</div>
            </div>
            <div className="buttons">
               <button onClick={this.backQuestion}>BACK</button>
               <button onClick={this.nextQuestion}>NEXT</button>
               <button onClick={this.props.exitHandler}>EXIT</button>
            </div>
         </div>
      )
   }
}

export default Question;