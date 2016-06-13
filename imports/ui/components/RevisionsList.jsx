import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import VoteContainer from '../containers/VoteContainer'
import Pagination from './Pagination'

class RevisionsList extends Component {
    revert(_id) {
        console.log(_id);
        const reason = prompt("Почему вы хотите отменить это изменение?")
        console.log(reason);

        if (reason) Meteor.call('revisions.revert', _id, reason)
    }
  render() {
    const p = this.props
    const renderItems = () => {
      // if items exist render them, else show empty list
      if(p.items.length != 0){
        return p.items.map(item => {
          return (
            <li key={item._id} className="collection-item">
              <a
                href={"/" + p.href + "/" + item[p.target]}
              >
                {item.name}
              </a>
              <VoteContainer parent={item._id} color="#303f9f" />
              <i onClick={this.revert.bind(this, item._id)}
                className="right text-red material-icons"
                style={{cursor: 'pointer'}}>
                restore
              </i>
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
      <div className={ !p.className ? 'row' : ''}>
          <div className={(p.className || 'col s12 m12 l6 offset-l3')}>
              <div>
                  <ul className="z-depth-1 collection with-header">
                      <li className="collection-item">
                          <h4 className="center-align">{p.name}</h4>
                      </li>
                      {renderItems()}
                  </ul>
                  <Pagination
                    numberOfItems={p.numberOfItems}
                    onChangePage={p.onChangePage}
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
