import React, { Component, PropTypes } from 'react'

export default class Vote extends Component {
  createMarkup(__html) {
    return {__html}
  }
  render() {
    return (
      <span class="right">
        {this.props.value}
        {this.props.likes}
        <a href="">
          <i onClick={this.props.vote(true)} ng-class="{'green-text accent-3': this.props.choice.value === true}" class="material-icons">thumb_up</i>
        </a>
        <a href="">
          <i onClick={this.props.vote(false)} ng-class="{'deep-orange-text': this.props.choice.value === false}" class="material-icons">thumb_down</i>
        </a>
        {this.props.dislikes}
      </span>
    )
  }
}
Vote.defaultProps = {
  text: ['', '', '', '']
}
Vote.propTypes = {
  //label: PropTypes.string.isRequired,
  text: PropTypes.array.isRequired
}
