import angular from 'angular'
import angularMeteor from 'angular-meteor'
import { $ } from 'meteor/jquery'
import { Threads } from '../../api/threads.js'

import template from './threadsList.html'

class threadsListCtrl {
    constructor($scope, $attrs) {
        $scope.viewModel(this)
        
        this.subscribe('threads',()=>{
          return [this.getReactively('parent')]
        })

        this.helpers({
            threads() {
                return Threads.find()
            }
        })
    }
}

export default angular.module('threadsList', [
  angularMeteor
])
  .component('threadsList', {
    templateUrl: 'imports/components/threadsList/threadsList.html',
    controller: ['$scope', '$attrs', threadsListCtrl],
    bindings: {
      parent: '<',
      classes: '@'
    }
  })
