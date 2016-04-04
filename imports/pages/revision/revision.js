import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Revisions } from '../../api/revisions.js';
import template from './revision.html';

class revisionCtrl {
  constructor($scope, $stateParams, $sce) {
    $scope.viewModel(this);

    this.subscribe('revisions');

    this.helpers({
        revision() {
            const data = Revisions.findOne($stateParams.revisionId);
            if(data) this.first = data.text.join('\n')
            return data
        },
        previous() {
            const revision = this.getReactively('revision')
            if (revision) {
              const data = Revisions.findOne({_id: revision.previous});
              if(data) this.second = data.text.join('\n')
              return data
            }
        },
        html(){
          // I ENABLED NG-SANIGITZE. SHOULD I REMOVE IT?
          const first = this.getReactively('previous')
          const second = this.getReactively('revision')
          if (angular.isDefined(first) && angular.isDefined(second)) {
            return html = $sce.trustAsHtml(htmldiff(first.text.join(`\n`), second.text.join(`\n`)))
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
