import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

export type NotificationChannel =
  | 'data_sync'
  | 'contact_reminders'
  | 'task_updates'
  | 'network_growth'
  | 'app_updates_and_tips'
  | 'feedback_and_surveys'
  | 'daily_digest';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor() {}

  async createChannels() {
    await LocalNotifications.createChannel({
      id: 'data_sync',
      name: 'Data Sync Channel',
      description:
        'To inform you about the status of data synchronization with cloud services. This channel is critical for ensuring your are aware of successful syncs or if any issues need your attention, keeping your CRM data up-to-date across devices.',
      importance: 5,
      visibility: 1,
    });

    await LocalNotifications.createChannel({
      id: 'contact_reminders',
      name: 'Contact Reminders Channel',
      description:
        'To remind your of upcoming birthdays, anniversaries, or scheduled calls/meetings with your contacts. This channel helps your maintain your personal and professional relationships by never missing important dates or events.',
      importance: 5,
      visibility: 1,
    });

    await LocalNotifications.createChannel({
      id: 'task_updates',
      name: 'Task Updates Channel',
      description:
        'To notify your about updates related to your tasks. This could include reminders for task deadlines, changes in task priorities, or notifications when tasks are due soon. It ensures your stay on top of their responsibilities.',
      importance: 5,
      visibility: 1,
    });

    await LocalNotifications.createChannel({
      id: 'network_growth',
      name: 'Network Growth Channel',
      description:
        'To alert your when there are opportunities to grow your network. This could include suggestions to connect with new contacts, reminders to follow up on introductions, or updates on networking events.',
      importance: 5,
      visibility: 1,
    });

    await LocalNotifications.createChannel({
      id: 'app_updates_and_tips',
      name: 'App Updates and Tips',
      description:
        'To keep you informed about new features, updates, and usage tips for Noble. This channel can help you get the most out of the app by educating you on tools and features that may enhance your productivity.',
      importance: 5,
      visibility: 1,
    });

    await LocalNotifications.createChannel({
      id: 'feedback_and_surveys',
      name: 'Feedback and Surveys',
      description:
        'To invite you to provide feedback on the application or participate in surveys. This channel is vital for engaging with you and gathering insights that can drive improvements and new features.',
      importance: 5,
      visibility: 1,
    });

    await LocalNotifications.createChannel({
      id: 'daily_digest',
      name: 'Daily Digest',
      description:
        'To offer you a daily summary of your activities, including new contact requests, task completions, and upcoming events. This channel provides a consolidated view of important information, helping you start their day with a clear overview of their priorities.',
      importance: 5,
      visibility: 1,
    });
  }

  async requestPermission() {
    const permission = await LocalNotifications.requestPermissions();
    return permission;
  }

  async scheduleNotification(
    channelId: NotificationChannel,
    title: string,
    body: string
  ) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: new Date().getTime() | 0,
          // schedule: { at: new Date(Date.now() + 1000 * 5) }, // Schedule for 5 seconds from now
          // sound: null,
          // attachments: null,
          // actionTypeId: "",
          // extra: null,
          autoCancel: true,
          channelId,
        },
      ],
    });
  }
}
