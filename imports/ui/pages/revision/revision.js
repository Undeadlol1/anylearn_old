import angular from 'angular';
import { Meteor } from 'meteor/meteor'
import angularMeteor from 'angular-meteor';
import { Revisions } from '../../api/revisions.js';
import template from './revision.html';

class revisionCtrl {
  constructor($scope, $stateParams, $sce) {
    $scope.viewModel(this);
    const current = $stateParams.revisionId
    this.subscribe('revisions', ()=>{
     return [{}]
    })

    this.helpers({
        revision() {
            return Revisions.findOne(current)
        },
        previous() {
            const revision = this.getReactively('revision')
            if (revision) return Revisions.findOne(revision.previous)
        },
        html(){
          const first = this.getReactively('previous')
          const second = this.getReactively('revision')
          if (first && second) {
            const difference = htmldiff(first.text.join(`\n`), second.text.join(`\n`))
            return $sce.trustAsHtml(difference)
          }
        }
    })
  }
}

export default angular.module('revision', [])
  .component('revision', {
    templateUrl: 'imports/pages/revision/revision.html',
    controller: ['$scope', '$stateParams', '$sce', revisionCtrl]
  });
