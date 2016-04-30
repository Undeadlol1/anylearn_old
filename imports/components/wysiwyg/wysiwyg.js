import angular from 'angular';

class wysiwygCtrl {
    constructor($scope) {
      $scope.options = {
          //selector:'textarea', //???????
        //  menubar: false,
          language_url : '/tinymce.languages/ru.js',
          skin_url: '/tinymce.skins/light',
          plugins: 'autoresize code image autolink advlist autosave codesample link preview print contextmenu paste',
          autoresize_bottom_margin: 10,
          paste_as_text: true,
        //  elementpath: false,
          resize: false
      }
    }
}

export default angular.module('wysiwyg', [

])
  .component('wysiwyg', {
    template: `<b>{{$ctrl.label}}</b><textarea ui-tinymce="options" ng-model="$ctrl.text"></textarea>`,
    bindings: {
      label: '@',
      text: '='
    },
    controller: ['$scope', wysiwygCtrl]
  });
