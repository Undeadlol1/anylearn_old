import angular from 'angular'
import { $ } from 'meteor/jquery'
//import angularMeteor from 'angular-meteor';
//import { Skills } from '../../api/skills.js';

import template from './skillStages.html';

class skillStagesCtrl {
    constructor($scope, $element, $sce) {
      $scope.$watch('text',(oldValue, newValue)=>{
        if (newValue){
        newValue.forEach((item, index, array) => {
        this.text[index] = $sce.trustAsHtml(newValue[index])
      })}})
      $element.ready(function(){
        $('ul.tabs').tabs()
      })
    }
}

export default angular.module('skillStages', [])
  .component('skillStages', {
    templateUrl: 'imports/components/skillStages/skillStages.html',
    bindings: {
      text: '<'
    },
    controller: ['$scope', '$element', '$sce', skillStagesCtrl]
  });
