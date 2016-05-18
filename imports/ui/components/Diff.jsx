import React, { Component, PropTypes } from 'react'
const JsDiff = require('diff');

export default class Diff extends Component {

  render() {
    const createMarkup = () => {
      const diff = JsDiff.diffChars(this.props.first, this.props.second)
      const __html = diff.map(function(part, index){
            // bg color green, red or grey
            const color = part.added ? 'green' :
              part.removed ? 'red' : 'grey'
            return `<span key=${index} style="color: ${color}">${part.value}</span>`
      })
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
