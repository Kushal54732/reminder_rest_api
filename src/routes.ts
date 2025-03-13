import { Hono } from 'hono';
import { ReminderDatabase, Reminder } from './reminder';

const app = new Hono();
const db = new ReminderDatabase();

// Create a reminder
app.post('/reminders', async (c) => {
  const body: Reminder = await c.req.json();
  const id = db.createReminder(body);
  return c.json({ message: 'Reminder created', id });
});

// Get all reminders
app.get('/reminders', (c) => {
  return c.json(db.getAllReminders());
});

// Get a reminder by ID
app.get('/reminders/:id', (c) => {
  const id = c.req.param('id');
  const reminder = db.getReminder(id);
  if (!reminder) return c.json({ error: 'Reminder not found' }, 404);
  return c.json(reminder);
});

// Update a reminder
app.put('/reminders/:id', async (c) => {
  const id = c.req.param('id');
  const body: Partial<Reminder> = await c.req.json();
  db.updateReminder(id, body);
  return c.json({ message: 'Reminder updated' });
});

// Delete a reminder
app.delete('/reminders/:id', (c) => {
  const id = c.req.param('id');
  db.removeReminder(id);
  return c.json({ message: 'Reminder deleted' });
});

// Mark as completed
app.patch('/reminders/:id/complete', (c) => {
  const id = c.req.param('id');
  db.markAsCompleted(id);
  return c.json({ message: 'Reminder marked as completed' });
});

// Mark as incomplete
app.patch('/reminders/:id/incomplete', (c) => {
  const id = c.req.param('id');
  db.markAsIncomplete(id);
  return c.json({ message: 'Reminder marked as incomplete' });
});

// Get completed reminders
app.get('/reminders/completed', (c) => {
  return c.json(db.getCompletedReminders());
});

// Get incomplete reminders
app.get('/reminders/incomplete', (c) => {
  return c.json(db.getIncompleteReminders());
});

// Get past-due reminders
app.get('/reminders/past-due', (c) => {
  return c.json(db.getPastDueReminders());
});

export default app;
