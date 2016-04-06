import angular from 'angular';

class wysiwygCtrl {
    constructor($scope) {
      $scope.options = {
          //selector:'textarea', //???????
          menubar: false,
          language_url : '/tinymce.languages/ru.js',
          skin_url: '/tinymce.skins/light',
          plugins: 'autoresize',
          autoresize_bottom_margin: 10,
          elementpath: false,
          resize: false
      }
    }
}

export default angular.module('wysiwyg', [

])//angularMeteor
  .component('wysiwyg', {
    template: `<b>{{$ctrl.label}}</b><textarea ui-tinymce="options" ng-model="$ctrl.text"></textarea>`,
    bindings: {
      label: '@',
      text: '='
    },
    controller: ['$scope', wysiwygCtrl]
  });
