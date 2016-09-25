import React, { Component, PropTypes } from 'react'
import { $ } from 'meteor/jquery'
import Loading from '../components/Loading'
import NodesInsert from '../components/NodesInsert'
import Decision from '../components/Decision'
import { Row, Col, Button } from 'react-materialize'
import AppBar from '../pages/layouts/MoodNavBar.js'
import Video from '../components/Video'

export default class MoodPage extends React.Component {

	static propTypes = {
		decision: PropTypes.object.isRequired,
		slug: PropTypes.string.isRequired,
		videoCallback: PropTypes.func.isRequired,
		decisionOnChange: PropTypes.func.isRequired
	}

	render() {

	    const {node, decision, slug, decisionOnChange, videoCallback} = this.props

		// TODO move css somewhere
		const 	parentStyles = 	{
									position: 'relative',
									height: '100vh',
									paddingBottom: 0 // paddingBottom is added by .video-container
								},
				childStyles = 	{
									position: 'absolute',
									width: '100%',
									top: '50%',
									transform: 'translateY(-50%)'
								},
				buttonStyles = 	{
									position: 'fixed',
									bottom: 24,
									right: 24
								}

		return 	<section>
					<Video style={parentStyles} node={node} callback={videoCallback}>
						<Decision
							node={node}
							decision={decision}
							onChange={decisionOnChange}
							style={childStyles}
						/>
					</Video>
				</section>
	}
}
