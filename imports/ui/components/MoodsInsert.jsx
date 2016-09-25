import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { $ } from 'meteor/jquery';
import TextField from 'material-ui/TextField'
import { Row, Col } from 'react-materialize'
import { moodsInsert } from '../../api/moods'

export default class MoodsInsert extends Component {

	state = { name: '' }

	handleNameChange = ({target, keyCode}) => {
	    this.setState({ name: target.value })
		if (keyCode == 13) this.handleSubmit()
	}

	handleSubmit = (e) => {
	    (e && e.preventDefault())

		$.post( "/api/moods/post", { name: this.state.name, userId: Meteor.userId() } )
			.fail(err => console.error('mood post failed!'))
	    // moodsInsert.call(
		// 	{ name: this.state.name },
		// 	(err) => {
		// 		if (err) Materialize.toast(`Ошибка! ${err.reason}`, 4000)
		// 		else {
		// 			Materialize.toast(`Сохранено!`, 4000)
		// 			this.setState({ name: '' })
		// 		}
		// 	}
	    // )
	}



	render() {
		const { handleSubmit, handleNameChange, handleKeyPress, props, state } = this

	    return  <form onSubmit={handleSubmit} {...props}>
					<Row>
						<Col s={12}>
							<TextField
								hintText="What's your mood?"
								onChange={handleNameChange}
								// watch for 'enter' keypress
								onKeyDown={handleNameChange}
								value={state.name}
								fullWidth
								required
							/>
						</Col>
					</Row>
		        </form>

	}
}
