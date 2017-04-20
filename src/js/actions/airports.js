import {
  AIRPORTS_LOAD, AIRPORTS_UNLOAD, AIRPORT_LOAD, AIRPORT_UNLOAD
} from '../actions';
import {
  watchAirports, unwatchAirports, watchAirport, unwatchAirport
} from '../api/airports';

export function loadAirports() {
  return dispatch => (
    watchAirports()
      .on('success',
        payload => dispatch({ type: AIRPORTS_LOAD, payload })
      )
      .on('error',
        payload => dispatch({ type: AIRPORTS_LOAD, error: true, payload })
      )
      .start()
  );
}

export function unloadAirports() {
  unwatchAirports();
  return { type: AIRPORTS_UNLOAD };
}

export function loadAirport(id) {
  return dispatch => (
    watchAirport(id)
      .on('success',
        payload => dispatch({ type: AIRPORT_LOAD, payload })
      )
      .on('error',
        payload => dispatch({ type: AIRPORT_LOAD, error: true, payload })
      )
      .start()
  );
}

export function unloadAirport(id) {
  unwatchAirport(id);
  return { type: AIRPORT_UNLOAD };
}
