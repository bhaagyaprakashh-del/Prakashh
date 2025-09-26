import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Upload,
  Download,
  FileText,
  Database,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Eye,
  Trash2,
  RefreshCw,
  Settings,
  Filter,
  Activity,
  Target,
  Award,
  TrendingUp,
  Zap,
  MoreVertical,
  File,
  Image,
  Video,
  Archive,
  Globe,
  Link,
  Calendar,
  User,
  Building,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { DataImport } from '../../types/reports';

const sampleImports: DataImport[] = [
  {
    id: '1',
    name: 'Customer Data Import - March 2024',
    description: 'Bulk import of new customer records from Excel file',
    sourceType: 'excel',
    fileName: 'customers-march-2024.xlsx',
    fileSize: 2048576, // 2MB
    filePath: '/uploads/customers-march-2024.xlsx',
    targetTable: 'customers',
    mapping: [
      { sourceField: 'Name', targetField: 'full_name', dataType: 'string', isRequired: true },
      { sourceField: 'Email', targetField: 'email', dataType: 'email', isRequired: true },
      { sourceField: 'Phone', targetField: 'phone', dataType: 'phone', isRequired: true },
      { sourceField: 'Address', targetField: 'address', dataType: 'string', isRequired: false }
    ],
    validationRules: [
      { field: 'email', rule: 'format', parameters: { pattern: 'email' }, errorMessage: 'Invalid email format' },
      { field: 'phone', rule: 'format', parameters: { pattern: 'phone' }, errorMessage: 'Invalid phone format' }
    ],
    status: 'completed',
    totalRecords: 1250,
    processedRecords: 1250,
    validRecords: 1180,
    invalidRecords: 70,
    duplicateRecords: 25,
    importedRecords: 1155,
    skippedRecords: 95,
    errorRecords: 70,
    errors: [
      { row: 45, field: 'email', value: 'invalid-email', error: 'Invalid email format', severity: 'error' },
      { row: 78, field: 'phone', value: '123', error: 'Invalid phone number', severity: 'error' }
    ],
    warnings: [
      { row: 12, field: 'address', value: '', warning: 'Address field is empty', action: 'ignored' }
    ],
    progressPercentage: 100,
    currentStep: 'Import completed',
    createdAt: '2024-03-10T14:30:00',
    createdBy: 'data-admin@ramnirmalchits.com',
    updatedAt: '2024-03-10T14:45:00',
    completedAt: '2024-03-10T14:45:00',
    allowDuplicates: false,
    updateExisting: true,
    skipErrors: true,
    batchSize: 100
  },
  {
    id: '2',
    name: 'Agent Performance Data',
    description: 'Monthly agent performance metrics from external CRM',
    sourceType: 'csv',
    fileName: 'agent-performance-feb-2024.csv',
    fileSize: 524288, // 512KB
    filePath: '/uploads/agent-performance-feb-2024.csv',
    targetTable: 'agent_performance',
    mapping: [
      { sourceField: 'agent_id', targetField: 'agent_id', dataType: 'string', isRequired: true },
      { sourceField: 'sales_amount', targetField: 'sales_amount', dataType: 'number', isRequired: true },
      { sourceField: 'customers_acquired', targetField: 'customers_acquired', dataType: 'number', isRequired: true }
    ],
    validationRules: [
      { field: 'sales_amount', rule: 'range', parameters: { min: 0 }, errorMessage: 'Sales amount must be positive' }
    ],
    status: 'processing',
    totalRecords: 45,
    processedRecords: 32,
    validRecords: 30,
    invalidRecords: 2,
    duplicateRecords: 0,
    importedRecords: 30,
    skippedRecords: 2,
    errorRecords: 2,
    errors: [],
    warnings: [],
    progressPercentage: 71,
    currentStep: 'Validating records',
    estimatedTimeRemaining: 180,
    createdAt: '2024-03-15T16:20:00',
    createdBy: 'hr@ramnirmalchits.com',
    updatedAt: '2024-03-15T16:25:00',
    allowDuplicates: false,
    updateExisting: true,
    skipErrors: false,
    batchSize: 50
  },
  {
    id: '3',
    name: 'Branch Financial Data',
    description: 'Quarterly financial data from all branches',
    sourceType: 'json',
    fileName: 'branch-financials-q1-2024.json',
    fileSize: 1048576, // 1MB
    filePath: '/uploads/branch-financials-q1-2024.json',
    targetTable: 'branch_financials',
    mapping: [
      { sourceField: 'branch_code', targetField: 'branch_code', dataType: 'string', isRequired: true },
      { sourceField: 'revenue', targetField: 'revenue', dataType: 'number', isRequired: true },
      { sourceField: 'expenses', targetField: 'expenses', dataType: 'number', isRequired: true }
    ],
    validationRules: [
      { field: 'branch_code', rule: 'required', parameters: {}, errorMessage: 'Branch code is required' }
    ],
    status: 'failed',
    totalRecords: 12,
    processedRecords: 8,
    validRecords: 6,
    invalidRecords: 2,
    duplicateRecords: 0,
    importedRecords: 6,
    skippedRecords: 6,
    errorRecords: 2,
    errors: [
      { row: 5, field: 'revenue', value: 'invalid', error: 'Invalid number format', severity: 'error' },
      { row: 9, field: 'branch_code', value: '', error: 'Branch code is required', severity: 'error' }
    ],
    warnings: [],
    progressPercentage: 67,
    currentStep: 'Failed during validation',
    createdAt: '2024-03-12T11:15:00',
    createdBy: 'finance@ramnirmalchits.com',
    updatedAt: '2024-03-12T11:25:00',
    allowDuplicates: false,
    updateExisting: false,
    skipErrors: false,
    batchSize: 25
  },
  {
    id: '4',
    name: 'Chit Group Members Update',
    description: 'Update member information for existing chit groups',
    sourceType: 'csv',
    fileName: 'group-members-update.csv',
    fileSize: 307200, // 300KB
    filePath: '/uploads/group-members-update.csv',
    targetTable: 'chit_members',
    mapping: [
      { sourceField: 'member_id', targetField: 'member_id', dataType: 'string', isRequired: true },
      { sourceField: 'group_id', targetField: 'group_id', dataType: 'string', isRequired: true },
      { sourceField: 'status', targetField: 'status', dataType: 'string', isRequired: true }
    ],
    validationRules: [
      { field: 'status', rule: 'custom', parameters: { values: ['active', 'inactive', 'defaulter'] }, errorMessage: 'Invalid status value' }
    ],
    status: 'validating',
    totalRecords: 320,
    processedRecords: 180,
    validRecords: 175,
    invalidRecords: 5,
    duplicateRecords: 0,
    importedRecords: 0,
    skippedRecords: 0,
    errorRecords: 5,
    errors: [],
    warnings: [],
    progressPercentage: 56,
    currentStep: 'Validating member records',
    estimatedTimeRemaining: 240,
    createdAt: '2024-03-15T15:45:00',
    createdBy: 'operations@ramnirmalchits.com',
    updatedAt: '2024-03-15T16:10:00',
    allowDuplicates: false,
    updateExisting: true,
    skipErrors: true,
    batchSize: 50
  }
];

