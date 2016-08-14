import React, { Component, PropTypes } from 'react'
import Loading from '../components/Loading'
import MoodsList from '../components/MoodsList'
import AppBar from '../pages/layouts/MoodNavBar'
import MoodsInsert from '../components/MoodsInsert'

class MoodIndexPage extends Component {
  //_changePage(e) {skip.set(e.selected * perPage)}
  render() {
     const {props, props: {loaded, moods, nodes, revisions}} = this
    return 	loaded ?
			<div>
				<AppBar title='Mood' />
				<MoodsInsert />
		    	<MoodsList moods={moods} nodes={nodes} />
	    	</div>
			: <Loading />
  }
}


MoodIndexPage.propTypes = {
	moods: PropTypes.array.isRequired
}

export default MoodIndexPage
