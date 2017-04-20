import { SOCKET_WATCHER } from './utils';

let activities;

export function watchActivities() {
  activities = SOCKET_WATCHER.watch('/api/activity');
  return activities;
}

export function unwatchActivities() {
  if (activities) {
    activities.stop();
  }
}
