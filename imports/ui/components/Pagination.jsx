import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import ReactPaginate from "react-paginate"

export default class Pagination extends Component {
  _handlePageClick(data){
    //this.props.changePage(data.selected++)
  }
  render(){
        // if there are pages display this component
        return (this.props.pageNum != 0) ? (
          <div className='center-align'>
            <ReactPaginate previousLabel={<i className="material-icons">chevron_left</i>}
                             nextLabel={<i className="material-icons">chevron_right</i>}
                             breakLabel={<a>...</a>}
                             //pageNum={this.state.pageNum}
                             marginPagesDisplayed={2}
                             pageRangeDisplayed={5}
                             clickCallback={this._handlePageClick.bind(this)}
                             containerClassName={'pagination'}
                             subContainerClassName={'pagination'}
                             pageLinkClassName={'waves-effect'}
                             activeClassName={'active'} />
          </div>
        ) : null
  }
}
Pagination.propTypes = {
  //name: PropTypes.string.isRequired,
  //href: PropTypes.string.isRequired,
  //items: PropTypes.array.isRequired
}
Pagination.defaultProps = {
  pageNum: 0
  // classname do not have default prop because showing row class depend on existence of className
//  className: 's12 m12 l6 offset-l3',
//  target: '_id'
}
