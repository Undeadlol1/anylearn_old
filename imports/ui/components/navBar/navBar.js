import angular from 'angular'
import angularMeteor from 'angular-meteor'
import { Meteor } from 'meteor/meteor'
import { $ } from 'meteor/jquery'
import { Notifications } from '../../api/notifications.js'

import template from './navBar.html'

class navBarCtrl {
    constructor($scope, $element) {
        $scope.viewModel(this)
        $element.ready(function(){
          $(".dropdown-button").dropdown()
          $(".button-collapse").sideNav({closeOnClick: true})
        })
        this.subscribe('notifications')
        this.helpers({
            notifications() {
              const data = Notifications.find()
              if (data) return data
              return ''
            }
        })
        this.check = _id =>{
          Meteor.call('notifications.update', _id)
        }
    }
}

export default angular.module('navBar', [angularMeteor])
  .component('navBar', {
    templateUrl: 'imports/components/navBar/navBar.html',
    controller: ['$scope', '$element', navBarCtrl]
  })
