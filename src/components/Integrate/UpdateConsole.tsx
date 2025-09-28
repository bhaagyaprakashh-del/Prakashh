import React, { useState } from 'react';
import {
  Upload,
  Download,
  Eye,
  Play,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Database,
  Target,
  Settings,
  ArrowRight,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { useIntegrationStore } from '../../stores/integrationStore';

interface UpdateRecord {
  id: string;
  data: Record<string, any>;
  status: 'pending' | 'success' | 'error' | 'skipped';
  error?: string;
  changes?: string[];
}

export const UpdateConsole: React.FC = () => {
  const { modules } = useIntegrationStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedModule, setSelectedModule] = useState('leads');
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [validatedData, setValidatedData] = useState<UpdateRecord[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [batchSize, setBatchSize] = useState(100);
  const [upsertMode, setUpsertMode] = useState(true);

  const steps = [
    { id: 1, name: 'Upload Data', icon: Upload },
    { id: 2, name: 'Validate', icon: CheckCircle },
    { id: 3, name: 'Preview Changes', icon: Eye },
    { id: 4, name: 'Execute', icon: Play }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          let data;
          if (file.type === 'application/json') {
            data = JSON.parse(e.target?.result as string);
          } else {
            // Mock CSV parsing
            const text = e.target?.result as string;
            const lines = text.split('\n');
            const headers = lines[0].split(',');
            data = lines.slice(1).map(line => {
              const values = line.split(',');
              return headers.reduce((obj, header, index) => {
                obj[header.trim()] = values[index]?.trim();
                return obj;
              }, {} as Record<string, string>);
            });
          }
          setUploadedData(Array.isArray(data) ? data : [data]);
          setCurrentStep(2);
        } catch (error) {
          console.error('Error parsing file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleValidate = () => {
    setIsProcessing(true);
    
    // Simulate validation
    setTimeout(() => {
      const validated = uploadedData.map((record, index) => ({
        id: `record_${index}`,
        data: record,
        status: Math.random() > 0.1 ? 'pending' : 'error' as const,
        error: Math.random() > 0.1 ? undefined : 'Invalid email format',
        changes: ['name', 'email', 'phone']
      }));
      
      setValidatedData(validated);
      setIsProcessing(false);
      setCurrentStep(3);
    }, 2000);
  };

  const handleExecute = () => {
    setIsProcessing(true);
    
    // Simulate execution
    setTimeout(() => {
      const executed = validatedData.map(record => ({
        ...record,
        status: record.status === 'error' ? 'error' : 
                Math.random() > 0.05 ? 'success' : 'error' as const
      }));
      
      setValidatedData(executed);
      setIsProcessing(false);
      setCurrentStep(4);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'skipped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'error': return XCircle;
      case 'pending': return AlertTriangle;
      case 'skipped': return Target;
      default: return AlertTriangle;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-slate-50">Target Module:</label>
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                >
                  {modules.map(module => (
                    <option key={module.id} value={module.id}>{module.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-2 border-dashed border-yellow-400/30 rounded-2xl p-12 text-center bg-slate-800/20 backdrop-blur-sm">
              <Upload className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-50 mb-2">Upload Data File</h3>
              <p className="text-slate-400 mb-6">Upload CSV or JSON file with your data</p>
              
              <input
                type="file"
                accept=".csv,.json"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <Upload className="h-5 w-5 mr-2" />
                Choose File
              </label>
              
              <div className="mt-4 text-sm text-slate-500">
                Supported formats: CSV, JSON (max 10MB)
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-50">Data Validation</h3>
                  <p className="text-sm text-slate-400">{uploadedData.length} records uploaded</p>
                </div>
                <button
                  onClick={handleValidate}
                  disabled={isProcessing}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  {isProcessing ? 'Validating...' : 'Validate Data'}
                </button>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
              <div className="p-4 border-b border-yellow-400/20">
                <h4 className="text-lg font-semibold text-slate-50">Sample Data Preview</h4>
              </div>
              <div className="overflow-x-auto max-h-96">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      {uploadedData[0] && Object.keys(uploadedData[0]).map(key => (
                        <th key={key} className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-yellow-400/20">
                    {uploadedData.slice(0, 10).map((record, index) => (
                      <tr key={index} className="hover:bg-slate-700/20">
                        {Object.values(record).map((value, i) => (
                          <td key={i} className="px-4 py-3 text-slate-50 text-sm">
                            {String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-50">Preview Changes</h3>
                  <p className="text-sm text-slate-400">
                    {validatedData.filter(r => r.status === 'pending').length} records ready for update
                  </p>
                </div>
                <div className="flex space-x-3">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-slate-50">Batch Size:</label>
                    <input
                      type="number"
                      value={batchSize}
                      onChange={(e) => setBatchSize(parseInt(e.target.value) || 100)}
                      className="w-20 px-2 py-1 bg-slate-700/50 border border-yellow-400/30 rounded text-slate-50 text-sm"
                    />
                  </div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={upsertMode}
                      onChange={(e) => setUpsertMode(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-slate-50">Upsert Mode</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
              <div className="overflow-x-auto max-h-96">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Record</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Changes</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Error</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-yellow-400/20">
                    {validatedData.map((record) => {
                      const StatusIcon = getStatusIcon(record.status);
                      return (
                        <tr key={record.id} className="hover:bg-slate-700/20">
                          <td className="px-4 py-3 text-slate-50 text-sm">
                            {record.data.name || record.data.email || record.id}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {record.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-300 text-sm">
                            {record.changes?.join(', ') || '-'}
                          </td>
                          <td className="px-4 py-3 text-red-400 text-sm">
                            {record.error || '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleExecute}
                disabled={isProcessing}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Play className="h-5 w-5 mr-2" />
                )}
                {isProcessing ? 'Executing...' : 'Execute Updates'}
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-6 border border-yellow-400/30">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 mx-auto text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-50 mb-2">Update Complete</h3>
                <p className="text-slate-400">Bulk update operation completed successfully</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">
                    {validatedData.filter(r => r.status === 'success').length}
                  </p>
                  <p className="text-sm text-slate-400">Successful</p>
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-400">
                    {validatedData.filter(r => r.status === 'error').length}
                  </p>
                  <p className="text-sm text-slate-400">Failed</p>
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-400">
                    {validatedData.filter(r => r.status === 'skipped').length}
                  </p>
                  <p className="text-sm text-slate-400">Skipped</p>
                </div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-50">{validatedData.length}</p>
                  <p className="text-sm text-slate-400">Total</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-3">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setUploadedData([]);
                  setValidatedData([]);
                }}
                className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Start New Update
              </button>
              <button
                onClick={() => {/* Download results */}}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Results
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Update Console</h1>
          <p className="mt-1 text-sm text-slate-400">
            Bulk update wizard with preview & confirmation
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="p-4 border-b border-yellow-400/30 bg-slate-800/40 backdrop-blur-xl flex-shrink-0">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  isActive ? 'bg-blue-500 border-blue-500 text-white' :
                  isCompleted ? 'bg-green-500 border-green-500 text-white' :
                  'bg-slate-700/50 border-yellow-400/30 text-slate-400'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-blue-400' :
                    isCompleted ? 'text-green-400' : 'text-slate-400'
                  }`}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-slate-600'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
        <div className="max-w-6xl mx-auto">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};