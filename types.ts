export enum NotificationType {
  EMAIL = 'EMAIL',
  SMS = 'SMS'
}

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string; // ISO Date string YYYY-MM-DD
  time: string; // HH:MM AM/PM
  type: NotificationType;
  groupName: string;
  recipients: Contact[];
}

export interface Project {
  id: string;
  name: string;
}

export type ViewState = 'NOTIFICATIONS' | 'AGENDA' | 'CALENDAR' | 'REPORTS';