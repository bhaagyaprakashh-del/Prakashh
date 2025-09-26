export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export type NotificationModule = 
  | 'leads' 
  | 'subscribers' 
  | 'agents' 
  | 'chitGroups' 
  | 'hrms' 
  | 'messaging' 
  | 'reports' 
  | 'settings' 
  | 'customization' 
  | 'calendar' 
  | 'tasks' 
  | 'dashboard';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body?: string;
  module?: NotificationModule;
  link?: string;
  createdAt: string;
  read: boolean;
  meta?: Record<string, unknown>;
}

export interface NotificationFilters {
  page?: number;
  size?: number;
  q?: string;
  type?: NotificationType;
  read?: boolean;
  module?: NotificationModule;
}

export interface NotificationListResponse {
  notifications: Notification[];
  total: number;
  page: number;
  size: number;
  hasMore: boolean;
}

export interface NotificationSubscriber {
  (notifications: Notification[]): void;
}

export interface NotificationAdapter {
  list(filters?: NotificationFilters): Promise<NotificationListResponse>;
  markRead(id: string): Promise<void>;
  markUnread(id: string): Promise<void>;
  markAllRead(): Promise<void>;
  push(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<Notification>;
  clearAll(): Promise<void>;
  getUnreadCount(): Promise<number>;
}

// Helper functions
export const createNotification = (
  type: NotificationType,
  title: string,
  options?: {
    body?: string;
    module?: NotificationModule;
    link?: string;
    meta?: Record<string, unknown>;
  }
): Omit<Notification, 'id' | 'createdAt' | 'read'> => {
  return {
    type,
    title,
    body: options?.body,
    module: options?.module,
    link: options?.link,
    meta: options?.meta
  };
};

export const getNotificationIcon = (type: NotificationType): string => {
  switch (type) {
    case 'success': return '✅';
    case 'warning': return '⚠️';
    case 'error': return '❌';
    default: return 'ℹ️';
  }
};

export const getNotificationColor = (type: NotificationType): string => {
  switch (type) {
    case 'success': return 'text-green-600 bg-green-100';
    case 'warning': return 'text-yellow-600 bg-yellow-100';
    case 'error': return 'text-red-600 bg-red-100';
    default: return 'text-blue-600 bg-blue-100';
  }
};

export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
};