import express from 'express';
import './config/database.js';
import { Activity, User } from './models/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api', (_request, response) => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;

  response.json({
    service: 'octofit-tracker-api',
    version: '1.0.0',
    baseUrl,
    endpoints: ['/api/health', '/api/users', '/api/activities'],
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api' });
});

app.get('/api/users', async (_request, response) => {
  const users = await User.find().sort({ displayName: 1 }).lean();
  response.json(users);
});

app.get('/api/activities', async (_request, response) => {
  const activities = await Activity.find().sort({ completedAt: -1 }).lean();
  response.json(activities);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
});
