import { useState, useEffect, useCallback } from 'react';
import { BoardState, Lead, ColumnId } from '../../types/leads';

const STORAGE_KEY = 'leads.kanban.v1';

// Sample leads data
const sampleLeads: Lead[] = [
  {
    id: '1',
    title: 'TechCorp Premium Scheme',
    company: 'TechCorp Solutions',
    value: 500000,
    owner: { name: 'Priya Sharma' },
    updatedAt: '2024-03-15T10:30:00Z',
    priority: 'high',
    source: 'website'
  },
  {
    id: '2',
    title: 'Individual Silver Plan',
    company: 'Sunita Reddy',
    value: 100000,
    owner: { name: 'Karthik Nair' },
    updatedAt: '2024-03-14T14:20:00Z',
    priority: 'medium',
    source: 'referral'
  },
  {
    id: '3',
    title: 'StartupInc Growth Package',
    company: 'StartupInc',
    value: 250000,
    owner: { name: 'Priya Sharma' },
    updatedAt: '2024-03-13T16:45:00Z',
    priority: 'high',
    source: 'cold-call'
  },
  {
    id: '4',
    title: 'Manufacturing Corporate Deal',
    company: 'Manufacturing Ltd',
    value: 750000,
    owner: { name: 'Vikram Singh' },
    updatedAt: '2024-03-12T11:15:00Z',
    priority: 'critical',
    source: 'social-media'
  },
  {
    id: '5',
    title: 'Retail Chain Enterprise',
    company: 'Retail Chain Pvt Ltd',
    value: 1000000,
    owner: { name: 'Rajesh Kumar' },
    updatedAt: '2024-03-10T09:30:00Z',
    priority: 'critical',
    source: 'advertisement'
  },
  {
    id: '6',
    title: 'Business Consultancy Deal',
    company: 'Business Consultancy',
    value: 300000,
    owner: { name: 'Priya Sharma' },
    updatedAt: '2024-03-08T13:20:00Z',
    priority: 'high',
    source: 'referral'
  },
  {
    id: '7',
    title: 'Construction Co Project',
    company: 'Construction Co',
    value: 150000,
    owner: { name: 'Karthik Nair' },
    updatedAt: '2024-03-07T15:10:00Z',
    priority: 'low',
    source: 'website'
  },
  {
    id: '8',
    title: 'Healthcare Solutions',
    company: 'Healthcare Inc',
    value: 400000,
    owner: { name: 'Vikram Singh' },
    updatedAt: '2024-03-06T12:45:00Z',
    priority: 'medium',
    source: 'cold-call'
  },
  {
    id: '9',
    title: 'Education Institute Plan',
    company: 'Education Institute',
    value: 200000,
    owner: { name: 'Priya Sharma' },
    updatedAt: '2024-03-05T10:00:00Z',
    priority: 'medium',
    source: 'referral'
  },
  {
    id: '10',
    title: 'Logistics Partnership',
    company: 'Logistics Corp',
    value: 80000,
    owner: { name: 'Karthik Nair' },
    updatedAt: '2024-03-04T14:30:00Z',
    priority: 'low',
    source: 'advertisement'
  }
];

const defaultBoardState: BoardState = {
  columns: [
    { id: 'new', title: 'New', cardIds: ['1', '2'] },
    { id: 'qualified', title: 'Qualified', cardIds: ['3', '7'] },
    { id: 'negotiation', title: 'Negotiation', cardIds: ['4', '5'] },
    { id: 'won', title: 'Won', cardIds: ['6'] },
    { id: 'lost', title: 'Lost', cardIds: ['8', '9', '10'] }
  ],
  cards: sampleLeads.reduce((acc, lead) => {
    acc[lead.id] = lead;
    return acc;
  }, {} as Record<string, Lead>)
};

let saveTimeout: NodeJS.Timeout | null = null;

export const useLeadsKanban = () => {
  const [boardState, setBoardState] = useState<BoardState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultBoardState;
    } catch (error) {
      console.error('Failed to load kanban state:', error);
      return defaultBoardState;
    }
  });

  // Debounced save to localStorage
  const debouncedSave = useCallback((state: BoardState) => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save kanban state:', error);
      }
    }, 250);
  }, []);

  // Save to localStorage whenever board state changes
  useEffect(() => {
    debouncedSave(boardState);
  }, [boardState, debouncedSave]);

  const moveCard = useCallback((cardId: string, fromColumnId: ColumnId, toColumnId: ColumnId, newIndex: number) => {
    setBoardState(prevState => {
      const newState = { ...prevState };
      
      // Remove card from source column
      const fromColumn = newState.columns.find(col => col.id === fromColumnId);
      if (fromColumn) {
        fromColumn.cardIds = fromColumn.cardIds.filter(id => id !== cardId);
      }
      
      // Add card to destination column at specified index
      const toColumn = newState.columns.find(col => col.id === toColumnId);
      if (toColumn) {
        toColumn.cardIds.splice(newIndex, 0, cardId);
      }
      
      return newState;
    });
  }, []);

  const reorderCards = useCallback((columnId: ColumnId, cardIds: string[]) => {
    setBoardState(prevState => {
      const newState = { ...prevState };
      const column = newState.columns.find(col => col.id === columnId);
      if (column) {
        column.cardIds = cardIds;
      }
      return newState;
    });
  }, []);

  const addCard = useCallback((card: Lead, columnId: ColumnId) => {
    setBoardState(prevState => {
      const newState = { ...prevState };
      
      // Add card to cards record
      newState.cards[card.id] = card;
      
      // Add card ID to column
      const column = newState.columns.find(col => col.id === columnId);
      if (column) {
        column.cardIds.unshift(card.id); // Add to beginning
      }
      
      return newState;
    });
  }, []);

  const updateCard = useCallback((cardId: string, updates: Partial<Lead>) => {
    setBoardState(prevState => {
      const newState = { ...prevState };
      if (newState.cards[cardId]) {
        newState.cards[cardId] = {
          ...newState.cards[cardId],
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      return newState;
    });
  }, []);

  const deleteCard = useCallback((cardId: string) => {
    setBoardState(prevState => {
      const newState = { ...prevState };
      
      // Remove from cards
      delete newState.cards[cardId];
      
      // Remove from all columns
      newState.columns.forEach(column => {
        column.cardIds = column.cardIds.filter(id => id !== cardId);
      });
      
      return newState;
    });
  }, []);

  const getColumnStats = useCallback((columnId: ColumnId) => {
    const column = boardState.columns.find(col => col.id === columnId);
    if (!column) return { count: 0, totalValue: 0 };
    
    const cards = column.cardIds.map(id => boardState.cards[id]).filter(Boolean);
    const totalValue = cards.reduce((sum, card) => sum + (card.value || 0), 0);
    
    return {
      count: cards.length,
      totalValue
    };
  }, [boardState]);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  const formatRelativeTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  }, []);

  return {
    boardState,
    moveCard,
    reorderCards,
    addCard,
    updateCard,
    deleteCard,
    getColumnStats,
    formatCurrency,
    formatRelativeTime
  };
};