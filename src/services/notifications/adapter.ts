import { 
  Notification, 
  NotificationAdapter, 
  NotificationFilters, 
  NotificationListResponse 
} from './types';

const STORAGE_KEY = 'notifications_v1';

export class LocalNotificationAdapter implements NotificationAdapter {
  private getAll(): Notification[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveAll(notifications: Notification[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }

  async list(filters: NotificationFilters = {}): Promise<NotificationListResponse> {
    const { page = 1, size = 20, q, type, read, module } = filters;
    let notifications = this.getAll();

    // Apply filters
    if (q) {
      const query = q.toLowerCase();
      notifications = notifications.filter(n => 
        n.title.toLowerCase().includes(query) ||
        (n.body && n.body.toLowerCase().includes(query))
      );
    }

    if (type) {
      notifications = notifications.filter(n => n.type === type);
    }

    if (read !== undefined) {
      notifications = notifications.filter(n => n.read === read);
    }

    if (module) {
      notifications = notifications.filter(n => n.module === module);
    }

    // Sort by creation date (newest first)
    notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Pagination
    const total = notifications.length;
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedNotifications = notifications.slice(startIndex, endIndex);

    return {
      notifications: paginatedNotifications,
      total,
      page,
      size,
      hasMore: endIndex < total
    };
  }

  async markRead(id: string): Promise<void> {
    const notifications = this.getAll();
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      this.saveAll(notifications);
    }
  }

  async markUnread(id: string): Promise<void> {
    const notifications = this.getAll();
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      notification.read = false;
      this.saveAll(notifications);
    }
  }

  async markAllRead(): Promise<void> {
    const notifications = this.getAll();
    notifications.forEach(n => n.read = true);
    this.saveAll(notifications);
  }

  async push(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      read: false
    };

    const notifications = this.getAll();
    notifications.unshift(newNotification);
    this.saveAll(notifications);

    return newNotification;
  }

  async clearAll(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  }

  async getUnreadCount(): Promise<number> {
    const notifications = this.getAll();
    return notifications.filter(n => !n.read).length;
  }

  // Seed initial data if empty
  seedIfEmpty(): void {
    const existing = this.getAll();
    if (existing.length > 0) return;

    const seedNotifications: Omit<Notification, 'id' | 'createdAt' | 'read'>[] = [
      {
        type: 'warning',
        title: 'Overdue Payment Alert',
        body: 'Subscriber SUB001 has an overdue payment of ₹5,000',
        module: 'subscribers',
        link: '/subscribers/360/1'
      },
      {
        type: 'success',
        title: 'New Lead Created',
        body: 'Lead "Rajesh Gupta - TechCorp" has been added to the pipeline',
        module: 'leads',
        link: '/leads/360/1'
      },
      {
        type: 'info',
        title: 'New Subscriber Registered',
        body: 'Anita Desai has successfully registered for RC-25-A group',
        module: 'subscribers',
        link: '/subscribers/360/2'
      },
      {
        type: 'success',
        title: 'Auction Scheduled',
        body: 'Monthly auction for RC-50-B group scheduled for tomorrow',
        module: 'chitGroups',
        link: '/chit/auctions'
      },
      {
        type: 'info',
        title: 'Payroll Generated',
        body: 'Monthly payroll for December 2024 has been processed',
        module: 'hrms',
        link: '/hrms/payroll'
      }
    ];

    seedNotifications.forEach(notification => {
      this.push(notification);
    });
  }
}

// REST API adapter for future use
export class RestNotificationAdapter implements NotificationAdapter {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async list(filters: NotificationFilters = {}): Promise<NotificationListResponse> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    });

    const response = await fetch(`${this.baseUrl}/notifications?${params}`);
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return response.json();
  }

  async markRead(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/notifications/${id}/read`, {
      method: 'PATCH'
    });
    if (!response.ok) throw new Error('Failed to mark notification as read');
  }

  async markUnread(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/notifications/${id}/unread`, {
      method: 'PATCH'
    });
    if (!response.ok) throw new Error('Failed to mark notification as unread');
  }

  async markAllRead(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/notifications/mark-all-read`, {
      method: 'PATCH'
    });
    if (!response.ok) throw new Error('Failed to mark all notifications as read');
  }

  async push(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<Notification> {
    const response = await fetch(`${this.baseUrl}/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification)
    });
    if (!response.ok) throw new Error('Failed to create notification');
    return response.json();
  }

  async clearAll(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/notifications`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to clear notifications');
  }

  async getUnreadCount(): Promise<number> {
    const response = await fetch(`${this.baseUrl}/notifications/unread-count`);
    if (!response.ok) throw new Error('Failed to get unread count');
    const data = await response.json();
    return data.count;
  }
}