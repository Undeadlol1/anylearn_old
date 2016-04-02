import angular from 'angular';
import template from './index.html';

class indexCtrl {
  constructor($scope) {
  }
}

export default angular.module('index', [])
  .component('index', {
    templateUrl: 'imports/pages/index/index.html',
    controller: ['$scope', indexCtrl]
  });
