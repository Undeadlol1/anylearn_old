import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import VoteContainer from '../containers/VoteContainer'
import Pagination from './Pagination'
import get from 'oget'

class RevisionsList extends Component {
    revert(_id) {
        const reason = prompt("Почему вы хотите отменить это изменение?")
        if (reason) Meteor.call('revisions.revert', _id, reason)
    }
  render() {
    const {props, revert} = this

    const renderItems = () => {
      // if items exist render them, else show empty list
      if(props.items.length != 0){
        return props.items.map(item => {
            const revertButton = () =>{//_.contains([1, 2, 3], 3);
                const user = Meteor.user() || {}
                let isAdmin = _.contains(get(user, "roles"), 'admin')
                return isAdmin ? <i onClick={revert.bind(this, item._id)}
                                    className="right text-red material-icons"
                                    style={{cursor: 'pointer'}}>
                                    restore
                                </i> : ''
            }
          return (
            <li key={item._id} className="collection-item">
              <a
                href={"/" + props.href + "/" + item[props.target]}
              >
                {item.name}
              </a>
              <VoteContainer parent={item._id} color="#303f9f" />
              {revertButton()}
            </li>
            )
          }
        )
      }
      else {
        return (
          <li className="collection-item center-align">
              <b>
                  <i>Список пуст...</i>
              </b>
          </li>
        )
      }
    }
    return (
      <div className={ !props.className ? 'row' : ''}>
          <div className={(props.className || 'col s12 m12 l6 offset-l3')}>
              <div>
                  <ul className="z-depth-1 collection with-header">
                      <li className="collection-item">
                          <h4 className="center-align">{props.name}</h4>
                      </li>
                      {renderItems()}
                  </ul>
                  <Pagination
                    numberOfItems={props.numberOfItems}
                    onChangePage={props.onChangePage}
                  />
              </div>
          </div>
    </div>
    )
  }
}
RevisionsList.defaultProps = {
  target: '_id'
}
RevisionsList.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  numberOfItems: PropTypes.number.isRequired
}

export default RevisionsList
