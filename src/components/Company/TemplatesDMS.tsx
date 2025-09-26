import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  FileText,
  Download,
  Upload,
  Eye,
  Copy,
  Share2,
  Filter,
  Calendar,
  User,
  Tag,
  Folder,
  File,
  Image,
  Video,
  Archive,
  Settings,
  MoreVertical,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Paperclip,
  Link,
  Lock,
  Unlock,
  Users,
  Globe,
  Shield
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'agreement' | 'receipt' | 'notice' | 'form' | 'letter' | 'report' | 'certificate';
  type: 'template' | 'document';
  fileType: 'pdf' | 'docx' | 'xlsx' | 'txt' | 'html';
  size: number; // in bytes
  version: string;
  status: 'active' | 'draft' | 'archived' | 'deprecated';
  visibility: 'public' | 'private' | 'restricted';
  tags: string[];
  
  // Template specific
  mergeFields?: string[];
  isSystemTemplate: boolean;
  
  // Document specific
  originalFileName?: string;
  uploadedBy?: string;
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  lastUsed?: string;
  usageCount: number;
  
  // Access control
  permissions: {
    canView: string[];
    canEdit: string[];
    canDelete: string[];
  };
  
  // File info
  url?: string;
  thumbnailUrl?: string;
  checksum?: string;
}

