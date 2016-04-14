import angular from 'angular'
import angularMeteor from 'angular-meteor'
import { Meteor } from 'meteor/meteor'
import { Threads } from '../../api/threads.js'
import template from './siteThreads.html'

class siteThreadsCtrl {
    constructor($scope, $stateParams) {
        $scope.viewModel(this)
        this.subscribe('threads')
        this.skillId = $stateParams.skillId
        this.helpers({
            threads() {
                return Threads.find({
                    parent: this.skillId
                }, {
                    sort: {
                        createdAt: 1
                    }
                })
            }
        })
    }
}

export default angular.module('siteThreads', [])
  .component('siteThreads', {
    templateUrl: 'imports/pages/siteThreads/siteThreads.html',
    controller: ['$scope', '$stateParams', siteThreadsCtrl]
  })
