import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './docs.html';

class docsCtrl {
  constructor($scope, $stateParams, $sce) {
    $scope.viewModel(this);

    this.subscribe('docs');

    this.helpers({
    })
  }
}

export default angular.module('docs', [])
  .component('docs', {
    templateUrl: 'imports/pages/docs/docs.html',
    controller: ['$scope', docsCtrl]
  });
