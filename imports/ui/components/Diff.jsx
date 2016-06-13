import React, { Component, PropTypes } from 'react'
const JsDiff = require('diff');

export default class Diff extends Component {

  render() {
    const createMarkup = () => {
      const __html = JsDiff
        .diffTrimmedLines(this.props.first, this.props.second)
        .map(function(part, index){
              // added = 'green', removed = 'red', else = ''
              const color = part.added ? 'green' : part.removed ? 'red' : ''
              if (!color) return null // do not return untouched bits
              return `<div key=${index} style="background-color: ${color};">${part.value}</div>`
        })
        .join('')
      return {__html}
    }
    return (
      <div className="row card-panel white-text">
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
