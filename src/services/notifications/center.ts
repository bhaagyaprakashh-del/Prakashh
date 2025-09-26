import { Notification, NotificationAdapter, NotificationSubscriber } from './types';
import { LocalNotificationAdapter } from './adapter';

export class NotificationCenter {
  private adapter: NotificationAdapter;
  private subscribers: Set<NotificationSubscriber> = new Set();
  private cache: Notification[] = [];
  private pollingInterval: number | null = null;

  constructor(adapter?: NotificationAdapter) {
    this.adapter = adapter || new LocalNotificationAdapter();
    this.loadCache();
  }

  private async loadCache(): Promise<void> {
    try {
      const response = await this.adapter.list({ size: 100 });
      this.cache = response.notifications;
      this.notifySubscribers();
    } catch (error) {
      console.error('Failed to load notifications cache:', error);
    }
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(subscriber => {
      try {
        subscriber(this.cache);
      } catch (error) {
        console.error('Error notifying subscriber:', error);
      }
    });
  }

  subscribe(subscriber: NotificationSubscriber): () => void {
    this.subscribers.add(subscriber);
    
    // Immediately notify with current cache
    subscriber(this.cache);
    
    // Return unsubscribe function
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  async getNotifications(filters?: any) {
    return this.adapter.list(filters);
  }

  async markRead(id: string): Promise<void> {
    await this.adapter.markRead(id);
    
    // Update cache
    const notification = this.cache.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      this.notifySubscribers();
    }
  }

  async markUnread(id: string): Promise<void> {
    await this.adapter.markUnread(id);
    
    // Update cache
    const notification = this.cache.find(n => n.id === id);
    if (notification) {
      notification.read = false;
      this.notifySubscribers();
    }
  }

  async markAllRead(): Promise<void> {
    await this.adapter.markAllRead();
    
    // Update cache
    this.cache.forEach(n => n.read = true);
    this.notifySubscribers();
  }

  async push(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<Notification> {
    const newNotification = await this.adapter.push(notification);
    
    // Update cache
    this.cache.unshift(newNotification);
    this.notifySubscribers();
    
    return newNotification;
  }

  async clearAll(): Promise<void> {
    await this.adapter.clearAll();
    
    // Clear cache
    this.cache = [];
    this.notifySubscribers();
  }

  getUnreadCount(): number {
    return this.cache.filter(n => !n.read).length;
  }

  startPolling(intervalMs: number = 30000): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }

    this.pollingInterval = window.setInterval(async () => {
      try {
        // In a real app, this would check for new notifications from the server
        // For now, we'll occasionally add a sample notification for demo purposes
        const shouldAddSample = Math.random() < 0.1; // 10% chance
        
        if (shouldAddSample && this.cache.length < 20) {
          const sampleNotifications = [
            {
              type: 'info' as const,
              title: 'System Update',
              body: 'System maintenance completed successfully',
              module: 'dashboard' as const
            },
            {
              type: 'success' as const,
              title: 'Payment Received',
              body: 'Payment of ₹10,000 received from subscriber',
              module: 'subscribers' as const,
              link: '/subscribers/payments'
            },
            {
              type: 'warning' as const,
              title: 'Low Balance Alert',
              body: 'Account balance is running low',
              module: 'dashboard' as const
            }
          ];
          
          const randomNotification = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
          await this.push(randomNotification);
        }
        
        // Refresh cache periodically
        await this.loadCache();
      } catch (error) {
        console.error('Error during notification polling:', error);
      }
    }, intervalMs);
  }

  stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  // Event integration methods
  onLeadCreated(leadTitle: string, leadId: string): void {
    this.push({
      type: 'success',
      title: 'New Lead Created',
      body: `Lead "${leadTitle}" has been added to the pipeline`,
      module: 'leads',
      link: `/leads/360/${leadId}`
    });
  }

  onAttendanceMarked(employeeName: string): void {
    this.push({
      type: 'info',
      title: 'Attendance Recorded',
      body: `Attendance marked for ${employeeName}`,
      module: 'hrms'
    });
  }

  onCampaignScheduled(campaignName: string): void {
    this.push({
      type: 'success',
      title: 'Campaign Scheduled',
      body: `Campaign "${campaignName}" has been scheduled`,
      module: 'messaging',
      link: '/messaging/campaigns'
    });
  }

  onReportGenerated(reportName: string): void {
    this.push({
      type: 'info',
      title: 'Report Generated',
      body: `Report "${reportName}" is ready for download`,
      module: 'reports',
      link: '/reports/dashboard'
    });
  }

  onPaymentOverdue(subscriberName: string, amount: number): void {
    this.push({
      type: 'warning',
      title: 'Payment Overdue',
      body: `${subscriberName} has an overdue payment of ₹${amount.toLocaleString()}`,
      module: 'subscribers',
      link: '/subscribers/payments'
    });
  }
}

// Global instance
export const notificationCenter = new NotificationCenter();

// Initialize with seed data if needed
if (notificationCenter['adapter'] instanceof LocalNotificationAdapter) {
  (notificationCenter['adapter'] as LocalNotificationAdapter).seedIfEmpty();
}