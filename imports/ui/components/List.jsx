import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import Pagination from './Pagination'

export default class List extends Component {
  render() {
    const renderItems = () => {
      if(this.props.items.length != 0){
        return this.props.items.map(item => {
          return (
              <a
                key={item._id}
                href={"/" + this.props.href + "/" + item[this.props.target]}
                className="collection-item"
              >
                {item.name}
              </a>
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
      <div className={ !this.props.className ? 'row' : ''}>
          <div className={(this.props.className || 'col s12 m12 l6 offset-l3')}>
              <div>
                  <ul className="z-depth-1 collection with-header">
                      <li className="collection-item">
                          <h4 className="center-align">{this.props.name}</h4>
                      </li>
                      {renderItems()}
                  </ul>
                  <Pagination />
              </div>
          </div>
    </div>
    )
  }
}
List.defaultProps = {
  target: '_id'
}
List.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}
