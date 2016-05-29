import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import ReactPaginate from "react-paginate"

export default class Pagination extends Component {
  _handlePageClick(data){
    //this.props.changePage(data.selected++)
  }
  render(){
    const p = this.props
    const pages = Math.ceil(p.numberOfItems/p.perPage)
    // if there are pages display this component
    if (p.numberOfItems != 0 && p.numberOfItems/p.perPage > 1) {
      return (
        <div className='center-align'>
          <ReactPaginate
               previousLabel={<i className="material-icons">chevron_left</i>}
               nextLabel={<i className="material-icons">chevron_right</i>}
               breakLabel={<a>...</a>}
               pageNum={pages}
               marginPagesDisplayed={2}
               pageRangeDisplayed={5}
               clickCallback={p.onChangePage.bind(this)}
               containerClassName={'pagination'}
               subContainerClassName={'pagination'}
               pageLinkClassName={'waves-effect'}
               activeClassName={'active'} />
        </div>
      )
    }
    else return null
  }
}
Pagination.defaultProps = {
  perPage: 10
}
Pagination.propTypes = {
  perPage: PropTypes.number.isRequired
}
