import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { $ } from 'meteor/jquery'
import { Notifications } from '../../api/notifications.js'
import Blaze from 'meteor/gadicc:blaze-react-component'
import get from 'oget'

class NavBar extends Component {
  handleClick(_id){
    Meteor.call('notifications.update', _id)
  }
  componentDidMount(){
    $(this.refs.dropdown).dropdown()
    $(this.refs.collapse).sideNav({closeOnClick: true})
  }
  render() {
      const adminButton = () =>{//_.contains([1, 2, 3], 3);
          const user = Meteor.user() || {}
          let isAdmin = _.contains(get(user, "roles"), 'admin')
          return isAdmin ? <li><a href="/admin">Admin</a></li> : ''
      }
    const NotificationsIndicator = ()=>{
      try {
        if(this.props.notifications.length) return (
            <li ref="dropdown" className="dropdown-button" data-activates="notifsDropdown">
              <a>Уведомления <span className="new badge">{notifs.length}</span></a>
            </li>
          )
      }
      catch (e) { return null }
    }
    const NotificationsList= () => {
      return this.props.notifications.map((notif) => (
        <li>
          <a key={notif._id} onClick={this.handleClick(notif._id)} href={`/revision/${notif.targetId}`}>{notif.name}</a>
        </li>
      ))
    }
    return (
      <nav>
          <ul id="notifsDropdown" className="dropdown-content">
            {NotificationsList()}
          </ul>
         <div className="nav-wrapper">
           <a href="/" className="brand-logo center">AnyLearn</a>
          <a href="" ref="collapse" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
           </a>
           <ul className="right hide-on-med-and-down">
               <li><a href="/add-skill">Создать навык</a></li>
               {adminButton()}
               <li><a href="/profile">Профайл</a></li>
               <li><Blaze template="atNavButton" /></li>
           </ul>

           <ul className="left hide-on-med-and-down">
               <li><a href="/dashboard">Dashboard</a></li>
                {NotificationsIndicator()}
           </ul>
           <ul className="side-nav" id="mobile-demo">
               <li><Blaze template="atNavButton" /></li>
               {NotificationsIndicator()}
               <li><a href="/profile">Профайл</a></li>
               {adminButton()}
               <li><a href="/dashboard">Dashboard</a></li>
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
