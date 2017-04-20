import {
  ACTIVITIES_LOAD, ACTIVITIES_UNLOAD
} from '../actions';
import {
  watchActivities, unwatchActivities
} from '../api/activities';

export function loadActivities() {
  return dispatch => (
    watchActivities()
      .on('success',
        payload => dispatch({ type: ACTIVITIES_LOAD, payload })
      )
      .on('error',
        payload => dispatch({ type: ACTIVITIES_LOAD, error: true, payload })
      )
      .start()
  );
}

export function unloadActivities() {
  unwatchActivities();
  return { type: ACTIVITIES_UNLOAD };
}