const ImportCard: React.FC<{ importData: DataImport }> = React.memo(({ importData }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'validating': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'uploaded': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'processing': return Activity;
      case 'validating': return Clock;
      case 'failed': return XCircle;
      case 'uploaded': return Upload;
      default: return Clock;
    }
  };

  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case 'excel': return Database;
      case 'csv': return FileText;
      case 'json': return Database;
      case 'xml': return FileText;
      case 'api': return Globe;
      case 'database': return Database;
      default: return File;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const StatusIcon = getStatusIcon(importData.status);
  const SourceIcon = getSourceIcon(importData.sourceType);
  const successRate = importData.totalRecords > 0 ? (importData.importedRecords / importData.totalRecords) * 100 : 0;

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <SourceIcon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50">{importData.name}</h3>
            <p className="text-sm text-slate-400">{importData.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(importData.status)}`}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {importData.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* File Information */}
      <div className="mb-4 p-3 bg-slate-700/30 rounded-xl border border-yellow-400/20">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-400">File</span>
          <span className="text-slate-50 font-medium">{importData.fileName}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Size</span>
          <span className="text-slate-300">{formatFileSize(importData.fileSize)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      {['processing', 'validating'].includes(importData.status) && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-slate-400 mb-1">
            <span>Progress</span>
            <span>{importData.progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${importData.progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{importData.currentStep}</span>
            {importData.estimatedTimeRemaining && (
              <span>~{Math.round(importData.estimatedTimeRemaining / 60)}m remaining</span>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Total Records</span>
            <span className="text-slate-50 font-medium">{importData.totalRecords.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Processed</span>
            <span className="text-blue-400 font-medium">{importData.processedRecords.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Valid</span>
            <span className="text-green-400 font-medium">{importData.validRecords.toLocaleString()}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Imported</span>
            <span className="text-green-400 font-medium">{importData.importedRecords.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Errors</span>
            <span className="text-red-400 font-medium">{importData.errorRecords.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Duplicates</span>
            <span className="text-yellow-400 font-medium">{importData.duplicateRecords.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Success Rate */}
      {importData.status === 'completed' && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-slate-400 mb-1">
            <span>Success Rate</span>
            <span>{successRate.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2 border border-yellow-400/20">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                successRate >= 90 ? 'bg-green-500' :
                successRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${successRate}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Errors and Warnings */}
      {(importData.errors.length > 0 || importData.warnings.length > 0) && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-400">Issues Found</span>
            <span className="text-red-300">
              {importData.errors.length} errors, {importData.warnings.length} warnings
            </span>
          </div>
        </div>
      )}

      {/* Mapping Preview */}
      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-2">Field Mapping ({importData.mapping.length}):</p>
        <div className="space-y-1">
          {importData.mapping.slice(0, 3).map((mapping, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-slate-300">{mapping.sourceField}</span>
              <span className="text-slate-500">→</span>
              <span className="text-slate-300">{mapping.targetField}</span>
            </div>
          ))}
          {importData.mapping.length > 3 && (
            <p className="text-xs text-slate-500">+{importData.mapping.length - 3} more mappings</p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>
            {importData.completedAt 
              ? `Completed ${new Date(importData.completedAt).toLocaleDateString()}`
              : `Started ${new Date(importData.createdAt).toLocaleDateString()}`
            }
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
            <Download className="h-4 w-4" />
          </button>
          {importData.status === 'failed' && (
            <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all">
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

const UploadZone: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
        isDragOver 
          ? 'border-blue-500 bg-blue-500/10' 
          : 'border-yellow-400/30 bg-slate-800/40 hover:border-yellow-400/50'
      } backdrop-blur-xl`}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-blue-500/20 rounded-full border border-yellow-400/30">
          <Upload className="h-12 w-12 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-50 mb-2">Upload Data Files</h3>
          <p className="text-slate-400 mb-4">
            Drag and drop your files here, or click to browse
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-500 mb-4">
            <span className="px-2 py-1 bg-slate-700/50 rounded border border-yellow-400/20">CSV</span>
            <span className="px-2 py-1 bg-slate-700/50 rounded border border-yellow-400/20">Excel</span>
            <span className="px-2 py-1 bg-slate-700/50 rounded border border-yellow-400/20">JSON</span>
            <span className="px-2 py-1 bg-slate-700/50 rounded border border-yellow-400/20">XML</span>
          </div>
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Upload className="h-5 w-5 mr-2" />
            Choose Files
          </button>
        </div>
      </div>
    </div>
  );
};

