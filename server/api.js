import express from 'express';
import { addSession, getActivities, getAirports, getAirport } from './data';

const router = express.Router();

router.post('/sessions', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email === 'error') {
    res.statusMessage = 'Invalid email or password';
    res.status(401).end();
  } else {
    const name = email.split('@')[0].replace(/\.|_/, ' '); // simulated
    const now = new Date();
    const token = `token-${now.getTime()}`; // simulated
    const session = { email, name, token };
    addSession(token, session);
    res.json(session);
  }
});

router.get('/airport', (req, res) => {
  getAirports(req.query).then(airports => res.json(airports));
});

router.get('/activity', (req, res) => {
  getActivities(req.query).then(activities => res.json(activities));
});

router.get('/airport/:id', (req, res) => {
  getAirport(req.params.id).then((result) => {
    if (!result.airport) {
      res.status(404).end();
    } else {
      res.json(result);
    }
  });
});

router.delete('/sessions/*', (req, res) => {
  res.json(undefined);
});

export default router;
