import React, { useState, useEffect, useCallback } from 'react';
import { LeadCard, ColumnId, KanbanState } from '../../types/lead';
import { KanbanColumn } from './KanbanColumn';
import './kanban.css';

const STORAGE_KEY = 'kanban_leads_v1';

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'new', title: 'New Leads' },
  { id: 'contacted', title: 'Contacted' },
  { id: 'qualified', title: 'Qualified' },
  { id: 'won', title: 'Won' },
  { id: 'lost', title: 'Lost' }
];

const SEED_DATA: LeadCard[] = [
  {
    id: '1',
    name: 'Rajesh Gupta',
    company: 'TechCorp Solutions',
    email: 'rajesh@techcorp.in',
    phone: '+91 98765 43210',
    owner: 'Priya Sharma',
    amount: 250000,
    tags: ['enterprise', 'hot-lead'],
    followUpDate: '2024-01-20',
    priority: 'high'
  },
  {
    id: '2',
    name: 'Anita Desai',
    company: 'Digital Innovations',
    email: 'anita@digitalinno.com',
    phone: '+91 87654 32109',
    owner: 'Amit Kumar',
    amount: 150000,
    tags: ['mid-market', 'qualified'],
    followUpDate: '2024-01-18',
    priority: 'medium'
  },
  {
    id: '3',
    name: 'Vikram Singh',
    company: 'StartupXYZ',
    email: 'vikram@startupxyz.in',
    owner: 'Priya Sharma',
    amount: 75000,
    tags: ['startup', 'demo-scheduled'],
    followUpDate: '2024-01-22',
    priority: 'medium'
  },
  {
    id: '4',
    name: 'Meera Patel',
    company: 'Global Enterprises',
    email: 'meera@globalent.com',
    phone: '+91 76543 21098',
    owner: 'Rohit Verma',
    amount: 500000,
    tags: ['enterprise', 'decision-maker'],
    followUpDate: '2024-01-25',
    priority: 'high'
  },
  {
    id: '5',
    name: 'Suresh Reddy',
    company: 'Local Business Co',
    phone: '+91 65432 10987',
    owner: 'Amit Kumar',
    amount: 50000,
    tags: ['small-business'],
    followUpDate: '2024-01-19',
    priority: 'low'
  }
];

