export interface Auction {
  id: string;
  groupCode: string;
  ticketValue: number;
  tenureMonths: number;
  monthNo: number;
  date: string;
  winner?: string;
  discount?: number;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}