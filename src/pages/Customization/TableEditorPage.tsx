import React, { useState } from 'react';
import { Plus, Search, CreditCard as Edit, Trash2, Copy, Eye, Save, Download, Upload, GripVertical } from 'lucide-react';
import { useAppConfig } from '../../hooks/useAppConfig';
import { TableSchema, TableColumn, TableAction } from '../../lib/appConfig';
import toast from 'react-hot-toast';

const columnTypes = [
  { type: 'text', label: 'Text', icon: '📝' },
  { type: 'number', label: 'Number', icon: '🔢' },
  { type: 'currency', label: 'Currency', icon: '💰' },
  { type: 'date', label: 'Date', icon: '📅' },
  { type: 'badge', label: 'Badge', icon: '🏷️' },
  { type: 'avatar', label: 'Avatar', icon: '👤' },
  { type: 'progress', label: 'Progress', icon: '📊' },
  { type: 'actions', label: 'Actions', icon: '⚡' }
];

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', amount: 1250.50, progress: 75, avatar: 'JD', date: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'pending', amount: 890.25, progress: 45, avatar: 'JS', date: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive', amount: 2100.00, progress: 90, avatar: 'BJ', date: '2024-01-13' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'active', amount: 750.75, progress: 60, avatar: 'AB', date: '2024-01-12' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'pending', amount: 1500.00, progress: 30, avatar: 'CW', date: '2024-01-11' }
];

