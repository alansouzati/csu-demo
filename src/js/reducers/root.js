import { combineReducers } from 'redux';

import activities from './activities';
import airports from './airports';
import nav from './nav';
import session from './session';

export default combineReducers({
  activities,
  airports,
  nav,
  session
});
