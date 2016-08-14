import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { SubsManager } from 'meteor/meteorhacks:subs-manager'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { Moods } from '../../api/moods'
import { Nodes } from '../../api/nodes'
import helpers from '../../helpers'
import MoodIndexPage from '../pages/MoodIndexPage'

const subsManager = new SubsManager({ cacheLimit: 5, expireIn: 5 })

export default MoodIndexPageContainer = createContainer(() => {
    const perPage = 10
    //let skip = new ReactiveVar(0)
    const moodsReady = 	Meteor.subscribe('moods',
				      {},
				      {
				        sort: { createdAt: 1 },
				        //limit: perPage,
				        //skip: skip.get()
				    }).ready(),
		nodesReady = Meteor.subscribe('nodes',
			      {},
			      { sort: { createdAt: 1 } }
			    ).ready()

	const nodes = Nodes.find({}).fetch()
	nodes.forEach(node => {
		if(node.url) Nodes.update(node._id, {
						$set: helpers.parseUrl(node.url)
					})
		}
	)

    return {
      moods: Moods.find().fetch(),
	  nodes: Nodes.find().fetch(),
      numberOfMoods: Counts.get('numberOfMoods'),
      loaded: moodsReady && nodesReady
    }
}, MoodIndexPage)