export const UploadsImport: React.FC = () => {
  const [imports] = useState<DataImport[]>(sampleImports);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSourceType, setFilterSourceType] = useState<string>('all');

  const filteredImports = useMemo(() => imports.filter(importData => {
    const matchesSearch = importData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         importData.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         importData.fileName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || importData.status === filterStatus;
    const matchesSourceType = filterSourceType === 'all' || importData.sourceType === filterSourceType;
    
    return matchesSearch && matchesStatus && matchesSourceType;
  }), [imports, searchTerm, filterStatus, filterSourceType]);

  const stats = useMemo(() => ({
    total: imports.length,
    completed: imports.filter(i => i.status === 'completed').length,
    processing: imports.filter(i => i.status === 'processing').length,
    validating: imports.filter(i => i.status === 'validating').length,
    failed: imports.filter(i => i.status === 'failed').length,
    uploaded: imports.filter(i => i.status === 'uploaded').length,
    totalRecords: imports.reduce((sum, i) => sum + i.totalRecords, 0),
    importedRecords: imports.reduce((sum, i) => sum + i.importedRecords, 0),
    errorRecords: imports.reduce((sum, i) => sum + i.errorRecords, 0),
    totalSize: imports.reduce((sum, i) => sum + i.fileSize, 0),
    avgSuccessRate: imports.filter(i => i.status === 'completed').length > 0 ? 
      imports.filter(i => i.status === 'completed').reduce((sum, i) => sum + (i.importedRecords / i.totalRecords * 100), 0) / 
      imports.filter(i => i.status === 'completed').length : 0,
    csvImports: imports.filter(i => i.sourceType === 'csv').length,
    excelImports: imports.filter(i => i.sourceType === 'excel').length,
    jsonImports: imports.filter(i => i.sourceType === 'json').length
  }), [imports]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Uploads & Import Center</h1>
          <p className="mt-1 text-sm text-slate-400">
            Upload, validate, and import data from various sources with automated processing
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Settings className="h-4 w-4 mr-2" />
            Import Settings
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Download Templates
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Imports</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <Upload className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Processing</p>
                <p className="text-2xl font-bold text-blue-400">{stats.processing}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Validating</p>
                <p className="text-2xl font-bold text-purple-400">{stats.validating}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Failed</p>
                <p className="text-2xl font-bold text-red-400">{stats.failed}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">CSV Files</p>
                <p className="text-2xl font-bold text-green-400">{stats.csvImports}</p>
              </div>
              <FileText className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Excel Files</p>
                <p className="text-2xl font-bold text-orange-400">{stats.excelImports}</p>
              </div>
              <Database className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">JSON Files</p>
                <p className="text-2xl font-bold text-indigo-400">{stats.jsonImports}</p>
              </div>
              <Database className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Records Imported</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.importedRecords.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Error Records</p>
                <p className="text-2xl font-bold text-red-400">{stats.errorRecords.toLocaleString()}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Success Rate</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.avgSuccessRate.toFixed(1)}%</p>
              </div>
              <Award className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Size</p>
                <p className="text-xl font-bold text-pink-400">{formatFileSize(stats.totalSize)}</p>
              </div>
              <Archive className="h-8 w-8 text-pink-400" />
            </div>
          </div>
        </div>

        {/* Upload Zone */}
        <UploadZone />

        {/* Filters */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search imports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg w-full text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="validating">Validating</option>
              <option value="failed">Failed</option>
              <option value="uploaded">Uploaded</option>
            </select>
            <select
              value={filterSourceType}
              onChange={(e) => setFilterSourceType(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All File Types</option>
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
              <option value="json">JSON</option>
              <option value="xml">XML</option>
              <option value="api">API</option>
              <option value="database">Database</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredImports.length}</span> imports
            </div>
          </div>
        </div>

        {/* Imports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredImports.map((importData) => (
            <ImportCard key={importData.id} importData={importData} />
          ))}
        </div>

        {filteredImports.length === 0 && (
          <div className="text-center py-12">
            <Upload className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No imports found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or upload a new file.</p>
          </div>
        )}
      </div>
    </div>
  );
};