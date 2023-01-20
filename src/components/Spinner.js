import React, { Component } from 'react'
import loading from './giphy.gif'
export class Spinner extends Component {
  render() {
    return (
      <div>
        <img src={loading} alt="loading" style={{height:'8rem',width:'8rem'}}/>
      </div>
    )
  }
}

export default Spinner
