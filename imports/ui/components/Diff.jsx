import React, { Component, PropTypes } from 'react'
const JsDiff = require('diff');

export default class Diff extends Component {

  render() {
    const createMarkup = () => {
      const __html = JsDiff
        .diffChars(this.props.first, this.props.second)
        .map(function(part, index){
              let color
              if (part.added) color = 'green'
              else if (part.removed) color = 'red'
              return `<span key=${index} style="background-color: ${color};">${part.value}</span>`
        })
        .join('')
      return {__html}
    }
    return (
      <div className="row card-panel">
        <div dangerouslySetInnerHTML={createMarkup()} className="col s12"></div>
      </div>
    )
  }
}
Diff.propTypes = {
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired
}
Diff.defaultProps = {
  first: '',
  second: ''
}
