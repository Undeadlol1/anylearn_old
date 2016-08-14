import React, { PropTypes } from 'react'
import { $ } from 'meteor/jquery'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MoodNavBar from './MoodNavBar'



class MoodLayout extends React.Component {
	constructor(params){
		super(params)
		this.state = { hidden: true }
		this.showChildren = this.showChildren.bind(this)
		this.hideChildren = this.hideChildren.bind(this)
	}

	componentDidMount() {
		$('body').css('background-color', 'rgb(48, 48, 48)')
		$('input[type=url]:focus:not([readonly])').css('box-shadow', 'none !important')

	}

	showChildren() {
		this.setState({ hidden: false })
	}

	hideChildren() {
		this.setState({ hidden: true })
	}

	render() {
		// styles
		const 	baseStyles = 	{
									backgroundColor: 'rgb(48, 48, 48)'
								},
				headerStyles = 	{
									position: 'fixed',
									zIndex: '1',
									width: '100%'
								}
 //  || <MoodNavBar />
		return	<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
					<div
						onMouseOver={this.showChildren}
						onMouseLeave={this.hideChildren}
						style={baseStyles}
					>
						<header hidden={this.state.hidden} style={headerStyles}>
						  {this.props.nav}
						</header>
						<main>
						  {this.props.main}
						</main>
					</div>
				</MuiThemeProvider>
	}
}

MoodLayout.propTypes = {
	main: PropTypes.node.isRequired,
	nav: PropTypes.node
}

export default MoodLayout
