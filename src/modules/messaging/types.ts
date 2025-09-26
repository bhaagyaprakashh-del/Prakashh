export type Channel = 'email' | 'sms' | 'whatsapp';

export type Broadcast = {
  id: string;
  title: string;
  message: string;
  channels: Channel[];
  segment: string;
  scheduledAt?: string;
  createdAt: string;
  status: 'draft' | 'scheduled' | 'sent';
};

export type TawkConfig = {
  propertyId: string;
  widgetId: string;
};