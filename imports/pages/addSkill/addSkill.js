import angular from 'angular';
import template from './addSkill.html';

class addSkillCtrl {
  constructor($scope) {
  }
}

export default angular.module('addSkill', [])
  .component('addSkill', {
    templateUrl: 'imports/pages/addSkill/addSkill.html',
    controller: ['$scope', addSkillCtrl]
  });
