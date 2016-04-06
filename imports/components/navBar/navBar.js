import angular from 'angular';
//import angularMeteor from 'angular-meteor';
//import { Skills } from '../../api/skills.js';

import template from './navBar.html';

class navBarCtrl {
    constructor() {

      $(".button-collapse").sideNav();
        /*$scope.viewModel(this);

        this.subscribe('skills');

        this.helpers({
            skills() {
                return Skills.find({}, {
                    sort: {
                        createdAt: -1
                    }
                });
            }
        })*/
    }
}

export default angular.module('navBar', [])
  .component('navBar', {
    templateUrl: 'imports/components/navBar/navBar.html',
    controller: ['$scope', navBarCtrl]
  });
