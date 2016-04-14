import angular from 'angular'
import angularMeteor from 'angular-meteor'
import { Meteor } from 'meteor/meteor'
import { Forums } from '../../api/forums.js'
import template from './siteForums.html'

class siteForumsCtrl {
    constructor($scope) {
        $scope.viewModel(this)
        this.subscribe('forums')
        this.helpers({
            forums() {
                return Forums.find({
                    parent: 'root'
                }, {
                    sort: {
                        createdAt: 1
                    }
                })
            }
        })
    }
}

export default angular.module('siteForums', [])
  .component('siteForums', {
    templateUrl: 'imports/pages/siteForums/siteForums.html',
    controller: ['$scope', siteForumsCtrl]
  })