const sampleTemplates: Template[] = [
  {
    id: '1',
    name: 'Chit Fund Agreement Template',
    description: 'Standard agreement template for new chit fund subscribers with all legal clauses',
    category: 'agreement',
    type: 'template',
    fileType: 'pdf',
    size: 245760, // 240 KB
    version: '2.1',
    status: 'active',
    visibility: 'public',
    tags: ['legal', 'agreement', 'chit-fund', 'subscriber'],
    mergeFields: ['subscriber_name', 'scheme_name', 'ticket_value', 'duration', 'start_date', 'branch_name'],
    isSystemTemplate: true,
    createdAt: '2020-01-15',
    createdBy: 'prakashh@ramnirmalchits.com',
    updatedAt: '2024-02-15',
    updatedBy: 'legal@ramnirmalchits.com',
    lastUsed: '2024-03-14',
    usageCount: 1250,
    permissions: {
      canView: ['all'],
      canEdit: ['admin', 'legal'],
      canDelete: ['admin']
    },
    url: '/templates/chit-agreement-v2.1.pdf',
    thumbnailUrl: '/thumbnails/chit-agreement.png'
  },
  {
    id: '2',
    name: 'Payment Receipt Template',
    description: 'Receipt template for chit fund installment payments with tax calculations',
    category: 'receipt',
    type: 'template',
    fileType: 'html',
    size: 15360, // 15 KB
    version: '1.5',
    status: 'active',
    visibility: 'public',
    tags: ['receipt', 'payment', 'installment', 'tax'],
    mergeFields: ['receipt_number', 'member_name', 'amount', 'payment_date', 'scheme_name', 'month', 'balance'],
    isSystemTemplate: true,
    createdAt: '2020-02-01',
    createdBy: 'accounts@ramnirmalchits.com',
    updatedAt: '2024-01-20',
    updatedBy: 'accounts@ramnirmalchits.com',
    lastUsed: '2024-03-15',
    usageCount: 8750,
    permissions: {
      canView: ['all'],
      canEdit: ['admin', 'accounts'],
      canDelete: ['admin']
    },
    url: '/templates/payment-receipt-v1.5.html'
  },
  {
    id: '3',
    name: 'Auction Notice Template',
    description: 'Notice template for upcoming chit fund auctions with all required details',
    category: 'notice',
    type: 'template',
    fileType: 'docx',
    size: 51200, // 50 KB
    version: '1.3',
    status: 'active',
    visibility: 'public',
    tags: ['auction', 'notice', 'announcement', 'members'],
    mergeFields: ['auction_date', 'auction_time', 'scheme_name', 'month', 'venue', 'contact_person'],
    isSystemTemplate: false,
    createdAt: '2020-03-10',
    createdBy: 'operations@ramnirmalchits.com',
    updatedAt: '2023-12-05',
    updatedBy: 'operations@ramnirmalchits.com',
    lastUsed: '2024-03-10',
    usageCount: 420,
    permissions: {
      canView: ['all'],
      canEdit: ['admin', 'operations', 'branch-manager'],
      canDelete: ['admin']
    },
    url: '/templates/auction-notice-v1.3.docx'
  },
  {
    id: '4',
    name: 'Member Registration Form',
    description: 'Comprehensive form for new member registration with KYC requirements',
    category: 'form',
    type: 'template',
    fileType: 'pdf',
    size: 102400, // 100 KB
    version: '3.0',
    status: 'active',
    visibility: 'public',
    tags: ['registration', 'kyc', 'member', 'form'],
    mergeFields: ['member_name', 'address', 'phone', 'email', 'id_proof', 'address_proof'],
    isSystemTemplate: true,
    createdAt: '2020-01-20',
    createdBy: 'hr@ramnirmalchits.com',
    updatedAt: '2024-03-01',
    updatedBy: 'compliance@ramnirmalchits.com',
    lastUsed: '2024-03-13',
    usageCount: 2100,
    permissions: {
      canView: ['all'],
      canEdit: ['admin', 'hr', 'compliance'],
      canDelete: ['admin']
    },
    url: '/templates/member-registration-v3.0.pdf'
  },
  {
    id: '5',
    name: 'Monthly Collection Report',
    description: 'Template for generating monthly collection reports by branch',
    category: 'report',
    type: 'template',
    fileType: 'xlsx',
    size: 81920, // 80 KB
    version: '2.2',
    status: 'active',
    visibility: 'restricted',
    tags: ['report', 'collection', 'monthly', 'branch'],
    mergeFields: ['month', 'year', 'branch_name', 'total_collection', 'pending_amount', 'schemes_list'],
    isSystemTemplate: false,
    createdAt: '2020-04-15',
    createdBy: 'reports@ramnirmalchits.com',
    updatedAt: '2024-02-28',
    updatedBy: 'reports@ramnirmalchits.com',
    lastUsed: '2024-03-01',
    usageCount: 360,
    permissions: {
      canView: ['admin', 'branch-manager', 'accounts'],
      canEdit: ['admin', 'reports'],
      canDelete: ['admin']
    },
    url: '/templates/monthly-collection-report-v2.2.xlsx'
  },
  {
    id: '6',
    name: 'Completion Certificate',
    description: 'Certificate template for members who complete their chit fund tenure',
    category: 'certificate',
    type: 'template',
    fileType: 'pdf',
    size: 204800, // 200 KB
    version: '1.1',
    status: 'active',
    visibility: 'public',
    tags: ['certificate', 'completion', 'achievement', 'member'],
    mergeFields: ['member_name', 'scheme_name', 'completion_date', 'total_amount', 'certificate_number'],
    isSystemTemplate: false,
    createdAt: '2021-01-10',
    createdBy: 'operations@ramnirmalchits.com',
    updatedAt: '2023-08-15',
    updatedBy: 'operations@ramnirmalchits.com',
    lastUsed: '2024-02-20',
    usageCount: 180,
    permissions: {
      canView: ['all'],
      canEdit: ['admin', 'operations'],
      canDelete: ['admin']
    },
    url: '/templates/completion-certificate-v1.1.pdf'
  },
  {
    id: '7',
    name: 'Company Policy Document',
    description: 'Internal company policies and procedures document',
    category: 'form',
    type: 'document',
    fileType: 'pdf',
    size: 1048576, // 1 MB
    version: '4.0',
    status: 'active',
    visibility: 'private',
    tags: ['policy', 'internal', 'procedures', 'hr'],
    originalFileName: 'company-policies-2024.pdf',
    uploadedBy: 'hr@ramnirmalchits.com',
    isSystemTemplate: false,
    createdAt: '2024-01-01',
    createdBy: 'hr@ramnirmalchits.com',
    updatedAt: '2024-03-01',
    updatedBy: 'hr@ramnirmalchits.com',
    lastUsed: '2024-03-12',
    usageCount: 45,
    permissions: {
      canView: ['admin', 'hr', 'management'],
      canEdit: ['admin', 'hr'],
      canDelete: ['admin']
    },
    url: '/documents/company-policies-v4.0.pdf'
  },
  {
    id: '8',
    name: 'Audit Checklist Template',
    description: 'Comprehensive checklist for internal and external audits',
    category: 'form',
    type: 'template',
    fileType: 'xlsx',
    size: 122880, // 120 KB
    version: '1.0',
    status: 'draft',
    visibility: 'restricted',
    tags: ['audit', 'checklist', 'compliance', 'finance'],
    mergeFields: ['audit_date', 'auditor_name', 'branch_name', 'audit_type', 'findings'],
    isSystemTemplate: false,
    createdAt: '2024-02-15',
    createdBy: 'audit@ramnirmalchits.com',
    updatedAt: '2024-03-10',
    updatedBy: 'audit@ramnirmalchits.com',
    usageCount: 5,
    permissions: {
      canView: ['admin', 'audit', 'compliance'],
      canEdit: ['admin', 'audit'],
      canDelete: ['admin']
    },
    url: '/templates/audit-checklist-v1.0.xlsx'
  }
];

