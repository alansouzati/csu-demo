const _sessions = {};
const _notifiers = {
  airport: []
};

export const activities = [
  { description: 'Thomas Field aiport has been closed', status: 'critical' },
  { description: 'Lowell Field airport may close soon', status: 'warning' },
];

export const airports = [
  {
    id: '6523',
    type: 'heliport',
    name: 'Total Rf Heliport',
    latitude: 40.07080078125,
    longitude: -74.9336013793945,
    country: 'US',
    state: 'PA',
    city: 'Bensalem'
  },
  {
    id: '6524',
    type: 'small_airport',
    name: 'Lowell Field',
    latitude: 59.94919968,
    longitude: -151.6959991,
    country: 'US',
    state: 'AK',
    city: 'Anchor Point'
  },
  {
    id: '6559',
    type: 'closed',
    name: 'Thomas Field',
    latitude: 40.3778,
    longitude: -77.365303,
    country: 'US',
    state: 'AK',
    city: 'Anchor Point'
  },
  {
    id: '2155',
    type: 'large_airport',
    name: 'Brussels Airport',
    latitude: 50.90140152,
    longitude: 4.48443985,
    country: 'BE',
    state: 'BRU',
    city: 'Brussels'
  },
  {
    id: '2347',
    type: 'medium_airport',
    name: 'Tampere-Pirkkala Airport',
    latitude: 61.41410065,
    longitude: 23.60440063,
    country: 'FI',
    state: 'LS',
    city: 'Tampere'
  },
];

export function addSession(token, data) {
  _sessions[token] = data;
}

export function getSession(token) {
  return _sessions[token];
}

export function addNotifier(type, cb) {
  _notifiers[type].push(cb);
}

export function getActivities(filters) {
  if (filters && Object.keys(filters).length > 0) {
    return Promise.resolve({
      activities: activities.filter(airport =>
        Object.keys(filters).some(
          filter => activities[filter] === activities[filter]
        )
      )
    });
  }
  return Promise.resolve({ activities });
}

export function getAirports(filters) {
  if (filters && Object.keys(filters).length > 0) {
    return Promise.resolve({
      airports: airports.filter(airport =>
        Object.keys(filters).some(filter => airport[filter] === filters[filter])
      )
    });
  }
  return Promise.resolve({ airports });
}

export function getAirport(id) {
  let airport;
  airports.some((t) => {
    if (t.id === id) {
      airport = t;
      return true;
    }
    return false;
  });
  return Promise.resolve({ airport });
}

export default { addNotifier, addSession, getSession, getAirport, getAirports };
