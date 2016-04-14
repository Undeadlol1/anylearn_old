import angular from 'angular';
import templates from '../../services/templates'
import template from './docs.html';

class docsCtrl {
  constructor($scope, templates, $sce) {
    $scope.viewModel(this);
    this.text = templates.skill
    this.introduction = $sce.trustAsHtml(templates.introduction)
  }
}

export default angular.module('docs', [templates.name])
  .component('docs', {
    templateUrl: 'imports/pages/docs/docs.html',
    controller: ['$scope', 'templates', '$sce', docsCtrl]
  });
