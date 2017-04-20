import { SOCKET_WATCHER } from './utils';

let airportsWatcher;

export function watchAirports() {
  airportsWatcher = SOCKET_WATCHER.watch('/api/airport');
  return airportsWatcher;
}

export function unwatchAirports() {
  if (airportsWatcher) {
    airportsWatcher.stop();
  }
}

const airportWatcher = {};

export function watchAirport(id) {
  airportWatcher[id] = SOCKET_WATCHER.watch(`/api/airport/${id}`);
  return airportWatcher[id];
}

export function unwatchAirport(id) {
  if (airportWatcher[id]) {
    airportWatcher[id].stop();
  }
}
