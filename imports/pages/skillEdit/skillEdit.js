import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor'
import { Skills } from '../../api/skills.js';
import { Revisions } from '../../api/revisions.js';
import template from './skillEdit.html';

class skillEditCtrl {
    constructor($scope, $state, $stateParams) {
      $scope.viewModel(this);
      const parent = $stateParams.skillId
      const active = true

      this.subscribe('skills', () => {
        return [parent]
      });
      this.subscribe('revisions', ()=>{
        return [{ parent, active  }]
      });

      this.helpers({
          skill() {
              return Skills.findOne()
          },
          revision() {
              const revision = Revisions.findOne()
              return revision
          }
      })
      this.skillEdit = () => {
          const post = {
              name: this.name,
              description: this.description,
              text: this.revision.text,
              previous: this.revision._id,
              parent
          }
          Meteor.call('revisions.update', post, (err, result) => {
              if (err) {
                  console.log(err);
              } else {
                  $state.go('skill', {
                      skillId: parent
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
