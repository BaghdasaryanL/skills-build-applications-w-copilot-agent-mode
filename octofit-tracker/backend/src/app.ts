import express from 'express';
import { frontendOrigin } from './config/api.js';
import { Activity } from './models/activity.js';
import { LeaderboardEntry } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';

const app = express();

app.use(express.json());
app.use((request, response, next) => {
  if (request.headers.origin === frontendOrigin) {
    response.setHeader('Access-Control-Allow-Origin', frontendOrigin);
    response.setHeader('Vary', 'Origin');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().populate('teamId').sort({ name: 1 }).lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').sort({ name: 1 }).lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(
    await Activity.find()
      .populate('userId', 'name email')
      .sort({ date: -1 })
      .lean(),
  );
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(
    await LeaderboardEntry.find()
      .populate('userId', 'name email')
      .sort({ points: -1, rank: 1 })
      .lean(),
  );
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }).lean());
});

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
});

export default app;
