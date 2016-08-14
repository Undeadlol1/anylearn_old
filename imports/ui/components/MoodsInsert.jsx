import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import TextField from 'material-ui/TextField'
import { Row, Col } from 'react-materialize'
import { moodsInsert } from '../../api/moods'

export default class MoodsInsert extends Component {

	state = { name: '' }

	handleNameChange = (e) => {
	    this.setState({ name: e.target.value })
	}

	handleSubmit = (e) => {
	    e.preventDefault()

	    moodsInsert.call(
			{ name: this.state.name },
			(err) => {
				if (err) Materialize.toast(`Ошибка! ${err.reason}`, 4000)
				else {
					Materialize.toast(`Сохранено!`, 4000)
					this.setState({ name: '' })
				}
			}
	    )

	}

	render() {
		const { handleSubmit, handleNameChange, props, state } = this

	    return  <form onSubmit={handleSubmit} {...props}>
					<Row>
						<Col s={12}>
							<TextField
								hintText="What's your mood?"
								onChange={handleNameChange}
								value={state.name}
								fullWidth
								required
							/>
						</Col>
					</Row>
		        </form>

	}
}