export const TableEditorPage: React.FC = () => {
  const { config, updateConfig } = useAppConfig();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const tables = Object.values(config.tables);
  const currentTable = selectedTable ? config.tables[selectedTable] : null;

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createNewTable = () => {
    const id = `table_${Date.now()}`;
    const newTable: TableSchema = {
      id,
      name: 'New Table',
      description: 'A new table',
      columns: [
        {
          id: 'col_1',
          header: 'ID',
          key: 'id',
          type: 'number',
          sortable: true,
          width: '80px',
          align: 'left',
          visible: true
        },
        {
          id: 'col_2',
          header: 'Name',
          key: 'name',
          type: 'text',
          sortable: true,
          align: 'left',
          visible: true
        }
      ],
      pagination: true,
      search: true,
      filters: true,
      actions: []
    };

    updateConfig({
      tables: {
        ...config.tables,
        [id]: newTable
      }
    });

    setSelectedTable(id);
    toast.success('New table created');
  };

  const duplicateTable = (tableId: string) => {
    const originalTable = config.tables[tableId];
    if (!originalTable) return;

    const id = `table_${Date.now()}`;
    const duplicatedTable: TableSchema = {
      ...originalTable,
      id,
      name: `${originalTable.name} (Copy)`,
      columns: originalTable.columns.map(col => ({
        ...col,
        id: `col_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }))
    };

    updateConfig({
      tables: {
        ...config.tables,
        [id]: duplicatedTable
      }
    });

    setSelectedTable(id);
    toast.success('Table duplicated');
  };

  const deleteTable = (tableId: string) => {
    const table = config.tables[tableId];
    if (!table) return;

    if (window.confirm(`Are you sure you want to delete "${table.name}"?`)) {
      const newTables = { ...config.tables };
      delete newTables[tableId];

      updateConfig({ tables: newTables });

      if (selectedTable === tableId) {
        setSelectedTable(null);
      }

      toast.success('Table deleted');
    }
  };

  const updateTable = (updates: Partial<TableSchema>) => {
    if (!selectedTable) return;

    updateConfig({
      tables: {
        ...config.tables,
        [selectedTable]: {
          ...config.tables[selectedTable],
          ...updates
        }
      }
    });
  };

  const addColumn = (type: string) => {
    if (!currentTable) return;

    const newColumn: TableColumn = {
      id: `col_${Date.now()}`,
      header: `New ${type} column`,
      key: `new_${type}_field`,
      type: type as any,
      sortable: true,
      align: 'left',
      visible: true,
      badgeMap: type === 'badge' ? {
        'active': { color: 'green', label: 'Active' },
        'pending': { color: 'yellow', label: 'Pending' },
        'inactive': { color: 'red', label: 'Inactive' }
      } : undefined
    };

    updateTable({
      columns: [...currentTable.columns, newColumn]
    });

    setSelectedColumn(newColumn.id);
    toast.success('Column added');
  };

  const updateColumn = (columnId: string, updates: Partial<TableColumn>) => {
    if (!currentTable) return;

    const updatedColumns = currentTable.columns.map(column =>
      column.id === columnId ? { ...column, ...updates } : column
    );

    updateTable({ columns: updatedColumns });
  };

  const deleteColumn = (columnId: string) => {
    if (!currentTable) return;

    const updatedColumns = currentTable.columns.filter(column => column.id !== columnId);
    updateTable({ columns: updatedColumns });

    if (selectedColumn === columnId) {
      setSelectedColumn(null);
    }

    toast.success('Column deleted');
  };

  const moveColumn = (columnId: string, direction: 'up' | 'down') => {
    if (!currentTable) return;

    const columns = [...currentTable.columns];
    const index = columns.findIndex(c => c.id === columnId);
    
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= columns.length) return;

    [columns[index], columns[newIndex]] = [columns[newIndex], columns[index]];
    
    updateTable({ columns });
  };

  const exportTable = (tableId: string) => {
    const table = config.tables[tableId];
    if (!table) return;

    const blob = new Blob([JSON.stringify(table, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${table.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Table exported');
  };

  const importTable = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            const imported = JSON.parse(content) as TableSchema;
            
            // Generate new ID to avoid conflicts
            const id = `table_${Date.now()}`;
            imported.id = id;
            imported.name = `${imported.name} (Imported)`;

            updateConfig({
              tables: {
                ...config.tables,
                [id]: imported
              }
            });

            setSelectedTable(id);
            toast.success('Table imported');
          } catch (error) {
            toast.error('Failed to import table');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const selectedColumnData = currentTable?.columns.find(c => c.id === selectedColumn);

  const renderCellContent = (column: TableColumn, value: any) => {
    switch (column.type) {
      case 'currency':
        return `$${value?.toFixed(2) || '0.00'}`;
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'badge':
        const badgeConfig = column.badgeMap?.[value];
        return (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            badgeConfig?.color === 'green' ? 'bg-green-100 text-green-800' :
            badgeConfig?.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
            badgeConfig?.color === 'red' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {badgeConfig?.label || value}
          </span>
        );
      case 'avatar':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
              {value}
            </div>
          </div>
        );
      case 'progress':
        return (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${value}%` }}
            ></div>
          </div>
        );
      case 'actions':
        return (
          <div className="flex space-x-1">
            <button className="p-1 text-blue-600 hover:text-blue-800">
              <Edit className="h-3 w-3" />
            </button>
            <button className="p-1 text-red-600 hover:text-red-800">
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        );
      default:
        return value;
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Panel - Table List */}
      <div className="w-80 bg-slate-800/40 backdrop-blur-xl border-r border-yellow-400/30 flex flex-col">
        <div className="p-4 border-b border-yellow-400/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-50">Tables</h3>
            <div className="flex space-x-2">
              <button
                onClick={createNewTable}
                className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
                title="New Table"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                onClick={importTable}
                className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                title="Import Table"
              >
                <Upload className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredTables.map((table) => (
            <div
              key={table.id}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                selectedTable === table.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-yellow-400/30 hover:border-yellow-400/50 bg-slate-700/30'
              }`}
              onClick={() => setSelectedTable(table.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-slate-50 truncate">{table.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{table.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-slate-500">{table.columns.length} columns</span>
                    {table.pagination && <span className="text-xs text-slate-500">• Paginated</span>}
                    {table.search && <span className="text-xs text-slate-500">• Searchable</span>}
                  </div>
                </div>
                
                <div className="flex space-x-1 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateTable(table.id);
                    }}
                    className="p-1 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded"
                    title="Duplicate"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      exportTable(table.id);
                    }}
                    className="p-1 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded"
                    title="Export"
                  >
                    <Download className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTable(table.id);
                    }}
                    className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded"
                    title="Delete"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredTables.length === 0 && (
            <div className="text-center py-8">
              <Edit className="h-8 w-8 mx-auto text-slate-500 mb-2" />
              <p className="text-sm text-slate-400">No tables found</p>
            </div>
          )}
        </div>
      </div>

      {/* Center Panel - Table Designer */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentTable ? (
          <>
            {/* Table Header */}
            <div className="p-4 border-b border-yellow-400/30 bg-slate-800/40 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={currentTable.name}
                    onChange={(e) => updateTable({ name: e.target.value })}
                    className="text-lg font-semibold text-slate-50 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={currentTable.description}
                    onChange={(e) => updateTable({ description: e.target.value })}
                    className="block text-sm text-slate-400 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 mt-1"
                    placeholder="Table description..."
                  />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-lg transition-all ${
                      showPreview
                        ? 'text-blue-400 bg-blue-500/20 border border-blue-500/30'
                        : 'text-slate-400 bg-slate-700/50 border border-yellow-400/30 hover:bg-slate-700'
                    }`}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </button>
                  <button
                    onClick={() => toast.success('Table saved')}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Table Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {showPreview ? (
                /* Table Preview */
                <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-slate-50">{currentTable.name}</h3>
                    <div className="flex space-x-2">
                      {currentTable.search && (
                        <input
                          type="text"
                          placeholder="Search..."
                          className="px-3 py-1 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 text-sm"
                        />
                      )}
                      {currentTable.filters && (
                        <button className="px-3 py-1 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 text-sm">
                          Filters
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-yellow-400/20">
                          {currentTable.columns.filter(col => col.visible).map((column) => (
                            <th
                              key={column.id}
                              className={`px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider ${
                                column.align === 'center' ? 'text-center' :
                                column.align === 'right' ? 'text-right' : 'text-left'
                              }`}
                              style={{ width: column.width }}
                            >
                              <div className="flex items-center space-x-1">
                                <span>{column.header}</span>
                                {column.sortable && (
                                  <span className="text-slate-500">↕</span>
                                )}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-yellow-400/10">
                        {mockData.slice(0, 5).map((row, index) => (
                          <tr key={index} className="hover:bg-slate-700/20">
                            {currentTable.columns.filter(col => col.visible).map((column) => (
                              <td
                                key={column.id}
                                className={`px-4 py-3 text-sm text-slate-50 ${
                                  column.align === 'center' ? 'text-center' :
                                  column.align === 'right' ? 'text-right' : 'text-left'
                                }`}
                              >
                                {renderCellContent(column, row[column.key as keyof typeof row])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {currentTable.pagination && (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-yellow-400/20">
                      <div className="text-sm text-slate-400">
                        Showing 1 to 5 of 100 results
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-slate-700/50 border border-yellow-400/30 rounded text-slate-50 text-sm">
                          Previous
                        </button>
                        <button className="px-3 py-1 bg-blue-600 border border-blue-500 rounded text-white text-sm">
                          1
                        </button>
                        <button className="px-3 py-1 bg-slate-700/50 border border-yellow-400/30 rounded text-slate-50 text-sm">
                          2
                        </button>
                        <button className="px-3 py-1 bg-slate-700/50 border border-yellow-400/30 rounded text-slate-50 text-sm">
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Table Designer */
                <div className="space-y-6">
                  {/* Table Settings */}
                  <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-yellow-400/30">
                    <h4 className="text-sm font-semibold text-slate-50 mb-4">Table Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <span className="text-sm font-medium text-slate-50">Pagination</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentTable.pagination}
                            onChange={(e) => updateTable({ pagination: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <span className="text-sm font-medium text-slate-50">Search</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentTable.search}
                            onChange={(e) => updateTable({ search: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <span className="text-sm font-medium text-slate-50">Filters</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentTable.filters}
                            onChange={(e) => updateTable({ filters: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Columns */}
                  <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-yellow-400/30">
                    <h4 className="text-sm font-semibold text-slate-50 mb-4">Columns</h4>
                    <div className="space-y-3">
                      {currentTable.columns.map((column, index) => (
                        <div
                          key={column.id}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            selectedColumn === column.id
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-yellow-400/30 hover:border-yellow-400/50 bg-slate-700/30'
                          }`}
                          onClick={() => setSelectedColumn(column.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <GripVertical className="h-4 w-4 text-slate-400 cursor-grab" />
                              <span className="text-lg">
                                {columnTypes.find(t => t.type === column.type)?.icon || '📝'}
                              </span>
                              <div>
                                <h5 className="text-sm font-medium text-slate-50">{column.header}</h5>
                                <p className="text-xs text-slate-400">
                                  {column.key} • {column.type} • {column.align}
                                  {!column.visible && ' • Hidden'}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {column.sortable && (
                                <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Sortable</span>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveColumn(column.id, 'up');
                                }}
                                disabled={index === 0}
                                className="p-1 text-slate-400 hover:text-slate-50 disabled:opacity-50"
                              >
                                ↑
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveColumn(column.id, 'down');
                                }}
                                disabled={index === currentTable.columns.length - 1}
                                className="p-1 text-slate-400 hover:text-slate-50 disabled:opacity-50"
                              >
                                ↓
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteColumn(column.id);
                                }}
                                className="p-1 text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {currentTable.columns.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-yellow-400/30 rounded-xl">
                          <Edit className="h-8 w-8 mx-auto text-slate-500 mb-2" />
                          <p className="text-sm text-slate-400">No columns added yet</p>
                          <p className="text-xs text-slate-500 mt-1">Add columns from the palette on the right</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Edit className="h-12 w-12 mx-auto text-slate-500 mb-4" />
              <h3 className="text-lg font-medium text-slate-50 mb-2">No Table Selected</h3>
              <p className="text-sm text-slate-400">Select a table from the left panel or create a new one</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Column Palette & Properties */}
      <div className="w-80 bg-slate-800/40 backdrop-blur-xl border-l border-yellow-400/30 flex flex-col">
        {selectedColumn && selectedColumnData ? (
          /* Column Properties */
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Column Properties</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Header</label>
                <input
                  type="text"
                  value={selectedColumnData.header}
                  onChange={(e) => updateColumn(selectedColumn, { header: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Key</label>
                <input
                  type="text"
                  value={selectedColumnData.key}
                  onChange={(e) => updateColumn(selectedColumn, { key: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Type</label>
                <select
                  value={selectedColumnData.type}
                  onChange={(e) => updateColumn(selectedColumn, { type: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {columnTypes.map((type) => (
                    <option key={type.type} value={type.type}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Width</label>
                <input
                  type="text"
                  value={selectedColumnData.width || ''}
                  onChange={(e) => updateColumn(selectedColumn, { width: e.target.value })}
                  placeholder="e.g., 100px, 20%, auto"
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Alignment</label>
                <select
                  value={selectedColumnData.align}
                  onChange={(e) => updateColumn(selectedColumn, { align: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-sm font-medium text-slate-50">Sortable</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedColumnData.sortable}
                    onChange={(e) => updateColumn(selectedColumn, { sortable: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-sm font-medium text-slate-50">Visible</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedColumnData.visible}
                    onChange={(e) => updateColumn(selectedColumn, { visible: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              {selectedColumnData.type === 'badge' && (
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Badge Mapping</label>
                  <div className="space-y-2">
                    {Object.entries(selectedColumnData.badgeMap || {}).map(([key, config]) => (
                      <div key={key} className="flex space-x-2">
                        <input
                          type="text"
                          value={key}
                          className="flex-1 px-2 py-1 bg-slate-700/50 border border-yellow-400/30 rounded text-slate-50 text-sm"
                          placeholder="Value"
                          readOnly
                        />
                        <input
                          type="text"
                          value={config.label}
                          onChange={(e) => {
                            const newBadgeMap = { ...selectedColumnData.badgeMap };
                            newBadgeMap[key] = { ...config, label: e.target.value };
                            updateColumn(selectedColumn, { badgeMap: newBadgeMap });
                          }}
                          className="flex-1 px-2 py-1 bg-slate-700/50 border border-yellow-400/30 rounded text-slate-50 text-sm"
                          placeholder="Label"
                        />
                        <select
                          value={config.color}
                          onChange={(e) => {
                            const newBadgeMap = { ...selectedColumnData.badgeMap };
                            newBadgeMap[key] = { ...config, color: e.target.value };
                            updateColumn(selectedColumn, { badgeMap: newBadgeMap });
                          }}
                          className="px-2 py-1 bg-slate-700/50 border border-yellow-400/30 rounded text-slate-50 text-sm"
                        >
                          <option value="green">Green</option>
                          <option value="yellow">Yellow</option>
                          <option value="red">Red</option>
                          <option value="blue">Blue</option>
                          <option value="gray">Gray</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Column Palette */
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Column Palette</h3>
            
            <div className="space-y-2">
              {columnTypes.map((columnType) => (
                <button
                  key={columnType.type}
                  onClick={() => addColumn(columnType.type)}
                  disabled={!currentTable}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-slate-700/30 border border-yellow-400/30 rounded-lg hover:bg-slate-700/50 hover:border-yellow-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-lg">{columnType.icon}</span>
                  <span className="text-sm font-medium text-slate-50">{columnType.label}</span>
                </button>
              ))}
            </div>
            
            {!currentTable && (
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-xs text-yellow-400">Select or create a table to add columns</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};