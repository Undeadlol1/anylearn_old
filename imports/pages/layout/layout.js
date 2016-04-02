import angular from 'angular';
import template from './layout.html';

class layoutCtrl {
  constructor($scope) {
  }
}

export default angular.module('layout', [])
  .component('layout', {
    templateUrl: 'imports/pages/layout/layout.html',
    controller: ['$scope', layoutCtrl]
  });
