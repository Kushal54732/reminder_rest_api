export type Reminder = {
      id?: string;
      title: string;
      description: string;
      dueDate?: string;
      isCompleted?: boolean;
    };
    
    export class ReminderDatabase {
      private reminders: Map<string, Reminder> = new Map();
    
      // Creating a reminder
      createReminder(reminder: Partial<Reminder>): string {
            const id = crypto.randomUUID(); // Generate a unique ID
            const newReminder: Reminder = {
              id,
              title: reminder.title!,
              description: reminder.description!,
              dueDate: reminder.dueDate!,
              isCompleted: reminder.isCompleted ?? false, // Default to false if not provided
            };
            this.reminders[id] = newReminder;
            return id;
          }
          
    
      // Get a reminder by ID
      getReminder(id: string): Reminder | undefined {
        return this.reminders.get(id);
      }
    
      // Get all reminders
      getAllReminders(): Reminder[] {
        return Array.from(this.reminders.values());
      }
    
      // Remove a reminder
      removeReminder(id: string): void {
        if (!this.reminders.has(id)) {
          console.log("\nReminder not found\n");
          return;
        }
        this.reminders.delete(id);
        console.log("\nReminder removed successfully\n");
      }
    
      // Update a reminder
      updateReminder(id: string, reminder: Partial<Reminder>): void {
        if (!this.reminders.has(id)) {
          console.log("\nReminder not found\n");
          return;
        }
        const existingReminder = this.reminders.get(id)!;
        const newReminder = { ...existingReminder, ...reminder, id };
        this.reminders.set(id, newReminder);
        console.log("\nReminder updated successfully\n");
      }
    
      // Mark a reminder as completed
      markAsCompleted(id: string): void {
        if (!this.reminders.has(id)) {
          console.log("\nReminder not found\n");
          return;
        }
        const existingReminder = this.reminders.get(id)!;
        existingReminder.isCompleted = true;
        this.reminders.set(id, existingReminder);
        console.log("\nReminder marked as completed\n");
      }
    
      // Mark a reminder as incomplete
      markAsIncomplete(id: string): void {
        if (!this.reminders.has(id)) {
          console.log("\nReminder not found\n");
          return;
        }
        const existingReminder = this.reminders.get(id)!;
        existingReminder.isCompleted = false;
        this.reminders.set(id, existingReminder);
        console.log("\nReminder marked as incomplete\n");
      }
    
      // Get all completed reminders
      getCompletedReminders(): Reminder[] {
        return Array.from(this.reminders.values()).filter(reminder => reminder.isCompleted);
      }
    
      // Get all incomplete reminders
      getIncompleteReminders(): Reminder[] {
        return Array.from(this.reminders.values()).filter(reminder => !reminder.isCompleted);
      }
    
      // Get all past-due reminders
      getPastDueReminders(): Reminder[] {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        return Array.from(this.reminders.values()).filter(reminder => {
          if (!reminder.dueDate) return false;
          return new Date(reminder.dueDate) < today;
        });
      }
    }
    