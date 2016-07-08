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

const perPage = 10
let skipThreads = new ReactiveVar(0)
let skipRevisions = new ReactiveVar(0)

class AdminPage extends Component {
  changePage(type, e) {
    if (type == 'threads') skipThreads.set(e.selected * perPage)
    else skipRevisions.set(e.selected * perPage)
  }
  render() {
    return <div>
		        <div className="row card-panel center">
					{this.props.users.map(user =>
						<p key={user._id}>{user._id}</p>
					)}
		        </div>
		    </div>
  }
}

AdminPage.propTypes = {
    usersCount: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired
}

export default createContainer(() => {
	Meteor.subscribe("users")
	return {
		users: Meteor.users.find().fetch(),
		usersCount: Meteor.users.find().count()
	}
}, AdminPage)
