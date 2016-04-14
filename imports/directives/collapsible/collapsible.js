import angular from 'angular'
import {$} from 'meteor/jquery'

export default angular.module('collapsible', [])
    .directive('collapsible', function() {
        var directiveDefinitionObject = {
            restrict: 'E',
            template: `
              <ul class="collapsible" data-collapsible="accordion">
                <li>
                  <div class="collapsible-header"><i class="material-icons">library_books</i>{{name}}</div>
                  <div class="collapsible-body"><ng-transclude></ng-transclude></div>
                </li>
              </ul>
              `,
            transclude: true,
            scope: {
                'name': '@'
            },
            link: function postLink($scope, $element) {
                $element.ready(function() {
                    $('.collapsible').collapsible({
                        accordion: false
                    })
                })
            }
        }
        return directiveDefinitionObject
    })
