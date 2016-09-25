import React, { PropTypes } from 'react'
import { $ } from 'meteor/jquery'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MoodNavBar from './MoodNavBar'
import { rootReducer, initialState } from '../../redux/main'

let timeout = null

class MoodLayout extends React.Component {

	state = { hidden: true }

	componentDidMount() {
		$('body').css('background-color', 'rgb(48, 48, 48)')
		$('input[type=url]:focus:not([readonly])').css('box-shadow', 'none !important')

	}

	showChildren = () => {
		clearInterval(timeout)
		$('#decision').show()
		this.setState({ hidden: false })
		timeout = setTimeout(() => {
			this.hideChildren()
		}, 2500);
	}

	hideChildren = () => {
		$('#decision').hide()
		this.setState({ hidden: true })
	}

	render() {
		// styles
		const 	baseStyles = 	{
									height: '100vh',
									minHeight: '100vh',
									backgroundColor: 'rgb(48, 48, 48)'
								},
				headerStyles = 	{
									position: 'fixed',
									zIndex: '1',
									width: '100%'
								}
		// TODO this
		const store = createStore(rootReducer, initialState)

		// const store = {}

		return	<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
					<Provider store={store}>
						<div
							onMouseOver={this.showChildren}
							onMouseLeave={this.hideChildren}
							onMouseMove={this.showChildren}
							// onMouseStop={this.checker}
							onTouchEnd={this.hideWhenIdle}
							style={baseStyles}
						>
							<header hidden={this.state.hidden} style={headerStyles}>
								{this.props.nav}
							</header>
							<main>
								{this.props.main}
							</main>
						</div>
					</Provider>
				</MuiThemeProvider>
	}
}

MoodLayout.propTypes = {
	main: PropTypes.node.isRequired,
	nav: PropTypes.node
}

export default MoodLayout
