import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Copy, Eye, Save, Download, Upload } from 'lucide-react';
import { useAppConfig } from '../../hooks/useAppConfig';
import { FormSchema, FormField } from '../../lib/appConfig';
import toast from 'react-hot-toast';

const fieldTypes = [
  { type: 'text', label: 'Text Input', icon: '📝' },
  { type: 'number', label: 'Number', icon: '🔢' },
  { type: 'email', label: 'Email', icon: '📧' },
  { type: 'phone', label: 'Phone', icon: '📱' },
  { type: 'select', label: 'Select', icon: '📋' },
  { type: 'date', label: 'Date', icon: '📅' },
  { type: 'textarea', label: 'Text Area', icon: '📄' },
  { type: 'toggle', label: 'Toggle', icon: '🔘' },
  { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
  { type: 'radio', label: 'Radio', icon: '🔘' }
];

export const FormEditorPage: React.FC = () => {
  const { config, updateConfig } = useAppConfig();
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const forms = Object.values(config.forms);
  const currentForm = selectedForm ? config.forms[selectedForm] : null;

  const filteredForms = forms.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createNewForm = () => {
    const id = `form_${Date.now()}`;
    const newForm: FormSchema = {
      id,
      name: 'New Form',
      description: 'A new form',
      fields: [],
      layout: 'single',
      submitText: 'Submit',
      cancelText: 'Cancel',
      validation: { required: [], rules: {} }
    };

    updateConfig({
      forms: {
        ...config.forms,
        [id]: newForm
      }
    });

    setSelectedForm(id);
    toast.success('New form created');
  };

  const duplicateForm = (formId: string) => {
    const originalForm = config.forms[formId];
    if (!originalForm) return;

    const id = `form_${Date.now()}`;
    const duplicatedForm: FormSchema = {
      ...originalForm,
      id,
      name: `${originalForm.name} (Copy)`
    };

    updateConfig({
      forms: {
        ...config.forms,
        [id]: duplicatedForm
      }
    });

    setSelectedForm(id);
    toast.success('Form duplicated');
  };

  const deleteForm = (formId: string) => {
    const form = config.forms[formId];
    if (!form) return;

    if (window.confirm(`Are you sure you want to delete "${form.name}"?`)) {
      const newForms = { ...config.forms };
      delete newForms[formId];

      updateConfig({ forms: newForms });

      if (selectedForm === formId) {
        setSelectedForm(null);
      }

      toast.success('Form deleted');
    }
  };

  const updateForm = (updates: Partial<FormSchema>) => {
    if (!selectedForm) return;

    updateConfig({
      forms: {
        ...config.forms,
        [selectedForm]: {
          ...config.forms[selectedForm],
          ...updates
        }
      }
    });
  };

  const addField = (type: string) => {
    if (!currentForm) return;

    const newField: FormField = {
      id: `field_${Date.now()}`,
      type: type as any,
      label: `New ${type} field`,
      required: false,
      width: 'full',
      placeholder: '',
      options: type === 'select' || type === 'radio' ? [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ] : undefined
    };

    updateForm({
      fields: [...currentForm.fields, newField]
    });

    setSelectedField(newField.id);
    toast.success('Field added');
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    if (!currentForm) return;

    const updatedFields = currentForm.fields.map(field =>
      field.id === fieldId ? { ...field, ...updates } : field
    );

    updateForm({ fields: updatedFields });
  };

  const deleteField = (fieldId: string) => {
    if (!currentForm) return;

    const updatedFields = currentForm.fields.filter(field => field.id !== fieldId);
    updateForm({ fields: updatedFields });

    if (selectedField === fieldId) {
      setSelectedField(null);
    }

    toast.success('Field deleted');
  };

  const moveField = (fieldId: string, direction: 'up' | 'down') => {
    if (!currentForm) return;

    const fields = [...currentForm.fields];
    const index = fields.findIndex(f => f.id === fieldId);
    
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= fields.length) return;

    [fields[index], fields[newIndex]] = [fields[newIndex], fields[index]];
    
    updateForm({ fields });
  };

  const exportForm = (formId: string) => {
    const form = config.forms[formId];
    if (!form) return;

    const blob = new Blob([JSON.stringify(form, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Form exported');
  };

  const importForm = () => {
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
            const imported = JSON.parse(content) as FormSchema;
            
            // Generate new ID to avoid conflicts
            const id = `form_${Date.now()}`;
            imported.id = id;
            imported.name = `${imported.name} (Imported)`;

            updateConfig({
              forms: {
                ...config.forms,
                [id]: imported
              }
            });

            setSelectedForm(id);
            toast.success('Form imported');
          } catch (error) {
            toast.error('Failed to import form');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const selectedFieldData = currentForm?.fields.find(f => f.id === selectedField);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Panel - Form List */}
      <div className="w-80 bg-slate-800/40 backdrop-blur-xl border-r border-yellow-400/30 flex flex-col">
        <div className="p-4 border-b border-yellow-400/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-50">Forms</h3>
            <div className="flex space-x-2">
              <button
                onClick={createNewForm}
                className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
                title="New Form"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                onClick={importForm}
                className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                title="Import Form"
              >
                <Upload className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search forms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredForms.map((form) => (
            <div
              key={form.id}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                selectedForm === form.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-yellow-400/30 hover:border-yellow-400/50 bg-slate-700/30'
              }`}
              onClick={() => setSelectedForm(form.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-slate-50 truncate">{form.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{form.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-slate-500">{form.fields.length} fields</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-500 capitalize">{form.layout}</span>
                  </div>
                </div>
                
                <div className="flex space-x-1 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateForm(form.id);
                    }}
                    className="p-1 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded"
                    title="Duplicate"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      exportForm(form.id);
                    }}
                    className="p-1 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded"
                    title="Export"
                  >
                    <Download className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteForm(form.id);
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
          
          {filteredForms.length === 0 && (
            <div className="text-center py-8">
              <Edit className="h-8 w-8 mx-auto text-slate-500 mb-2" />
              <p className="text-sm text-slate-400">No forms found</p>
            </div>
          )}
        </div>
      </div>

      {/* Center Panel - Form Builder */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentForm ? (
          <>
            {/* Form Header */}
            <div className="p-4 border-b border-yellow-400/30 bg-slate-800/40 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={currentForm.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                    className="text-lg font-semibold text-slate-50 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={currentForm.description}
                    onChange={(e) => updateForm({ description: e.target.value })}
                    className="block text-sm text-slate-400 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 mt-1"
                    placeholder="Form description..."
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
                    onClick={() => toast.success('Form saved')}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Form Canvas */}
            <div className="flex-1 overflow-y-auto p-4">
              {showPreview ? (
                /* Form Preview */
                <div className="max-w-4xl mx-auto">
                  <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
                    <h3 className="text-xl font-semibold text-slate-50 mb-2">{currentForm.name}</h3>
                    <p className="text-slate-400 mb-6">{currentForm.description}</p>
                    
                    <div className={`grid gap-4 ${
                      currentForm.layout === 'two-column' ? 'grid-cols-2' :
                      currentForm.layout === 'three-column' ? 'grid-cols-3' : 'grid-cols-1'
                    }`}>
                      {currentForm.fields.map((field) => (
                        <div
                          key={field.id}
                          className={`${
                            field.width === 'half' ? 'col-span-1' :
                            field.width === 'third' ? 'col-span-1' :
                            field.width === 'quarter' ? 'col-span-1' : 'col-span-full'
                          }`}
                        >
                          <label className="block text-sm font-medium text-slate-50 mb-2">
                            {field.label}
                            {field.required && <span className="text-red-400 ml-1">*</span>}
                          </label>
                          
                          {field.type === 'textarea' ? (
                            <textarea
                              placeholder={field.placeholder}
                              className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              rows={3}
                            />
                          ) : field.type === 'select' ? (
                            <select className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                              <option value="">Select an option</option>
                              {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : field.type === 'toggle' ? (
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          ) : field.type === 'checkbox' ? (
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="ml-2 text-sm text-slate-300">{field.placeholder || 'Checkbox option'}</span>
                            </div>
                          ) : field.type === 'radio' ? (
                            <div className="space-y-2">
                              {field.options?.map((option) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    type="radio"
                                    name={field.id}
                                    value={option.value}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                  />
                                  <span className="ml-2 text-sm text-slate-300">{option.label}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <input
                              type={field.type}
                              placeholder={field.placeholder}
                              className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          )}
                          
                          {field.helpText && (
                            <p className="text-xs text-slate-400 mt-1">{field.helpText}</p>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-yellow-400/20">
                      <button className="px-4 py-2 text-slate-400 bg-slate-700/50 border border-yellow-400/30 rounded-lg hover:bg-slate-700 transition-all">
                        {currentForm.cancelText}
                      </button>
                      <button className="px-4 py-2 text-white bg-blue-600 border border-blue-500 rounded-lg hover:bg-blue-700 transition-all">
                        {currentForm.submitText}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Form Builder */
                <div className="max-w-4xl mx-auto space-y-4">
                  {/* Form Settings */}
                  <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-yellow-400/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-50 mb-2">Layout</label>
                        <select
                          value={currentForm.layout}
                          onChange={(e) => updateForm({ layout: e.target.value as any })}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="single">Single Column</option>
                          <option value="two-column">Two Columns</option>
                          <option value="three-column">Three Columns</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-50 mb-2">Submit Text</label>
                        <input
                          type="text"
                          value={currentForm.submitText}
                          onChange={(e) => updateForm({ submitText: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-50 mb-2">Cancel Text</label>
                        <input
                          type="text"
                          value={currentForm.cancelText}
                          onChange={(e) => updateForm({ cancelText: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-3">
                    {currentForm.fields.map((field, index) => (
                      <div
                        key={field.id}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          selectedField === field.id
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-yellow-400/30 hover:border-yellow-400/50 bg-slate-800/40'
                        }`}
                        onClick={() => setSelectedField(field.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">
                              {fieldTypes.find(t => t.type === field.type)?.icon || '📝'}
                            </span>
                            <div>
                              <h4 className="text-sm font-medium text-slate-50">{field.label}</h4>
                              <p className="text-xs text-slate-400 capitalize">{field.type} • {field.width}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {field.required && (
                              <span className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded">Required</span>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                moveField(field.id, 'up');
                              }}
                              disabled={index === 0}
                              className="p-1 text-slate-400 hover:text-slate-50 disabled:opacity-50"
                            >
                              ↑
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                moveField(field.id, 'down');
                              }}
                              disabled={index === currentForm.fields.length - 1}
                              className="p-1 text-slate-400 hover:text-slate-50 disabled:opacity-50"
                            >
                              ↓
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteField(field.id);
                              }}
                              className="p-1 text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {currentForm.fields.length === 0 && (
                      <div className="text-center py-8 border-2 border-dashed border-yellow-400/30 rounded-xl">
                        <Edit className="h-8 w-8 mx-auto text-slate-500 mb-2" />
                        <p className="text-sm text-slate-400">No fields added yet</p>
                        <p className="text-xs text-slate-500 mt-1">Add fields from the palette on the right</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Edit className="h-12 w-12 mx-auto text-slate-500 mb-4" />
              <h3 className="text-lg font-medium text-slate-50 mb-2">No Form Selected</h3>
              <p className="text-sm text-slate-400">Select a form from the left panel or create a new one</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Field Palette & Properties */}
      <div className="w-80 bg-slate-800/40 backdrop-blur-xl border-l border-yellow-400/30 flex flex-col">
        {selectedField && selectedFieldData ? (
          /* Field Properties */
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Field Properties</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Label</label>
                <input
                  type="text"
                  value={selectedFieldData.label}
                  onChange={(e) => updateField(selectedField, { label: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Type</label>
                <select
                  value={selectedFieldData.type}
                  onChange={(e) => updateField(selectedField, { type: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {fieldTypes.map((type) => (
                    <option key={type.type} value={type.type}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Width</label>
                <select
                  value={selectedFieldData.width}
                  onChange={(e) => updateField(selectedField, { width: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="full">Full Width</option>
                  <option value="half">Half Width</option>
                  <option value="third">Third Width</option>
                  <option value="quarter">Quarter Width</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Placeholder</label>
                <input
                  type="text"
                  value={selectedFieldData.placeholder || ''}
                  onChange={(e) => updateField(selectedField, { placeholder: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Help Text</label>
                <input
                  type="text"
                  value={selectedFieldData.helpText || ''}
                  onChange={(e) => updateField(selectedField, { helpText: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-sm font-medium text-slate-50">Required</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFieldData.required}
                    onChange={(e) => updateField(selectedField, { required: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              {(selectedFieldData.type === 'select' || selectedFieldData.type === 'radio') && (
                <div>
                  <label className="block text-sm font-medium text-slate-50 mb-2">Options</label>
                  <div className="space-y-2">
                    {selectedFieldData.options?.map((option, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={option.value}
                          onChange={(e) => {
                            const newOptions = [...(selectedFieldData.options || [])];
                            newOptions[index] = { ...option, value: e.target.value };
                            updateField(selectedField, { options: newOptions });
                          }}
                          className="flex-1 px-2 py-1 bg-slate-700/50 border border-yellow-400/30 rounded text-slate-50 text-sm"
                          placeholder="Value"
                        />
                        <input
                          type="text"
                          value={option.label}
                          onChange={(e) => {
                            const newOptions = [...(selectedFieldData.options || [])];
                            newOptions[index] = { ...option, label: e.target.value };
                            updateField(selectedField, { options: newOptions });
                          }}
                          className="flex-1 px-2 py-1 bg-slate-700/50 border border-yellow-400/30 rounded text-slate-50 text-sm"
                          placeholder="Label"
                        />
                        <button
                          onClick={() => {
                            const newOptions = selectedFieldData.options?.filter((_, i) => i !== index) || [];
                            updateField(selectedField, { options: newOptions });
                          }}
                          className="p-1 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newOptions = [...(selectedFieldData.options || []), { value: '', label: '' }];
                        updateField(selectedField, { options: newOptions });
                      }}
                      className="w-full p-2 text-sm text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all"
                    >
                      Add Option
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Field Palette */
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Field Palette</h3>
            
            <div className="space-y-2">
              {fieldTypes.map((fieldType) => (
                <button
                  key={fieldType.type}
                  onClick={() => addField(fieldType.type)}
                  disabled={!currentForm}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-slate-700/30 border border-yellow-400/30 rounded-lg hover:bg-slate-700/50 hover:border-yellow-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-lg">{fieldType.icon}</span>
                  <span className="text-sm font-medium text-slate-50">{fieldType.label}</span>
                </button>
              ))}
            </div>
            
            {!currentForm && (
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-xs text-yellow-400">Select or create a form to add fields</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};