const TemplateCard: React.FC<{ template: Template }> = React.memo(({ template }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'deprecated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'agreement': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'receipt': return 'bg-green-100 text-green-800 border-green-200';
      case 'notice': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'form': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'letter': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'report': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'certificate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return Globe;
      case 'private': return Lock;
      case 'restricted': return Shield;
      default: return Globe;
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return FileText;
      case 'docx': return FileText;
      case 'xlsx': return File;
      case 'html': return File;
      case 'txt': return FileText;
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

  const VisibilityIcon = getVisibilityIcon(template.visibility);
  const FileIcon = getFileIcon(template.fileType);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-yellow-400/30">
            <FileIcon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-50 flex items-center">
              {template.name}
              {template.isSystemTemplate && (
                <Lock className="h-4 w-4 ml-2 text-yellow-400" title="System Template" />
              )}
            </h3>
            <p className="text-sm text-slate-400">v{template.version} • {template.fileType.toUpperCase()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(template.category)}`}>
            {template.category.toUpperCase()}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(template.status)}`}>
            {template.status.toUpperCase()}
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 rounded-lg transition-all">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-4">{template.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">File Size</span>
            <span className="text-slate-50 font-medium">{formatFileSize(template.size)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Usage Count</span>
            <span className="text-slate-50 font-medium">{template.usageCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Visibility</span>
            <div className="flex items-center space-x-1">
              <VisibilityIcon className="h-3 w-3 text-slate-400" />
              <span className="text-slate-50 font-medium capitalize">{template.visibility}</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Type</span>
            <span className="text-slate-50 font-medium capitalize">{template.type}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Last Used</span>
            <span className="text-slate-300">{template.lastUsed ? new Date(template.lastUsed).toLocaleDateString() : 'Never'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Updated</span>
            <span className="text-slate-300">{new Date(template.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Merge Fields Preview */}
      {template.mergeFields && template.mergeFields.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">Merge Fields:</p>
          <div className="flex flex-wrap gap-1">
            {template.mergeFields.slice(0, 3).map((field, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-200">
                {field}
              </span>
            ))}
            {template.mergeFields.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800 border border-slate-200">
                +{template.mergeFields.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Tags */}
      {template.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 4).map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                #{tag}
              </span>
            ))}
            {template.tags.length > 4 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800 border border-slate-200">
                +{template.tags.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Created {new Date(template.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="Preview">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all" title="Download">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all" title="Duplicate">
            <Copy className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all" title="Share">
            <Share2 className="h-4 w-4" />
          </button>
          {!template.isSystemTemplate && (
            <>
              <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all" title="Edit">
                <Edit className="h-4 w-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

const TemplateTable: React.FC<{ templates: Template[] }> = React.memo(({ templates }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-yellow-400/30 overflow-hidden">
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50 border-b border-yellow-400/20 sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Template</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Category & Type</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">File Info</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Usage</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-yellow-400/20">
            {templates.map((template) => (
              <tr key={template.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg border border-yellow-400/30">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-50 flex items-center">
                        {template.name}
                        {template.isSystemTemplate && (
                          <Lock className="h-3 w-3 ml-1 text-yellow-400" />
                        )}
                      </p>
                      <p className="text-xs text-slate-400">v{template.version}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-1">
                      {template.category}
                    </span>
                    <p className="text-xs text-slate-400 capitalize">{template.type}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm text-slate-50">{template.fileType.toUpperCase()}</p>
                    <p className="text-xs text-slate-400">{formatFileSize(template.size)}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-slate-50">{template.usageCount}</p>
                    <p className="text-xs text-slate-400">
                      {template.lastUsed ? `Last: ${new Date(template.lastUsed).toLocaleDateString()}` : 'Never used'}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                    {template.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {new Date(template.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300" title="Preview">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-green-400 hover:text-green-300" title="Download">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="text-purple-400 hover:text-purple-300" title="Duplicate">
                      <Copy className="h-4 w-4" />
                    </button>
                    {!template.isSystemTemplate && (
                      <>
                        <button className="text-orange-400 hover:text-orange-300" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-300" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export const TemplatesDMS: React.FC = () => {
  const [templates] = useState<Template[]>(sampleTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterVisibility, setFilterVisibility] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredTemplates = useMemo(() => templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || template.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
    const matchesType = filterType === 'all' || template.type === filterType;
    const matchesVisibility = filterVisibility === 'all' || template.visibility === filterVisibility;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesType && matchesVisibility;
  }), [templates, searchTerm, filterStatus, filterCategory, filterType, filterVisibility]);

  const stats = useMemo(() => ({
    total: templates.length,
    active: templates.filter(t => t.status === 'active').length,
    draft: templates.filter(t => t.status === 'draft').length,
    archived: templates.filter(t => t.status === 'archived').length,
    deprecated: templates.filter(t => t.status === 'deprecated').length,
    templates: templates.filter(t => t.type === 'template').length,
    documents: templates.filter(t => t.type === 'document').length,
    systemTemplates: templates.filter(t => t.isSystemTemplate).length,
    customTemplates: templates.filter(t => !t.isSystemTemplate).length,
    totalUsage: templates.reduce((sum, t) => sum + t.usageCount, 0),
    totalSize: templates.reduce((sum, t) => sum + t.size, 0)
  }), [templates]);

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
          <h1 className="text-2xl font-bold text-slate-50">Templates & Document Management</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage document templates, forms, and file storage with merge fields and version control
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-yellow-400/30 text-sm font-medium rounded-lg text-slate-50 bg-slate-700/50 hover:bg-slate-700 transition-all backdrop-blur-sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-11 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Items</p>
                <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Templates</p>
                <p className="text-2xl font-bold text-purple-400">{stats.templates}</p>
              </div>
              <File className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Documents</p>
                <p className="text-2xl font-bold text-orange-400">{stats.documents}</p>
              </div>
              <Folder className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active</p>
                <p className="text-2xl font-bold text-green-400">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Draft</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.draft}</p>
              </div>
              <Edit className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Archived</p>
                <p className="text-2xl font-bold text-gray-400">{stats.archived}</p>
              </div>
              <Archive className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">System</p>
                <p className="text-2xl font-bold text-red-400">{stats.systemTemplates}</p>
              </div>
              <Lock className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Custom</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.customTemplates}</p>
              </div>
              <Unlock className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Usage</p>
                <p className="text-2xl font-bold text-indigo-400">{stats.totalUsage.toLocaleString()}</p>
              </div>
              <Star className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/30 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Storage</p>
                <p className="text-xl font-bold text-pink-400">{formatFileSize(stats.totalSize)}</p>
              </div>
              <div className="h-8 w-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Archive className="h-5 w-5 text-pink-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search templates..."
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
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
              <option value="deprecated">Deprecated</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Categories</option>
              <option value="agreement">Agreement</option>
              <option value="receipt">Receipt</option>
              <option value="notice">Notice</option>
              <option value="form">Form</option>
              <option value="letter">Letter</option>
              <option value="report">Report</option>
              <option value="certificate">Certificate</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="all">All Types</option>
              <option value="template">Templates</option>
              <option value="document">Documents</option>
            </select>
            <div className="text-sm text-slate-400">
              Showing: <span className="font-semibold text-slate-50">{filteredTemplates.length}</span> items
            </div>
            <div className="flex bg-slate-700/50 backdrop-blur-sm rounded-lg p-1 border border-yellow-400/20">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-blue-500 text-slate-50'
                    : 'text-slate-300 hover:text-slate-50'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'table'
                    ? 'bg-blue-500 text-slate-50'
                    : 'text-slate-300 hover:text-slate-50'
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Templates Display */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <TemplateTable templates={filteredTemplates} />
        )}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-50 mb-2">No templates found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search criteria or create a new template.</p>
          </div>
        )}
      </div>
    </div>
  );
};