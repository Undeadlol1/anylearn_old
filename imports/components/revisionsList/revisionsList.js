import angular from 'angular'
import angularMeteor from 'angular-meteor'
import { Revisions } from '../../api/revisions.js'
import { Counts } from 'meteor/tmeasday:publish-counts';
import template from './revisionsList.html'

class revisionsListCtrl {
    constructor($scope, $attrs) {
        $scope.viewModel(this)
        this.perPage = 10;
        this.page = 1;
        this.sort = {
            createdAt: -1
        };
        this.subscribe('revisions', () => [{
            parent: this.parent
        }, {
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
        }])
        this.changePage = index => {
            this.page = index
        }
        this.helpers({
            revisions() {
                return Revisions.find({}, {
                        sort: this.getReactively('sort')
                    }
                )
            },
            revisionsCount() {
                return Counts.get('numberOfRevisions');
            }
        })
    }
}

export default angular.module('revisionsList', [
  angularMeteor
])
  .component('revisionsList', {
    templateUrl: 'imports/components/revisionsList/revisionsList.html',
    controller: ['$scope', '$attrs', revisionsListCtrl],
    controllerAs: 'RL',
    bindings: {
      parent: '<',
      classes: '@',
      type: '@'
    }
  })
