import React, { Component, PropTypes } from 'react'
const JsDiff = require('diff');

export default class Diff extends Component {

	createMarkup = () => {
		const 	{first, second} = this.props,
				__html = JsDiff
						.diffTrimmedLines(first, second)
						.map(function(part, index) {
							  // added == 'green', removed == 'red', else == ''
							  const color = part.added ? 'green' : part.removed ? 'red' : ''
							  // do not return untouched bits
							  if (!color) return null
							  return 	`<div key=${index} style="background-color: ${color};">
											${part.value}
										</div>`
						})
						.join('')
		return 	{__html}
	}

  render() {
    return 	<div className="row card-panel white-text">
		        <div dangerouslySetInnerHTML={this.createMarkup()} className="col s12"></div>
		    </div>
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
