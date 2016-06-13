import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { ReactiveVar } from 'meteor/reactive-var'
import { Revisions } from '../../api/revisions.js'
import { Threads } from '../../api/threads.js'
import { Skills } from '../../api/skills.js'
import ThreadsInsert from '../components/ThreadsInsert'
import List from '../components/List'
import Loading from '../components/Loading'

const perPage = 10
let skipThreads = new ReactiveVar(0)
let skipRevisions = new ReactiveVar(0)

class ProfilePage extends Component {
  changePage(type, e) {
    if (type == 'threads') skipThreads.set(e.selected * perPage)
    else skipRevisions.set(e.selected * perPage)
  }
  render() {
    const p = this.props
    return p.loaded ? (
      <div>
        <ThreadsInsert parent={p.parent} type="dev" />
        <div className="row">
          <div className="col s12 m6">
             <div className="card-panel center-align">
               <a href={`/manifest/${p.parent}`}>
                 Манифест
               </a>
             </div>
          </div>
          <div className="col s12 m6">
            <div className="card-panel center-align">
               <a href="">
                 Потенциальная картина ученика
               </a>
            </div>
          </div>
        </div>
        <div className="row">
          <List
            name="Обсуждения"
            items={p.threads}
            numberOfItems={p.numberOfThreads}
            type="dev"
            href="thread"
            className="col s12 m6"
            onChangePage={this.changePage.bind(this, 'threads')}
            />
          <List
            name="История"
            items={p.revisions}
            numberOfItems={p.numberOfRevisions}
            votes={true}
            href="revision"
            className="col s12 m6"
            onChangePage={this.changePage.bind(this, 'revisions')}
            />
        </div>
      </div>
    ) : <Loading />
  }
}

ProfilePage.propTypes = {
 parent: PropTypes.string.isRequired,
 loaded: PropTypes.bool.isRequired,
 revisions: PropTypes.array.isRequired,
 threads: PropTypes.array.isRequired,
 numberOfThreads: PropTypes.number.isRequired,
 numberOfRevisions: PropTypes.number.isRequired
}

export default createContainer(() => {
  Meteor.subscribe('skills', {slug: FlowRouter.getParam('skillSlug') })
  const skill = Skills.findOne(),
  parent = skill ? skill._id : '',
  revisionsReady = Meteor.subscribe('revisions',
        { parent },
        {
        sort: { createdAt: -1 },
        limit: perPage,
        skip: skipRevisions.get()
  }),
  threadsReady =  Meteor.subscribe('threads', {
        parent,
        type: "dev"
    }, {
        sort: { createdAt: -1 },
        limit: perPage,
        skip: skipThreads.get()
  })//.ready()
console.log(parent);
  return {
    revisions: Revisions.find({}).fetch(),
    threads: Threads.find({}).fetch(),
    numberOfThreads: Counts.get('numberOfThreads'),
    numberOfRevisions: Counts.get('numberOfRevisions'),
    loaded: true, //revisionsReady && threadsReady,
    parent
  }
}, ProfilePage)
