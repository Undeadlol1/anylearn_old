import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
//import Blaze from 'meteor/gadicc:blaze-react-component'
import AccountsUIWrapper from './AccountsUIWrapper'
import LoginButtonsWrapper from './LoginButtonsWrapper'

class App extends Component {
        /*  {props.main} */
        /* <Blaze template="atForm" /> */
  render(props){
    return (
      <div>
        <section id="menu">
          <h1>Hello World!</h1>
          <LoginButtonsWrapper />
          <AccountsUIWrapper />
        </section>
      </div>
    )
  }
}

export default createContainer(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {
    user: Meteor.user()
  }
}, App)

/*import { Tasks } from '../api/tasks.js'

import Task from './Task.jsx'

// App component - represents the whole app
class App extends Component {
  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ))
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch()
  }
}, App)*/

/*const App = (props) => (
  <div>
    <section id="menu"></section>
    {props.main}
  </div>
) */
