import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Revisions } from '../../api/revisions.js'
import Diff from '../components/Diff'

class RevisionPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    //console.log(nextProps)
    // if nextProps == defaultProps, do not let component to update
    try {
      return (nextProps.revision.text == ['', '', '', ''] && nextProps.previous.text == ['', '', '', ''])
    } catch (variable) {
      console.log('returning false on component update!')
      return false
    }
  }
  render() {
    return (
        <div>
          <div className="row">
              <div className="col s12 card light-blue base">
                <div className="card-content">{/* <vote parent={this.props.revision._id}></vote> */}
                  <p className="card-title white-text">{this.props.revision.name}</p>
                  <p className="white-text">{this.props.revision.description}</p>
                </div>
            </div>
          </div>
          <Diff
            first={this.props.previous.text.join('\n')}
            second={this.props.revision.text.join('\n')} />
        </div>
    )
  }
}

RevisionPage.propTypes = {
 revision: PropTypes.object.isRequired,
 previous: PropTypes.object.isRequired
}
/*RevisionPage.defaultProps = {
  revision: {text: ['', '', '', ''], name: '', desription: ''},
  previous: {text: ['', '', '', '']}
}*/
export default createContainer(() => {
  const revisionId = FlowRouter.getParam('revisionId')

  Meteor.subscribe('revisions')

  const revision = Revisions.findOne({_id: revisionId})
  let previous
  try {
    previous = Revisions.findOne({ _id: revision.previous })
  } catch (e) {}
  return {
    revision: revision ? revision : {text: ['', '', '', ''], name: '', desription: ''},
    previous: previous ? previous :  {text: ['', '', '', '']}
  }

}, RevisionPage)
