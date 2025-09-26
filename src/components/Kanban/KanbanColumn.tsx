import React from 'react';
import { LeadCard, ColumnId } from '../../types/lead';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  columnId: ColumnId;
  title: string;
  cards: LeadCard[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: ColumnId) => void;
  onDragLeave: () => void;
  onCardDragStart: (e: React.DragEvent, card: LeadCard) => void;
  onCardDragEnd: () => void;
  isDropReady: boolean;
  grabModeCardId?: string;
  onCardKeyDown: (e: React.KeyboardEvent, card: LeadCard) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  columnId,
  title,
  cards,
  onDragOver,
  onDrop,
  onDragLeave,
  onCardDragStart,
  onCardDragEnd,
  isDropReady,
  grabModeCardId,
  onCardKeyDown
}) => {
  const totalAmount = cards.reduce((sum, card) => sum + (card.amount || 0), 0);

  const formatAmount = (amount: number) => {
    if (amount === 0) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      notation: 'compact'
    }).format(amount);
  };

  return (
    <div
      className={`glass flex flex-col w-80 h-full ${isDropReady ? 'drop-ready' : ''}`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, columnId)}
      onDragLeave={onDragLeave}
    >
      {/* Column Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-semibold text-lg">
            {title}
          </h2>
          <div className="text-right">
            <div className="text-gray-300 text-sm">
              {cards.length} lead{cards.length !== 1 ? 's' : ''}
            </div>
            {totalAmount > 0 && (
              <div className="text-green-400 text-sm font-semibold">
                {formatAmount(totalAmount)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Column Body */}
      <div className="flex-1 p-4 overflow-y-auto thin-scroll">
        {cards.length === 0 ? (
          <div className="text-gray-400 text-center py-8 text-sm">
            No leads in this stage
          </div>
        ) : (
          cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              onDragStart={onCardDragStart}
              onDragEnd={onCardDragEnd}
              isGrabMode={grabModeCardId === card.id}
              onKeyDown={onCardKeyDown}
            />
          ))
        )}
      </div>
    </div>
  );
};