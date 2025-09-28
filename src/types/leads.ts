export type Lead = {
  id: string;
  title: string;        // e.g., "Acme Renewal"
  company?: string;
  value?: number;       // in INR
  owner?: { name: string; avatarUrl?: string };
  updatedAt?: string;   // ISO
  priority?: 'low' | 'medium' | 'high' | 'critical';
  source?: string;
  tags?: string[];
  notes?: string[];
};

export type ColumnId = "new" | "qualified" | "negotiation" | "won" | "lost";

export type Column = {
  id: ColumnId;
  title: string;
  cardIds: string[];
};

export type BoardState = {
  columns: Column[];
  cards: Record<string, Lead>;
};