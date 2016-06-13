/*import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});*/
import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
})
