import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCorners,
  UniqueIdentifier
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  GripVertical,
  User,
  Building,
  Calendar,
  DollarSign,
  Tag,
  Eye,
  Edit,
  Phone,
  Mail,
  Settings,
  Download,
  RefreshCw
} from 'lucide-react';
import { GlassyColumn, GlassyCard } from '../../components/ui/Glassy';
import { useLeadsKanban } from './useLeadsKanban';
import { Lead, ColumnId } from '../../types/leads';

interface SortableCardProps {
  lead: Lead;
  formatCurrency: (amount: number) => string;
  formatRelativeTime: (date: string) => string;
}

const SortableCard: React.FC<SortableCardProps> = ({ lead, formatCurrency, formatRelativeTime }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <GlassyCard isDragging={isDragging} className="group cursor-pointer">
        <div className="flex items-start space-x-3">
          {/* Drag Handle */}
          <button
            {...listeners}
            className="mt-1 p-1 text-white/40 hover:text-white/60 focus:text-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded transition-colors"
            aria-label={`Drag ${lead.title}`}
            aria-grabbed={isDragging}
          >
            <GripVertical className="h-4 w-4" />
          </button>

          {/* Card Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-white font-medium text-sm leading-tight truncate pr-2">
                {lead.title}
              </h4>
              <button className="p-1 text-white/40 hover:text-white/60 rounded opacity-0 group-hover:opacity-100 transition-all">
                <MoreVertical className="h-3 w-3" />
              </button>
            </div>

            {lead.company && (
              <div className="flex items-center text-white/70 text-xs mb-2">
                <Building className="h-3 w-3 mr-1" />
                <span className="truncate">{lead.company}</span>
              </div>
            )}

            {lead.value && (
              <div className="text-green-300 font-semibold text-sm mb-2">
                {formatCurrency(lead.value)}
              </div>
            )}

            <div className="flex items-center justify-between">
              {/* Owner */}
              <div className="flex items-center space-x-2">
                {lead.owner?.avatarUrl ? (
                  <img
                    src={lead.owner.avatarUrl}
                    alt={lead.owner.name}
                    className="w-6 h-6 rounded-full border border-white/20"
                  />
                ) : (
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-medium border border-white/20">
                    {lead.owner?.name?.split(' ').map(n => n[0]).join('') || '?'}
                  </div>
                )}
                <span className="text-white/70 text-xs truncate">
                  {lead.owner?.name || 'Unassigned'}
                </span>
              </div>

              {/* Priority Badge */}
              {lead.priority && (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(lead.priority)}`}>
                  {lead.priority}
                </span>
              )}
            </div>

            {/* Updated At */}
            {lead.updatedAt && (
              <div className="flex items-center text-white/50 text-xs mt-2">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formatRelativeTime(lead.updatedAt)}</span>
              </div>
            )}

            {/* Tags */}
            {lead.tags && lead.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {lead.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    #{tag}
                  </span>
                ))}
                {lead.tags.length > 2 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white/10 text-white/60 border border-white/20">
                    +{lead.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </GlassyCard>
    </div>
  );
};

interface KanbanColumnProps {
  column: { id: ColumnId; title: string; cardIds: string[] };
  leads: Lead[];
  getColumnStats: (columnId: ColumnId) => { count: number; totalValue: number };
  formatCurrency: (amount: number) => string;
  formatRelativeTime: (date: string) => string;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  leads,
  getColumnStats,
  formatCurrency,
  formatRelativeTime
}) => {
  const stats = getColumnStats(column.id);

  return (
    <div className="flex-shrink-0 w-80 h-full">
      <GlassyColumn className="h-full flex flex-col p-4">
        {/* Column Header */}
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold text-lg">{column.title}</h3>
            <p className="text-white/60 text-sm">
              {stats.count} leads • {formatCurrency(stats.totalValue)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm font-medium border border-white/20">
              {stats.count}
            </span>
            <button className="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-all">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Cards Container */}
        <SortableContext items={column.cardIds} strategy={verticalListSortingStrategy}>
          <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin" role="region" aria-label={`${column.title} leads`}>
            {leads.length > 0 ? (
              leads.map((lead) => (
                <SortableCard
                  key={lead.id}
                  lead={lead}
                  formatCurrency={formatCurrency}
                  formatRelativeTime={formatRelativeTime}
                />
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/5 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Plus className="h-6 w-6 text-white/40" />
                  </div>
                  <p className="text-white/60 text-sm">Drag leads here</p>
                  <p className="text-white/40 text-xs mt-1">or click + to add new</p>
                </div>
              </div>
            )}
          </div>
        </SortableContext>
      </GlassyColumn>
    </div>
  );
};

const LeadCard: React.FC<{ lead: Lead; formatCurrency: (amount: number) => string; formatRelativeTime: (date: string) => string }> = ({ 
  lead, 
  formatCurrency, 
  formatRelativeTime 
}) => {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <GlassyCard className="group cursor-pointer">
      <div className="flex items-start space-x-3">
        <GripVertical className="h-4 w-4 text-white/40 mt-1" />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-white font-medium text-sm leading-tight truncate pr-2">
              {lead.title}
            </h4>
            <button className="p-1 text-white/40 hover:text-white/60 rounded opacity-0 group-hover:opacity-100 transition-all">
              <MoreVertical className="h-3 w-3" />
            </button>
          </div>

          {lead.company && (
            <div className="flex items-center text-white/70 text-xs mb-2">
              <Building className="h-3 w-3 mr-1" />
              <span className="truncate">{lead.company}</span>
            </div>
          )}

          {lead.value && (
            <div className="text-green-300 font-semibold text-sm mb-2">
              {formatCurrency(lead.value)}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {lead.owner?.avatarUrl ? (
                <img
                  src={lead.owner.avatarUrl}
                  alt={lead.owner.name}
                  className="w-6 h-6 rounded-full border border-white/20"
                />
              ) : (
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-medium border border-white/20">
                  {lead.owner?.name?.split(' ').map(n => n[0]).join('') || '?'}
                </div>
              )}
              <span className="text-white/70 text-xs truncate">
                {lead.owner?.name || 'Unassigned'}
              </span>
            </div>

            {lead.priority && (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(lead.priority)}`}>
                {lead.priority}
              </span>
            )}
          </div>

          {lead.updatedAt && (
            <div className="flex items-center text-white/50 text-xs mt-2">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatRelativeTime(lead.updatedAt)}</span>
            </div>
          )}
        </div>
      </div>
    </GlassyCard>
  );
};

