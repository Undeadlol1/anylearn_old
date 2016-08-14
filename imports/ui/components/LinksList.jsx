import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import Pagination from './Pagination'

class LinksList extends Component {

	state = { loading: true }

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
LinksList.defaultProps = {
  target: '_id'
}
LinksList.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  numberOfItems: PropTypes.number.isRequired
}

export default LinksList
