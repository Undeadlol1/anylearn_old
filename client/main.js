import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularSanitize from 'angular-sanitize'

import skillsList from '../imports/components/skillsList/skillsList';
import wysiwyg from '../imports/components/wysiwyg/wysiwyg';
import navBar from '../imports/components/navBar/navBar';
import skillStages from '../imports/components/skillStages/skillStages';

//import wysiwygDirective from '../imports/directives/wysiwygDirective/wysiwygDirective';

import index from '../imports/pages/index/index';
import skill from '../imports/pages/skill/skill';
import addSkill from '../imports/pages/addSkill/addSkill';
import skillEdit from '../imports/pages/skillEdit/skillEdit';
import forum from '../imports/pages/forum/forum';
import thread from '../imports/pages/thread/thread';
import revision from '../imports/pages/revision/revision';
import signIn from '../imports/pages/signIn/signIn';
import layout from '../imports/pages/layout/layout';
import docs from '../imports/pages/docs/docs';

import routes from '../imports/startup/routes';
import '../imports/startup/accounts-config.js';

// tinymce ui relies on tinymce cdn, which is linked in main.html
import '../node_modules/angular-ui-tinymce/src/tinymce.js'

angular.module('teachme', [
  angularMeteor,
  routes.name,
  skillsList.name,
  addSkill.name,
  skillEdit.name,
  wysiwyg.name,
  navBar.name,
  skillStages.name,
//  wysiwygDirective.name,
  index.name,
  skill.name,
  forum.name,
  thread.name,
  revision.name,
  signIn.name,
  layout.name,
  docs.name,
  'ui.tinymce',
  'accounts.ui',
  angularSanitize
]);

function onReady() {
  angular.bootstrap(document, ['teachme']);
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
