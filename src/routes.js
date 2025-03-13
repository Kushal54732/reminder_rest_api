"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const reminder_1 = require("./reminder");
const app = new hono_1.Hono();
const db = new reminder_1.ReminderDatabase();
// Create a reminder
app.post('/reminders', (c) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield c.req.json();
    const id = db.createReminder(body);
    return c.json({ message: 'Reminder created', id });
}));
// Get all reminders
app.get('/reminders', (c) => {
    return c.json(db.getAllReminders());
});
// Get a reminder by ID
app.get('/reminders/:id', (c) => {
    const id = c.req.param('id');
    const reminder = db.getReminder(id);
    if (!reminder)
        return c.json({ error: 'Reminder not found' }, 404);
    return c.json(reminder);
});
// Update a reminder
app.put('/reminders/:id', (c) => __awaiter(void 0, void 0, void 0, function* () {
    const id = c.req.param('id');
    const body = yield c.req.json();
    db.updateReminder(id, body);
    return c.json({ message: 'Reminder updated' });
}));
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
exports.default = app;
