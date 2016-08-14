import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import TextField from 'material-ui/TextField'
import { Row, Col } from 'react-materialize'
import { nodesInsert } from '../../api/nodes'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

export default class NodesInsert extends Component {

    state = {
      url: '',
	  open: false
    }

  toggleDialog = () => {
	this.setState({open: !this.state.open})
  }

  handleUrlChange = (e) => {
    this.setState({url: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    // get values for method call
    const { url } = this.state
	const { parent } = this.props

    nodesInsert.call(
		  { url, parent },
	      (err, result) => {
	          if (err) Materialize.toast(`Что-то пошло не так! ${err.reason}`, 4000)
	          else {
					Materialize.toast(`Сохранено!`, 4000)
					this.setState({ url: '' })
	          }
			  this.toggleDialog()
	      }
    )

  }

render() {
	const {handleSubmit, handleUrlChange, props, state} = this


			const actions = [
								<FlatButton
								label="Cancel"
								primary={true}
								onTouchTap={this.toggleDialog}
								/>,
								<FlatButton
								label="Submit"
								primary={true}
								keyboardFocused={true}
								onTouchTap={this.handleSubmit}
								/>
							]// ,
			// buttonStyles = 	{
			// 					position: 'fixed',
			// 					bottom: 24,
			// 					right: 24
			// 				}
 // style={buttonStyles}
    return  <form onSubmit={handleSubmit} {...props}>
				<RaisedButton
					icon={<ContentAdd />}
					onClick={this.toggleDialog}
					secondary={true}
				/>
				<Dialog
					title="Add something"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.toggleDialog}
				>
					<TextField
						onChange={handleUrlChange}
						value={state.url}
						type="url"
						hintText="Url"
						autoFocus
						fullWidth
						required
					/>
				</Dialog>
	        </form>
  }
}

NodesInsert.propTypes = {
	parent: PropTypes.string.isRequired,
	callback: PropTypes.func
}
