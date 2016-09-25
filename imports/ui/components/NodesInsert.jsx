import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { $ } from 'meteor/jquery'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import TextField from 'material-ui/TextField'
import { Row, Col } from 'react-materialize'
import { parseUrl } from '../../helpers.js';
import { nodesInsert } from '../../api/nodes'
import { If } from './Utils.js';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

export default class NodesInsert extends Component {

    state = {
      url: '',
	  open: false,
      contentType: ''
    }

  toggleDialog = () => {
	this.setState({open: !this.state.open})
  }

  handleUrlChange = ({target, keyCode}) => {
      const url = target.value
      try {
          this.setState({
             contentType: parseUrl(url).type
          })
      } catch (err) {
          console.warn(err);
        this.setState({
            contentType: ''
        });
      } finally {
            this.setState({url})
      }
      if (keyCode == 13) this.handleSubmit()
  }

  handleSubmit = (e) => {
    (e && e.preventDefault())

    // get values for method call
    const { url } = this.state
	const { parent } = this.props

    $
    .post('/api/nodes/post', { url, parent, userId: Meteor.userId() })
    .done(() => this.toggleDialog())
    .fail(err => console.error(err))
    // $.post( "/api/moods/post", { name: this.state.name, userId: Meteor.userId() } )
    //     .fail(err => console.error('mood post failed!'))
    // nodesInsert.call(
    //         // { url, parent, type },
	// 	  { url, parent },
	//       (err, result) => {
	//           if (err) {
    //             //   console.warn(err);
    //               Materialize.toast(`Что-то пошло не так! ${err.reason}`, 4000)
    //           }
	//           else {
	// 				Materialize.toast(`Сохранено!`, 4000)
	// 				this.setState({
    //                     url: ' ',
    //                     // contentType: ''
    //                 })
    //   			    this.toggleDialog()
	//           }
	//       }
    // )

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
								onTouchTap={this.handleSubmit}
								/>
							]

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
                        // watch for 'enter' keypress
                        onKeyDown={handleUrlChange}
						autoFocus
						fullWidth
						required
					/>
                    <If condition={state.contentType == 'video'}>
                        <p>Тип контента: {state.contentType}</p>
                        <p>Видео важно? Или только звук?</p>
                        <div className="switch">
                          <label>
                            Заменить видео чем-нибудь интересным
                            <input type="checkbox" checked />
                            <span className="lever" />
                            Показывать видео
                          </label>
                        </div>
                    </If>
                    <If condition={state.contentType == 'image'}>
                        <p>Тип контента: {state.contentType}</p>
                    </If>
				</Dialog>
	        </form>
  }
}

NodesInsert.propTypes = {
	parent: PropTypes.string.isRequired,
	callback: PropTypes.func
}
