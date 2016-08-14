// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();
import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import '../imports/startup/accounts-config'
import '../imports/startup/routes'
// Meteor.startup(() => {
//   Migrations.migrateTo('latest');
// });
