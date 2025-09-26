export interface LeadCard {
  id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  owner?: string;
  amount?: number;
  tags?: string[];
  followUpDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

export type ColumnId = 'new' | 'contacted' | 'qualified' | 'won' | 'lost';
export type KanbanState = Record<ColumnId, LeadCard[]>;