import React, { useState } from 'react';
import { GripVertical, Eye, EyeOff, RotateCcw } from 'lucide-react';

interface DndItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  visible: boolean;
}

interface DndListProps {
  items: DndItem[];
  onReorder: (newOrder: string[]) => void;
  onToggleVisibility: (id: string, visible: boolean) => void;
  onReset: () => void;
}

export const DndList: React.FC<DndListProps> = ({
  items,
  onReorder,
  onToggleVisibility,
  onReset
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, itemId: string) => {
    e.preventDefault();
    setDragOverItem(itemId);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const currentOrder = items.map(item => item.id);
    const draggedIndex = currentOrder.indexOf(draggedItem);
    const targetIndex = currentOrder.indexOf(targetId);
    
    const newOrder = [...currentOrder];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);
    
    onReorder(newOrder);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleShowAll = () => {
    items.forEach(item => {
      if (!item.visible) {
        onToggleVisibility(item.id, true);
      }
    });
  };

  const handleHideAll = () => {
    items.forEach(item => {
      if (item.visible) {
        onToggleVisibility(item.id, false);
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={handleShowAll}
            className="px-3 py-1 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all"
          >
            Show All
          </button>
          <button
            onClick={handleHideAll}
            className="px-3 py-1 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all"
          >
            Hide All
          </button>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center px-3 py-1 text-xs font-medium text-slate-400 bg-slate-700/50 border border-yellow-400/30 rounded-lg hover:bg-slate-700 transition-all"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset Order
        </button>
      </div>

      {/* Draggable List */}
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isDragging = draggedItem === item.id;
          const isDragOver = dragOverItem === item.id;
          
          return (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragOver={(e) => handleDragOver(e, item.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, item.id)}
              className={`
                flex items-center space-x-3 p-3 bg-slate-800/40 backdrop-blur-xl rounded-xl border transition-all cursor-move
                ${isDragging ? 'opacity-50 scale-95' : ''}
                ${isDragOver ? 'border-blue-500 bg-blue-500/10' : 'border-yellow-400/30 hover:border-yellow-400/50'}
                ${!item.visible ? 'opacity-60' : ''}
              `}
            >
              {/* Drag Handle */}
              <div className="p-1 text-slate-400 hover:text-slate-300 cursor-grab active:cursor-grabbing">
                <GripVertical className="h-4 w-4" />
              </div>
              
              {/* Icon */}
              <div className="p-2 bg-slate-700/30 rounded-lg border border-yellow-400/20">
                <Icon className="h-4 w-4 text-slate-400" />
              </div>
              
              {/* Name */}
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-50">{item.name}</p>
              </div>
              
              {/* Visibility Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVisibility(item.id, !item.visible);
                }}
                className={`p-2 rounded-lg transition-all ${
                  item.visible
                    ? 'text-green-400 hover:bg-green-500/10'
                    : 'text-slate-500 hover:bg-slate-700/50'
                }`}
                title={item.visible ? 'Hide module' : 'Show module'}
              >
                {item.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};