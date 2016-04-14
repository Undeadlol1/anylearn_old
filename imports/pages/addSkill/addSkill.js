import angular from 'angular'
import template from './addSkill.html'
import { Meteor } from 'meteor/meteor'
import templates from '../../services/templates'

class addSkillCtrl {
    constructor($scope, $state, templates) {
        $scope.viewModel(this)
        this.text = templates.skill
        this.addSkill = data => {
            const post = {
                name: this.name,
                text: this.text
            }
            Meteor.call('skills.insert', post, function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    $state.go('skill', {
                        skillId: result
                    })
                }
            })
        }
    }
}

export default angular.module('addSkill', [templates.name])
    .component('addSkill', {
        templateUrl: 'imports/pages/addSkill/addSkill.html',
        controller: ['$scope', '$state', 'templates', addSkillCtrl]
    })
