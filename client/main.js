import angular from 'angular';
import angularMeteor from 'angular-meteor';
import skillsList from '../imports/components/skillsList/skillsList';
import index from '../imports/pages/index/index';
import signIn from '../imports/pages/signIn/signIn';
import layout from '../imports/pages/layout/layout';
import routes from '../imports/startup/routes';
import '../imports/startup/accounts-config.js';

angular.module('teachme', [
  angularMeteor,
  routes.name,
  skillsList.name,
  index.name,
  signIn.name,
  layout.name,
  //todosList.name,
  'accounts.ui'
]);

function onReady() {
  angular.bootstrap(document, ['teachme']);
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
