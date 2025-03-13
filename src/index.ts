import { Hono } from 'hono';
import reminders from './routes';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';

const app = new Hono();
app.use('*', cors());
app.route('/api', reminders);

// Start the server
serve({
  fetch: app.fetch,
  port: 3000, // Change the port if needed
});

console.log('Server running on http://localhost:3000');
