import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor'
import { Skills } from '../../api/skills.js';
import { Revisions } from '../../api/revisions.js';
import template from './skillEdit.html';

class skillEditCtrl {
    constructor($scope, $state, $stateParams) {
      $scope.viewModel(this);

      this.subscribe('skills');
      this.subscribe('revisions');

      this.helpers({
          skill() {
              return Skills.findOne($stateParams.skillId);
          },
          revision(){
            const revision = Revisions.findOne({
              parent: $stateParams.skillId,
              active: true
            })
            return revision
      },
      first(){
        var revision = Revisions.findOne({
          parent: $stateParams.skillId,
          active: true
        })
        if(revision) return revision.text[0]
        return ' '
      },
      second(){
        var revision = Revisions.findOne({
          parent: $stateParams.skillId,
          active: true
        })
        if(revision) return revision.text[1]
        return ' '
      },
      third(){
        var revision = Revisions.findOne({
          parent: $stateParams.skillId,
          active: true
        })
        if(revision) return revision.text[2]
        return ' '
      },
      fourth(){
        var revision = Revisions.findOne({
          parent: $stateParams.skillId,
          active: true
        })
        if(revision) return revision.text[3]
        return ' '
      }
    })
    this.skillEdit = () => {
      console.log(this.first)
      console.log(this.second);
      console.log(this.third);
      console.log(this.fourth);
        const post = {
            name: this.name,
            description: this.description,
            text: [this.first, this.second, this.third, this.fourth],
            previous: this.revision._id,
            parent: $stateParams.skillId
        }
        Meteor.call('revisions.update', post, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                $state.go('skill', {
                    skillId: $stateParams.skillId
                })
            }
        })
    }
  }
}

export default angular.module('skillEdit', [])
  .component('skillEdit', {
    templateUrl: 'imports/pages/skillEdit/skillEdit.html',
    controller: ['$scope', '$state', '$stateParams', skillEditCtrl]
  });
