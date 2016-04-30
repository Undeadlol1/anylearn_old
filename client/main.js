import { Meteor } from 'meteor/meteor'
import angular from 'angular'
import angularMeteor from 'angular-meteor'
import angularSanitize from 'angular-sanitize'
// configs
import routes from '../imports/startup/routes'
import '../imports/startup/accounts-config.js'
// components
import navBar from '../imports/components/navBar/navBar'
import skillsList from '../imports/components/skillsList/skillsList'
import skillStages from '../imports/components/skillStages/skillStages'
import threadsInsert from '../imports/components/threadsInsert/threadsInsert'
import threadsList from '../imports/components/threadsList/threadsList'
import revisionsList from '../imports/components/revisionsList/revisionsList'
import wysiwyg from '../imports/components/wysiwyg/wysiwyg'
import pagination from '../imports/components/pagination/pagination'
// directives
import collapsible from '../imports/directives/collapsible/collapsible'
// pages
import index from '../imports/pages/index/index'
import skill from '../imports/pages/skill/skill'
import skillInsert from '../imports/pages/skillInsert/skillInsert'
import skillEdit from '../imports/pages/skillEdit/skillEdit'
import forum from '../imports/pages/forum/forum'
import manifest from '../imports/pages/manifest/manifest'
import siteForums from '../imports/pages/siteForums/siteForums'
import siteThreads from '../imports/pages/siteThreads/siteThreads'
import thread from '../imports/pages/thread/thread'
import revision from '../imports/pages/revision/revision'
import signIn from '../imports/pages/signIn/signIn'
import docs from '../imports/pages/docs/docs'
// utilities/plugins
import utilsPagination from 'angular-utils-pagination';
// tinymce ui relies on tinymce cdn, which is linked in main.html
import '../node_modules/angular-ui-tinymce/src/tinymce.js'


angular.module('teachme', [
  angularMeteor,
  routes.name,
  skillsList.name,
  skillInsert.name,
  skillEdit.name,
  wysiwyg.name,
  pagination.name,
  navBar.name,
  skillStages.name,
  index.name,
  skill.name,
  forum.name,
  manifest.name,
  collapsible.name,
  siteForums.name,
  siteThreads.name,
  threadsList.name,
  threadsInsert.name,
  thread.name,
  revision.name,
  revisionsList.name,
  signIn.name,
  docs.name,
  utilsPagination,
  'ui.tinymce',
  'accounts.ui',
  angularSanitize
])

function onReady() {
  angular.bootstrap(document, ['teachme'])
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady)
} else {
  angular.element(document).ready(onReady)
}
