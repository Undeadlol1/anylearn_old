import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import { $ } from 'meteor/jquery'

export default class NavBar extends Component {
  render() {
    return  <AppBar
			    title={
					<a
						href="/mood"
						style={{color: 'rgb(48, 48, 48)'}}
					>
						Mood
					</a>
				}
    			iconElementRight={this.props.children}
			/>
  }
}

NavBar.propTypes = {
	title: PropTypes.node.isRequired
}
