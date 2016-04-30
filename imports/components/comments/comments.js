import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Comments } from '../../api/comments.js';

import template from './commentsList.html';

class commentsListCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.subscribe('comments', ()=>{
          return [this.parent]
        });

        this.helpers({
            comments() {
                return Comments.find();
            }
        })
    }
}

export default angular.module('commentsList', [
  angularMeteor
])
  .component('commentsList', {
    templateUrl: 'imports/components/commentsList/commentsList.html',
    controller: ['$scope', commentsListCtrl],
    bindings: {
      parent: '<'
    }
  });
