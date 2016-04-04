import angular from 'angular';

export default angular.module('directives.wysiwyg', [])
    .directive('wysiwyg', function() {
        return {
          //  template: '<textarea>Easy! You should check out MoxieManager!</textarea>',
            link: function(scope, element, attrs) {
                tinymce.init({
                    selector:'textarea',
                    menubar: false,
                    language_url : '/tinymce.languages/ru.js',
                    skin_url: '/tinymce.skins/light'
                })
            }
        }
    })
