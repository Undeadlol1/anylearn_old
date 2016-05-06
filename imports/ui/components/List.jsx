import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

export default class List extends Component {
  renderItems() {
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
  render() {
    return (
      <div className={ !this.props.className ? 'row' : ''}>
          <div className={"col " + (this.props.className || 's12 m12 l6 offset-l3')}>
              <div>
                  <ul className="collection with-header">
                      <li className="collection-item">
                          <h4 className="center-align">{this.props.name}</h4>
                      </li>
                      {this.renderItems()}
                    {/*{showItems}*/}
                      {/*<li ng-show="TL.threads.length" dir-paginate="thread in TL.threads | itemsPerPage: TL.perPage" total-items="TL.threadsCount" className="collection-item">
                          <a href="thread/{thread._id}">{thread.name}</a>
                        </li>*/}
                  </ul>
                {/*<dir-pagination-controls on-page-change="TL.changePage(newPageNumber)"></dir-pagination-controls>*/}
              </div>
          </div>
    </div>
    )
  }
}
List.defaultProps = {
  // classname do not have default prop because showing row class depend on existence of className
//  className: 's12 m12 l6 offset-l3',
  target: '_id'
}
List.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}
