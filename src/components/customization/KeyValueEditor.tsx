import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

interface KeyValuePair {
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean';
}

interface KeyValueEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
  title: string;
  description?: string;
}

export const KeyValueEditor: React.FC<KeyValueEditorProps> = ({
  data,
  onChange,
  title,
  description
}) => {
  const [pairs, setPairs] = useState<KeyValuePair[]>(() => {
    return Object.entries(data).map(([key, value]) => ({
      key,
      value: String(value),
      type: typeof value as 'string' | 'number' | 'boolean'
    }));
  });

  const addPair = () => {
    setPairs([...pairs, { key: '', value: '', type: 'string' }]);
  };

  const removePair = (index: number) => {
    const newPairs = pairs.filter((_, i) => i !== index);
    setPairs(newPairs);
    updateData(newPairs);
  };

  const updatePair = (index: number, field: keyof KeyValuePair, value: string) => {
    const newPairs = [...pairs];
    newPairs[index] = { ...newPairs[index], [field]: value };
    setPairs(newPairs);
    updateData(newPairs);
  };

  const updateData = (currentPairs: KeyValuePair[]) => {
    const newData: Record<string, any> = {};
    currentPairs.forEach(pair => {
      if (pair.key) {
        switch (pair.type) {
          case 'number':
            newData[pair.key] = Number(pair.value) || 0;
            break;
          case 'boolean':
            newData[pair.key] = pair.value === 'true';
            break;
          default:
            newData[pair.key] = pair.value;
        }
      }
    });
    onChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
          {description && (
            <p className="text-sm text-slate-400 mt-1">{description}</p>
          )}
        </div>
        <button
          onClick={addPair}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </button>
      </div>

      <div className="space-y-3">
        {pairs.map((pair, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg border border-yellow-400/20">
            <input
              type="text"
              value={pair.key}
              onChange={(e) => updatePair(index, 'key', e.target.value)}
              placeholder="Key"
              className="flex-1 px-3 py-2 bg-slate-800/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            <select
              value={pair.type}
              onChange={(e) => updatePair(index, 'type', e.target.value)}
              className="px-3 py-2 bg-slate-800/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
            </select>
            
            {pair.type === 'boolean' ? (
              <select
                value={pair.value}
                onChange={(e) => updatePair(index, 'value', e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-800/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            ) : (
              <input
                type={pair.type === 'number' ? 'number' : 'text'}
                value={pair.value}
                onChange={(e) => updatePair(index, 'value', e.target.value)}
                placeholder="Value"
                className="flex-1 px-3 py-2 bg-slate-800/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
            
            <button
              onClick={() => removePair(index)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        
        {pairs.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-yellow-400/30 rounded-lg">
            <p className="text-sm text-slate-400">No key-value pairs added yet</p>
            <p className="text-xs text-slate-500 mt-1">Click "Add" to create your first pair</p>
          </div>
        )}
      </div>
    </div>
  );
};