import React from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { mount } from 'react-mounter'
import { Accounts } from 'meteor/accounts-base'
import { Session } from 'meteor/session'
import Blaze from 'meteor/gadicc:blaze-react-component'
import oget from 'oget'

// pages
import MainLayout from '../ui/pages/MainLayout.js'
import IndexPageContainer from '../ui/containers/IndexPageContainer'
import SkillPageContainer from '../ui/containers/SkillPageContainer'
import AdminPage from '../ui/pages/AdminPage'
import DashboardPageContainer from '../ui/containers/DashboardPageContainer'
import ProfilePage from '../ui/pages/ProfilePage'
import DevPageContainer from '../ui/containers/DevPageContainer'
import ManifestPage from '../ui/pages/ManifestPage'
import ScholarPage from '../ui/pages/ScholarPage'
import RevisionPage from '../ui/pages/RevisionPage'
import ThreadPage from '../ui/pages/ThreadPage'
import DocsPage from '../ui/pages/DocsPage'
import SkillsInsertPage from '../ui/pages/SkillsInsertPage'
import SkillsUpdatePageContainer from '../ui/containers/SkillsUpdatePageContainer'

function checkLoggedIn (ctx, redirect) {
    if (!Meteor.userId()) redirect('/sign-in')
}
function checkAdmin (ctx, redirect){
    if (!_.contains(oget(Meteor.user(), 'roles'), 'admin')) {
        console.warn('You cannot acces that route! Redirecting to main page')
        redirect('/')
    }
}
// filtering
//FlowRouter.triggers.enter([checkLoggedIn], {only: ['AddSkill', 'EditSkill']});
//FlowRouter.triggers.enter([checkAdmin], {only: ['Admin']});

/*const routes = [
  ['/', 'IndexPage', <IndexPageContainer />],
  ['/add-skill', 'SkillsInsert', <SkillsInsertPage />],
  ['/s/:skillSlug', 'Skill', <SkillPageContainer />],
  ['/s/:skillSlug/dev', 'Dev', <DevPageContainer />],
  ['/s/:skillSlug/edit', 'SkillsUpdate', <SkillsUpdatePageContainer />]
].forEach( item =>{
    FlowRouter.route(item[0], {
      name: item[1],
      action() {
        mount(MainLayout, {
          main: item[2]
        })
      }
    })
  })*/


FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      main: <IndexPageContainer />
    })
  }
})
FlowRouter.route('/add-skill', {
  triggersEnter: [checkLoggedIn],
  action() {
    mount(MainLayout, {
      main: <SkillsInsertPage />
    })
  }
})
const skill = FlowRouter.group({
      prefix: '/s/:skillSlug'
  })
  skill.route('/', {
    action() {
      mount(MainLayout, {
        main: <SkillPageContainer />
      })
    }
  })
  skill.route('/edit', {
    triggersEnter: [checkLoggedIn],
    action() {
      mount(MainLayout, {
        main: <SkillsUpdatePageContainer />
      })
    }
  })
  skill.route('/dev', {
    action() {
      mount(MainLayout, {
        main: <DevPageContainer />
      })
    }
  })
FlowRouter.route('/thread/:threadId', {
  action() {
    mount(MainLayout, {
      main: <ThreadPage />
    })
  }
})
FlowRouter.route('/manifest/:manifestId', {
  action() {
    mount(MainLayout, {
      main: <ManifestPage />
    })
  }
})
FlowRouter.route('/scholar/:scholarId', {
  action() {
    mount(MainLayout, {
      main: <ScholarPage />
    })
  }
})
FlowRouter.route('/revision/:revisionId', {
  action() {
    mount(MainLayout, {
      main: <RevisionPage />
    })
  }
})
FlowRouter.route('/docs', {
  action() {
    mount(MainLayout, {
      main: <DocsPage />
    })
  }
})
FlowRouter.route('/admin', {
  name: 'admin',
  triggersEnter: [checkAdmin],
  action() {
    mount(MainLayout, {
      main: <AdminPage />
    })
  }
})
FlowRouter.route('/dashboard', {
  action() {
    mount(MainLayout, {
      main: <DashboardPageContainer />
    })
  }
})
FlowRouter.route('/profile', {
  action() {
    mount(MainLayout, {
      main: <ProfilePage />
    })
  }
})
FlowRouter.route('/profile/:userId', {
  action() {
    mount(MainLayout, {
      main: <ProfilePage />
    })
  }
})
FlowRouter.route('/sign-in', {
  action() {
      FlowRouter.go('/sign-in')
      mount(MainLayout, {
        main: <Blaze template="atForm" />
      })
  }
})
FlowRouter.notFound = {
    action() {
      console.error('Route not found! Redirecting to index page')
      mount(MainLayout, {
          main: <IndexPageContainer />
      })
    }
}

// when user logs out reload page to rerun permission checking
Tracker.autorun(() =>{ if(Session.get('loggedIn')) FlowRouter.reload() })

// this is a must. Otherwise Blaze login templates do not work properly
AccountsTemplates.configureRoute('signIn', {
  action() {
    // TODO: review
    // this is a code dublication (see /sign-in route)
    // change it to FlowRouter.go('/sign-in') ?
    FlowRouter.go('/sign-in')
  }
})



/*
    $urlRouterProvider.otherwise("/")
}]).run(['$rootScope', '$state', function($rootScope, $state) {
    'ngInject'
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('signIn')
        }
    })
}])*/
