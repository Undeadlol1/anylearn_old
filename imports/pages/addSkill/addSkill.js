import angular from 'angular';
import template from './addSkill.html';
import { Meteor } from 'meteor/meteor'
import text from './template'

class addSkillCtrl {
    constructor($scope, $state) {
        $scope.viewModel(this);
        this.text = text
        this.addSkill = data => {
            const post = {
                name: this.name,
                text: this.text
            }
            Meteor.call('skills.insert', post, function(err, result) {
                if (err) {
                    console.log(err, result);
                } else {
                    $state.go('skill', {
                        skillId: result
                    })
                }
            })
        }
    }
}

export default angular.module('addSkill', [])
    .component('addSkill', {
        templateUrl: 'imports/pages/addSkill/addSkill.html',
        controller: ['$scope', '$state', addSkillCtrl]
    });