export const LeadsKanban: React.FC = () => {
  const {
    boardState,
    moveCard,
    reorderCards,
    getColumnStats,
    formatCurrency,
    formatRelativeTime
  } = useLeadsKanban();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the columns
    const activeColumn = boardState.columns.find(col => col.cardIds.includes(activeId));
    const overColumn = boardState.columns.find(col => 
      col.cardIds.includes(overId) || col.id === overId
    );

    if (!activeColumn || !overColumn) return;
    if (activeColumn.id === overColumn.id) return;

    // Move card between columns
    const activeIndex = activeColumn.cardIds.indexOf(activeId);
    const overIndex = overColumn.cardIds.includes(overId) 
      ? overColumn.cardIds.indexOf(overId)
      : overColumn.cardIds.length;

    moveCard(activeId, activeColumn.id, overColumn.id, overIndex);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = boardState.columns.find(col => col.cardIds.includes(activeId));
    const overColumn = boardState.columns.find(col => 
      col.cardIds.includes(overId) || col.id === overId
    );

    if (!activeColumn || !overColumn) return;

    if (activeColumn.id === overColumn.id) {
      // Reordering within the same column
      const oldIndex = activeColumn.cardIds.indexOf(activeId);
      const newIndex = activeColumn.cardIds.indexOf(overId);

      if (oldIndex !== newIndex) {
        const newCardIds = [...activeColumn.cardIds];
        newCardIds.splice(oldIndex, 1);
        newCardIds.splice(newIndex, 0, activeId);
        reorderCards(activeColumn.id, newCardIds);
      }
    }
  };

  // Filter leads based on search term
  const filteredCards = Object.values(boardState.cards).filter(lead =>
    !searchTerm || 
    lead.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.owner?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pipeline value
  const totalPipelineValue = Object.values(boardState.cards)
    .filter(lead => !['won', 'lost'].includes(getLeadColumn(lead.id)))
    .reduce((sum, lead) => sum + (lead.value || 0), 0);

  const totalWonValue = boardState.columns
    .find(col => col.id === 'won')?.cardIds
    .reduce((sum, cardId) => sum + (boardState.cards[cardId]?.value || 0), 0) || 0;

  function getLeadColumn(leadId: string): ColumnId {
    const column = boardState.columns.find(col => col.cardIds.includes(leadId));
    return column?.id || 'new';
  }

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Leads Pipeline (Kanban)</h1>
          <p className="mt-1 text-sm text-slate-400">
            Visual pipeline management with drag-and-drop workflow
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Pipeline Stats */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="text-slate-300">
              Pipeline: <span className="font-semibold text-blue-400">{formatCurrency(totalPipelineValue)}</span>
            </div>
            <div className="text-slate-300">
              Won: <span className="font-semibold text-green-400">{formatCurrency(totalWonValue)}</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
              <Settings className="h-4 w-4 mr-2" />
              Board Settings
            </button>
            <button 
              onClick={() => window.location.href = '/leads-new'}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 border-b border-yellow-400/30 bg-slate-800/40 backdrop-blur-xl flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            />
          </div>
          
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex space-x-6 h-full min-w-max">
            {boardState.columns.map((column) => {
              const columnLeads = column.cardIds
                .map(id => boardState.cards[id])
                .filter(Boolean)
                .filter(lead => 
                  !searchTerm || 
                  lead.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lead.owner?.name?.toLowerCase().includes(searchTerm.toLowerCase())
                );

              return (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  leads={columnLeads}
                  getColumnStats={getColumnStats}
                  formatCurrency={formatCurrency}
                  formatRelativeTime={formatRelativeTime}
                />
              );
            })}
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeId ? (
              <LeadCard
                lead={boardState.cards[activeId as string]}
                formatCurrency={formatCurrency}
                formatRelativeTime={formatRelativeTime}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};