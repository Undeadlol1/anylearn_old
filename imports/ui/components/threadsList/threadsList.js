import angular from 'angular'
import angularMeteor from 'angular-meteor'
import { Threads } from '../../api/threads.js'
import { Counts } from 'meteor/tmeasday:publish-counts';
import template from './threadsList.html'

class threadsListCtrl {
    constructor($scope, $attrs) {
        $scope.viewModel(this)
        this.perPage = 10;
        this.page = 1;
        this.sort = {
            createdAt: -1
        };
        this.subscribe('threads', () => [{
            parent: this.parent,
            type: this.type
        }, {
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
        }])
        this.helpers({
            threads() {
                return Threads.find({}, {
                        sort: this.getReactively('sort')
                    }
                )
            },
            threadsCount() {
                return Counts.get('numberOfThreads');
            }
        })
        this.changePage = index => {
            this.page = index
        }
    }
}

export default angular.module('threadsList', [
  angularMeteor
])
  .component('threadsList', {
    templateUrl: 'imports/components/threadsList/threadsList.html',
    controller: ['$scope', '$attrs', threadsListCtrl],
    controllerAs: 'TL',
    bindings: {
      parent: '<',
      classes: '@',
      type: '@'
    }
  })
