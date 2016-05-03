import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { $ } from 'meteor/jquery'
import { Notifications } from '../../api/notifications.js'
import LoginButtonsWrapper from '../containers/LoginButtonsWrapper'

class NavBar extends Component {
  renderNotifications() {
    return this.props.notifications.map((notif) => (
      <li>
        <a key={notif._id} onClick="this.check(notif._id).bind(this))" href="/revision/{notif.targetId}">{notif.name}</a>
      </li>
    ))
  }
  check(_id){
    Meteor.call('notifications.update', _id)
  }
  componentDidMount(){
    $(this.refs.dropdown).dropdown()
    $(this.refs.collapse).sideNav({closeOnClick: true})
  }
  render() {
    const showNotifications = function(){
      if(this.props && this.props.notifications){
        return (
          <li ref="dropdown" className="dropdown-button" data-activates="notifsDropdown">
            <a href="">Уведомления <span className="new badge">{this.props.notifications.length}</span></a>
          </li>
        )
      }
      else { return null }
    }
    return (
      <nav>
          <ul id="notifsDropdown" className="dropdown-content">
            {this.renderNotifications()}
          </ul>
         <div className="nav-wrapper">
           <a href="/" className="brand-logo center">AnyLearn</a>
          <a href="" ref="collapse" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
           </a>
           <ul className="right hide-on-med-and-down">
               <li><LoginButtonsWrapper /></li>
               <li><a href="/forums">Форум</a></li>
               <li><a href="/add-skill">Создать навык</a></li>
           </ul>

           <ul className="left hide-on-med-and-down">
                {showNotifications()}
           </ul>
           <ul className="side-nav" id="mobile-demo">
               <li><LoginButtonsWrapper /></li>
               <li><a href="/forums">Форум</a></li>
               <li><a href="/add-skill">Создать навык</a></li>
           </ul>
         </div>
       </nav>

    )
  }
}

NavBar.propTypes = {
 notifications: PropTypes.array.isRequired
}

export default createContainer(() => {
    Meteor.subscribe('notifications')
    return {
        notifications: Notifications.find({}).fetch()
    }
}, NavBar)
