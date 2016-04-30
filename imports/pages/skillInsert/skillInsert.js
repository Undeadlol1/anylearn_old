import angular from 'angular'
import template from './skillInsert.html'
import { Meteor } from 'meteor/meteor'
import templates from '../../services/templates'

class skillInsertCtrl {
    constructor($scope, $state, templates) {
        $scope.viewModel(this)
        this.text = templates.skill
        this.skillsInsert = data => {
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

export default angular.module('skillInsert', [templates.name])
    .component('skillInsert', {
        templateUrl: 'imports/pages/skillInsert/skillInsert.html',
        controller: ['$scope', '$state', 'templates', skillInsertCtrl]
    })
