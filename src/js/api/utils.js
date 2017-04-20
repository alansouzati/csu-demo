import RequestWatcher from './request-watcher';

let _headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export function headers() {
  return _headers;
}

export function parseJSON(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
}

export function updateHeaders(newHeaders) {
  _headers = { ..._headers, newHeaders };
  Object.keys(_headers).forEach((key) => {
    if (undefined === _headers[key]) {
      delete _headers[key];
    }
  });
}

let webSocketUrl;
if (window && window.location) {
  let protocol = 'ws:';
  if (window.location.protocol === 'https:') {
    protocol = 'wss:';
  }
  const host = ((process.env.NODE_ENV === 'development') ?
    'localhost:8102' : `${window.location.host}`);
  webSocketUrl = `${protocol}//${host}`;
}

export const SOCKET_WATCHER = new RequestWatcher({ webSocketUrl });

export const REQUEST_POOL_WATCHER = new RequestWatcher();
