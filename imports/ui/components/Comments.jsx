import React, { Component, PropTypes } from 'react'
import { $ } from 'meteor/jquery'

export default class Comments extends Component {
  render(){
        return (
        <div className="row">
          <div className="col s12">
            <center>
              <div id="vk_comments"></div>
            </center>
          </div>
        </div>
      )
  }
  // vk comments initialisation
  componentDidMount() {
    $.getScript( "//vk.com/js/api/openapi.js?121", function(){
      VK.init({apiId: 5451378, onlyWidgets: true})
      VK.Widgets.Comments('vk_comments', {width: '665', limit: 15, attach: "*"}) //, 321
    })
  }
}
