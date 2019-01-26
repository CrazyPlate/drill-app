import React, { Component } from 'react';

class LoadTest extends Component {
   render () {
      return (
         <button onClick={this.props.loadTestHandler}>{this.props.text}</button>
      )
   }
}

export default LoadTest;