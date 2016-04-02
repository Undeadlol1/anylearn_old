import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Skills } from '../../api/skills.js';

import template from './skillsList.html';

class skillsListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('skills');

    this.helpers({
      skills() {
        return Skills.find();
      }
    })
  }
}

export default angular.module('skillsList', [
  angularMeteor
])
  .component('skillsList', {
    templateUrl: 'imports/components/skillsList/skillsList.html',
    controller: ['$scope', skillsListCtrl]
  });
