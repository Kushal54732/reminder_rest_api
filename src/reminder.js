"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderDatabase = void 0;
class ReminderDatabase {
    constructor() {    git init
        this.reminders = new Map();
    }
    // Creating a reminder
    createReminder(reminder) {
        let id = Math.random().toString(36).substring(2, 11);
        reminder.id = id;
        this.reminders.set(id, Object.assign(Object.assign({}, reminder), { id, isCompleted: false }));
        console.log(`Reminder created successfully with id: ${id}\n`);
        return id;
    }    git init    git init    git add .    git add .
    // Get a reminder by ID
    getReminder(id) {
        return this.reminders.get(id);
    }
    // Get all reminders
    getAllReminders() {
        return Array.from(this.reminders.values());
    }
    // Remove a reminder
    removeReminder(id) {
        if (!this.reminders.has(id)) {
            console.log("\nReminder not found\n");
            return;
        }
        this.reminders.delete(id);
        console.log("\nReminder removed successfully\n");
    }
    // Update a reminder
    updateReminder(id, reminder) {
        if (!this.reminders.has(id)) {
            console.log("\nReminder not found\n");
            return;
        }
        const existingReminder = this.reminders.get(id);
        const newReminder = Object.assign(Object.assign(Object.assign({}, existingReminder), reminder), { id });
        this.reminders.set(id, newReminder);
        console.log("\nReminder updated successfully\n");
    }
    // Mark a reminder as completed
    markAsCompleted(id) {
        if (!this.reminders.has(id)) {
            console.log("\nReminder not found\n");
            return;
        }
        const existingReminder = this.reminders.get(id);
        existingReminder.isCompleted = true;
        this.reminders.set(id, existingReminder);
        console.log("\nReminder marked as completed\n");
    }
    // Mark a reminder as incomplete
    markAsIncomplete(id) {
        if (!this.reminders.has(id)) {
            console.log("\nReminder not found\n");
            return;
        }
        const existingReminder = this.reminders.get(id);
        existingReminder.isCompleted = false;
        this.reminders.set(id, existingReminder);
        console.log("\nReminder marked as incomplete\n");
    }
    // Get all completed reminders
    getCompletedReminders() {
        return Array.from(this.reminders.values()).filter(reminder => reminder.isCompleted);
    }
    // Get all incomplete reminders
    getIncompleteReminders() {
        return Array.from(this.reminders.values()).filter(reminder => !reminder.isCompleted);
    }
    // Get all past-due reminders
    getPastDueReminders() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return Array.from(this.reminders.values()).filter(reminder => {
            if (!reminder.dueDate)
                return false;
            return new Date(reminder.dueDate) < today;
        });
    }
}
exports.ReminderDatabase = ReminderDatabase;
