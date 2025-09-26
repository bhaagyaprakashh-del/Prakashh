import React from 'react';
import { LeadCard } from '../../types/lead';

interface KanbanCardProps {
  card: LeadCard;
  onDragStart: (e: React.DragEvent, card: LeadCard) => void;
  onDragEnd: () => void;
  isGrabMode?: boolean;
  onKeyDown?: (e: React.KeyboardEvent, card: LeadCard) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  card,
  onDragStart,
  onDragEnd,
  isGrabMode = false,
  onKeyDown
}) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getPriorityClass = (priority?: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div
      draggable
      tabIndex={0}
      className={`glass-card p-4 mb-3 card-focus ${getPriorityClass(card.priority)} ${isGrabMode ? 'grab-mode' : ''}`}
      onDragStart={(e) => onDragStart(e, card)}
      onDragEnd={onDragEnd}
      onKeyDown={(e) => onKeyDown?.(e, card)}
      role="button"
      aria-label={`Lead card for ${card.name}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-white font-semibold text-sm truncate flex-1">
          {card.name}
        </h3>
        {card.amount && (
          <span className="amount text-xs ml-2">
            {formatAmount(card.amount)}
          </span>
        )}
      </div>

      {/* Company */}
      {card.company && (
        <p className="text-gray-300 text-xs mb-2 truncate">
          {card.company}
        </p>
      )}

      {/* Contact Info */}
      <div className="flex items-center gap-3 mb-2 text-xs text-gray-400">
        {card.email && (
          <div className="flex items-center gap-1">
            <span>📧</span>
            <span className="truncate max-w-[100px]">{card.email}</span>
          </div>
        )}
        {card.phone && (
          <div className="flex items-center gap-1">
            <span>📞</span>
            <span>{card.phone}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {card.tags && card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {card.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center text-xs">
        {card.owner && (
          <span className="text-gray-400">
            👤 {card.owner}
          </span>
        )}
        {card.followUpDate && (
          <span className="follow-up">
            📅 {formatDate(card.followUpDate)}
          </span>
        )}
      </div>
    </div>
  );
};