export const KanbanBoard: React.FC = () => {
  const [kanbanState, setKanbanState] = useState<KanbanState>({
    new: [],
    contacted: [],
    qualified: [],
    won: [],
    lost: []
  });

  const [draggedCard, setDraggedCard] = useState<LeadCard | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<ColumnId | null>(null);
  const [dropReadyColumn, setDropReadyColumn] = useState<ColumnId | null>(null);
  const [grabModeCardId, setGrabModeCardId] = useState<string | null>(null);

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setKanbanState(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse saved kanban state:', error);
        seedData();
      }
    } else {
      seedData();
    }
  }, []);

  // Save state to localStorage
  const saveState = useCallback((state: KanbanState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, []);

  // Seed initial data
  const seedData = () => {
    const initialState: KanbanState = {
      new: SEED_DATA.slice(0, 2),
      contacted: SEED_DATA.slice(2, 4),
      qualified: SEED_DATA.slice(4, 5),
      won: [],
      lost: []
    };
    setKanbanState(initialState);
    saveState(initialState);
  };

  // Move card between columns
  const moveCard = useCallback((card: LeadCard, fromColumn: ColumnId, toColumn: ColumnId, toIndex?: number) => {
    setKanbanState(prevState => {
      const newState = { ...prevState };
      
      // Remove from source column
      newState[fromColumn] = newState[fromColumn].filter(c => c.id !== card.id);
      
      // Add to target column
      if (toIndex !== undefined) {
        newState[toColumn].splice(toIndex, 0, card);
      } else {
        newState[toColumn].push(card);
      }
      
      saveState(newState);
      return newState;
    });
  }, [saveState]);

  // Find card's current column
  const findCardColumn = useCallback((cardId: string): ColumnId | null => {
    for (const [columnId, cards] of Object.entries(kanbanState)) {
      if (cards.find(card => card.id === cardId)) {
        return columnId as ColumnId;
      }
    }
    return null;
  }, [kanbanState]);

  // Drag handlers
  const handleCardDragStart = (e: React.DragEvent, card: LeadCard) => {
    const sourceColumn = findCardColumn(card.id);
    if (!sourceColumn) return;

    setDraggedCard(card);
    setDraggedFromColumn(sourceColumn);
    
    e.dataTransfer.setData('text/plain', JSON.stringify({
      cardId: card.id,
      sourceColumn
    }));
    
    // Add dragging class after a brief delay to allow drag image to be captured
    setTimeout(() => {
      const element = e.target as HTMLElement;
      element.classList.add('dragging');
    }, 0);
  };

  const handleCardDragEnd = () => {
    // Remove dragging class from all cards
    document.querySelectorAll('.dragging').forEach(el => {
      el.classList.remove('dragging');
    });
    
    setDraggedCard(null);
    setDraggedFromColumn(null);
    setDropReadyColumn(null);
  };

  const handleColumnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleColumnDrop = (e: React.DragEvent, targetColumn: ColumnId) => {
    e.preventDefault();
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      const { cardId, sourceColumn } = data;
      
      if (sourceColumn === targetColumn) return;
      
      const card = kanbanState[sourceColumn as ColumnId].find(c => c.id === cardId);
      if (card) {
        moveCard(card, sourceColumn, targetColumn);
      }
    } catch (error) {
      console.error('Failed to handle drop:', error);
    }
    
    setDropReadyColumn(null);
  };

  const handleColumnDragEnter = (columnId: ColumnId) => {
    if (draggedFromColumn && draggedFromColumn !== columnId) {
      setDropReadyColumn(columnId);
    }
  };

  const handleColumnDragLeave = () => {
    setDropReadyColumn(null);
  };

  // Keyboard handlers
  const handleCardKeyDown = (e: React.KeyboardEvent, card: LeadCard) => {
    const currentColumn = findCardColumn(card.id);
    if (!currentColumn) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        setGrabModeCardId(grabModeCardId === card.id ? null : card.id);
        break;
        
      case 'Escape':
        e.preventDefault();
        setGrabModeCardId(null);
        break;
        
      case 'ArrowLeft':
        if (e.shiftKey && grabModeCardId === card.id) {
          e.preventDefault();
          const currentIndex = COLUMNS.findIndex(col => col.id === currentColumn);
          if (currentIndex > 0) {
            const targetColumn = COLUMNS[currentIndex - 1].id;
            moveCard(card, currentColumn, targetColumn);
            setGrabModeCardId(null);
          }
        }
        break;
        
      case 'ArrowRight':
        if (e.shiftKey && grabModeCardId === card.id) {
          e.preventDefault();
          const currentIndex = COLUMNS.findIndex(col => col.id === currentColumn);
          if (currentIndex < COLUMNS.length - 1) {
            const targetColumn = COLUMNS[currentIndex + 1].id;
            moveCard(card, currentColumn, targetColumn);
            setGrabModeCardId(null);
          }
        }
        break;
    }
  };

  return (
    <div className="kanban-background">
      <div className="relative z-10 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Leads & Sales Kanban</h1>
          <p className="text-gray-300">
            Drag cards between columns or use keyboard navigation (Enter to grab, Shift+Arrow to move)
          </p>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4">
          {COLUMNS.map(column => (
            <KanbanColumn
              key={column.id}
              columnId={column.id}
              title={column.title}
              cards={kanbanState[column.id]}
              onDragOver={handleColumnDragOver}
              onDrop={handleColumnDrop}
              onDragLeave={handleColumnDragLeave}
              onCardDragStart={handleCardDragStart}
              onCardDragEnd={handleCardDragEnd}
              isDropReady={dropReadyColumn === column.id}
              grabModeCardId={grabModeCardId}
              onCardKeyDown={handleCardKeyDown}
            />
          ))}
        </div>
      </div>
    </div>
  );
};