import React, { PropTypes } from 'react'
import { $ } from 'meteor/jquery'
import YouTube from 'react-youtube'
import { toggleState } from '../components/Utils'
import get from 'oget'

class Video extends React.Component {

	state = { hidden: true }

	// toggleState = toggleState.bind(this, 'hidden')

	showDecisionControls = () => this.setState({ hidden: false })

	hideDecisionControlls = () => this.setState({ hidden: true })

	render() {
		const 	{ node, callback } = this.props,
				{ props, state } = this,
				style = { position: 'initial', height: '100vh', overflow: 'hidden' },
				opts = {
					height: '100%',
					width: '100%',
					playerVars: { // https://developers.google.com/youtube/player_parameters
						autoplay: 1,
						controls: 1
					}
				}
		
		return 	<section
					{...props}
					onMouseOver={this.showDecisionControls}
					onMouseLeave={this.hideDecisionControlls}
					style={style}
				>
					<YouTube
						videoId={get(node, 'content', '')}
						opts={opts}
						onEnd={callback}
						onError={callback}
					/>
					<div onMouseOver={this.toggleState} hidden={state.hidden}>
	    				{props.children}
					</div>
				</section>
	}
}

Video.propTypes = {
	node: PropTypes.object.isRequired,
	callback: PropTypes.func
}

export default Video
