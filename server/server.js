import compression from 'compression';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import api from './api';
import { addNotifier, getActivities, getAirports, getAirport } from './data';
import Notifier from './notifier';

const PORT = process.env.PORT || 8102;

const notifier = new Notifier();

addNotifier(
  'airport',
  (airport) => {
    // this can be invoked multiple times as new requests happen
    notifier.test((request) => {
      // we should skip notify if the id of the airport
      // does not match the payload
      if (request.path === '/api/airport/:id' &&
        request.params.id !== airport.id) {
        return false;
      }
      return true;
    });
  }
);

notifier.use('/api/airport', query => getAirports(query));
notifier.use('/api/activity', query => getActivities(query));
notifier.use('/api/airport/:id', param => (
  getAirport(param.id).then((result) => {
    if (!result.airport) {
      return Promise.reject({ statusCode: 404, message: 'Not Found' });
    }
    return Promise.resolve(result);
  })
));

const app = express()
  .use(compression())
  .use(cookieParser())
  .use(morgan('tiny'))
  .use(bodyParser.json());

// REST API
app.use('/api', api);

// UI
app.use('/', express.static(path.join(__dirname, '/../dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '/../dist/index.html')));
});

const server = http.createServer(app);
server.listen(PORT);
notifier.listen(server);

console.log(`Server started at http://localhost:${PORT}`);
