import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Revisions } from '../../api/revisions.js'
import { Threads } from '../../api/threads.js'
import ThreadsInsert from '../components/ThreadsInsert'
import Form from '../components/Form'
import List from '../components/List'
import Loading from '../components/Loading'


class DevPage extends Component {
  render() {
    return this.props.loaded ? (
      <div>
        {/*<Form preset="threads.insert" type="dev" />*/}
        <ThreadsInsert parent={this.props.parent} type="dev" />
        <div className="row card-panel">
          <a href={`/manifest/${this.props.parent}`} className="col m12">
            Манифест
          </a>
        </div>
        <div className="row">{/* totalItems={} */}
          <List name="Обсуждения" items={this.props.threads} type="dev" href="thread" className="col s12 m6" />
          <List name="История" items={this.props.revisions} href="revision" className="col s12 m6" />
        </div>
      </div>
    ) : <Loading />
  }
}

DevPage.propTypes = {
 parent: PropTypes.string.isRequired,
 revisions: PropTypes.array.isRequired,
 threads: PropTypes.array.isRequired
}

export default createContainer(() => {
  const parent = FlowRouter.getParam('skillId')
  const revisionsReady = Meteor.subscribe('revisions', { parent }, { sort: { createdAt: -1 } }).ready()
  const threadsReady =  Meteor.subscribe('threads', {
      parent,
      type: "dev"
  }, {
      sort: { createdAt: -1 }//,
    //  limit: parseInt(this.perPage),
    //  skip: parseInt((this.getReactively('page') - 1) * this.perPage)
  }).ready()
  const revisions = Revisions.find({}).fetch()
  const threads = Threads.find({}).fetch()
  return {
    revisions, threads, parent,
    loaded: revisionsReady && threadsReady
  }
}, DevPage)
