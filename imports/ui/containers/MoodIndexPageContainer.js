import React from 'react'
import { $ } from 'meteor/jquery'
import MoodIndexPage from '../pages/MoodIndexPage'

export default class MoodIndexPageContainer extends React.Component {
    state = {
        moods: [],
        nodes: [],
        loading: true
    }

    componentWillMount() {
        $.get( `api/moods`, data => {
            this.setState({
                moods: JSON.parse(data),
                loading: false
            })
        })
        $.get(`api/nodes`, data => {
            this.setState({
                nodes: JSON.parse(data)
            })
        })
    }

    render() {
        const {state} = this
        return <MoodIndexPage moods={state.moods} nodes={state.nodes} loading={state.loading} />
    }
}

// export default MoodIndexPageContainer = createContainer(() => {
//
//     const userId = Meteor.userId()
//
//     let moods = []
//     let nodes = []
//
//     $.get( `api/moods`, function( data ) {
//         moods = JSON.parse(data)
//         console.log(moods)
//     });
//
//
//
//     const perPage = 10
//     //let skip = new ReactiveVar(0)
//     const moodsReady = 	Meteor.subscribe('moods',
// 				      {},
// 				      {
// 				        sort: { createdAt: 1 },
// 				        //limit: perPage,
// 				        //skip: skip.get()
// 				    }).ready(),
// 		nodesReady = Meteor.subscribe('nodes',
// 			      {},
// 			      { sort: { createdAt: 1 } }
// 			    ).ready()
//
// 	// const nodes = Nodes.find({}).fetch()
// 	nodes.forEach(node => {
// 		if(node.url) Nodes.update(node._id, {
// 						$set: helpers.parseUrl(node.url)
// 					})
// 		}
// 	)
//
//     return {
//         moods,
//     //   moods: Moods.find().fetch(),
// 	  nodes: Nodes.find().fetch(),
//       numberOfMoods: Counts.get('numberOfMoods'),
//       loaded: moodsReady && nodesReady
//     }
// }, MoodIndexPage)
