import React, { Component, PropTypes } from 'react'
import Loading from '../components/Loading'
import MoodsList from '../components/MoodsList'
import MoodsInsert from '../components/MoodsInsert'
import { connect } from 'react-redux'

class MoodIndexPage extends Component {

    static propTypes = { moods: PropTypes.array.isRequired }

    componentDidMount() {
        this.props.fetchMoods()
    }

    render() {
        const {props, props: {loading, moods, nodes}} = this
        console.log('moods', moods)
        return 	loading
                ?   <Loading />
                :   <div>
        				<MoodsInsert />
        		    	<MoodsList moods={moods} nodes={nodes} />
        	    	</div>
    }

}

export default connect(
    state => {
        console.log(state)
        return {moods: state.moods}
    },
    dispatch => ({
        fetchMoods: () => {
            dispatch({type: 'fetch_moods'})
        }
    })
) (MoodIndexPage)
