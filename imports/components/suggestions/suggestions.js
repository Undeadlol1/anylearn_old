import angular from 'angular'
import angularMeteor from 'angular-meteor'
import { Suggestions } from '../../api/suggestions.js'
import vote from '../vote/vote';

import template from './suggestions.html'

class suggestionsCtrl {
    constructor($scope) {
        $scope.viewModel(this)
        this.subscribe('suggestions', ()=>{
          return [this.parent]
        })
        this.helpers({
            suggestions() {
                return Suggestions.find()
            }
        })
    }
}

export default angular.module('suggestions', [
  angularMeteor, vote.name
])
  .component('suggestions', {
    templateUrl: 'imports/components/suggestions/suggestions.html',
    bindings: {
      name: '@',
      parent: '<'
    },
    controller: ['$scope', suggestionsCtrl]
  })
