import angular from 'angular';
//import angularMeteor from 'angular-meteor';
//import { Skills } from '../../api/skills.js';

//import template from './wysiwyg.html';

class wysiwygCtrl {
    constructor($scope) {
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

export default angular.module('wysiwyg', [

])//angularMeteor
  .component('wysiwyg', {
    template: `<b>{{$ctrl.label}}</b><textarea ui-tinymce ng-model="$ctrl.text"></textarea>`,
  //  templateUrl: 'imports/components/wysiwyg/wysiwyg.html',
    bindings: {
      label: '@',
      text: '='
    },
    controller: ['$scope', wysiwygCtrl]
  });
