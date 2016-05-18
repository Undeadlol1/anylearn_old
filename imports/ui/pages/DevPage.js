import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Revisions } from '../../api/revisions.js'
import { Threads } from '../../api/threads.js'
import ThreadsInsert from '../components/ThreadsInsert'
import Form from '../components/Form'
import List from '../components/List'


class DevPage extends Component {
  render() {
    return (
      <div>
        {/*<Form preset="threads.insert" type="dev" />*/}
        <ThreadsInsert parent={this.props.parent} type="dev" />
        <div className="row">
          <div className="col m12">
            <a href={`/manifest/${this.props.parent}`}>Манифест</a>
          </div>
        </div>
        <div className="row">
          <List name="Обсуждения" items={this.props.threads} type="dev" href="thread" className="col s12 m6" />
          <List name="История" items={this.props.revisions} href="revision" className="col s12 m6" />
        </div>
      </div>
    )
  }
}

DevPage.propTypes = {
 parent: PropTypes.string.isRequired,
 revisions: PropTypes.array.isRequired,
 threads: PropTypes.array.isRequired
}

export default createContainer(() => {
  const parent = FlowRouter.getParam('skillId')
  Meteor.subscribe('revisions', { parent })
  Meteor.subscribe('threads', {
      parent,
      type: "dev"
  }/*, {
      limit: parseInt(this.perPage),
      skip: parseInt((this.getReactively('page') - 1) * this.perPage),
      sort: this.getReactively('sort')
  }*/)
  return {
      revisions: Revisions.find({}).fetch(),
      threads: Threads.find({}).fetch(),
      parent
  }
}, DevPage)
