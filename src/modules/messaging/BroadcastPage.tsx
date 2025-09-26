import React, { useState, useEffect } from 'react';
import { Broadcast, Channel } from './types';
import { STORAGE_KEYS } from './config';

const SEGMENTS = [
  'All Subscribers',
  'New Leads',
  'High Value',
  'Active Customers',
  'Inactive Users'
];

const CHANNELS: { id: Channel; label: string; icon: string }[] = [
  { id: 'email', label: 'Email', icon: '📧' },
  { id: 'sms', label: 'SMS', icon: '📱' },
  { id: 'whatsapp', label: 'WhatsApp', icon: '💬' }
];

export const BroadcastPage: React.FC = () => {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [showComposer, setShowComposer] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    channels: [] as Channel[],
    segment: 'All Subscribers',
    scheduledAt: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadBroadcasts();
  }, []);

  const loadBroadcasts = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.BROADCASTS);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setBroadcasts(data.sort((a: Broadcast, b: Broadcast) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      } catch (error) {
        console.error('Failed to load broadcasts:', error);
      }
    }
  };

  const saveBroadcasts = (data: Broadcast[]) => {
    localStorage.setItem(STORAGE_KEYS.BROADCASTS, JSON.stringify(data));
    setBroadcasts(data);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    if (formData.channels.length === 0) {
      newErrors.channels = 'Select at least one channel';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      channels: [],
      segment: 'All Subscribers',
      scheduledAt: ''
    });
    setErrors({});
  };

  const handleChannelToggle = (channel: Channel) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
    if (errors.channels) {
      setErrors(prev => ({ ...prev, channels: '' }));
    }
  };

  const createBroadcast = (status: 'draft' | 'scheduled' | 'sent'): Broadcast => {
    return {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      message: formData.message.trim(),
      channels: formData.channels,
      segment: formData.segment,
      scheduledAt: status === 'scheduled' ? formData.scheduledAt : undefined,
      createdAt: new Date().toISOString(),
      status
    };
  };

  const handleSaveDraft = () => {
    if (!validateForm()) return;
    
    const broadcast = createBroadcast('draft');
    const updated = [broadcast, ...broadcasts];
    saveBroadcasts(updated);
    resetForm();
    setShowComposer(false);
  };

  const handleSendNow = () => {
    if (!validateForm()) return;
    
    const broadcast = createBroadcast('sent');
    const updated = [broadcast, ...broadcasts];
    saveBroadcasts(updated);
    resetForm();
    setShowComposer(false);
  };

  const handleSchedule = () => {
    if (!validateForm()) return;
    
    if (!formData.scheduledAt) {
      setErrors(prev => ({ ...prev, scheduledAt: 'Schedule date is required' }));
      return;
    }
    
    const broadcast = createBroadcast('scheduled');
    const updated = [broadcast, ...broadcasts];
    saveBroadcasts(updated);
    resetForm();
    setShowComposer(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this broadcast?')) {
      const updated = broadcasts.filter(b => b.id !== id);
      saveBroadcasts(updated);
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Title', 'Message', 'Channels', 'Segment', 'Status', 'Created', 'Scheduled'];
    const rows = broadcasts.map(b => [
      b.id,
      `"${b.title.replace(/"/g, '""')}"`,
      `"${b.message.replace(/"/g, '""')}"`,
      `"${b.channels.join(', ')}"`,
      `"${b.segment}"`,
      b.status,
      b.createdAt,
      b.scheduledAt || ''
    ]);
    
    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `broadcasts_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-600 text-white';
      case 'scheduled': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  const isFormValid = formData.title.trim() && formData.message.trim() && formData.channels.length > 0;

  return (
    <div className="kanban-background min-h-screen">
      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Broadcast</h1>
                <p className="text-gray-300">
                  Compose and send announcements to your audience
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowComposer(!showComposer)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  New Broadcast
                </button>
                <button
                  onClick={exportCSV}
                  disabled={broadcasts.length === 0}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {showComposer && (
            <div className="glass p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Compose Broadcast</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter broadcast title"
                    />
                    {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your message"
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Schedule (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.scheduledAt}
                      onChange={(e) => setFormData(prev => ({ ...prev, scheduledAt: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.scheduledAt && <p className="text-red-400 text-xs mt-1">{errors.scheduledAt}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Channels *
                    </label>
                    <div className="space-y-2">
                      {CHANNELS.map(channel => (
                        <label key={channel.id} className="flex items-center text-gray-300">
                          <input
                            type="checkbox"
                            checked={formData.channels.includes(channel.id)}
                            onChange={() => handleChannelToggle(channel.id)}
                            className="mr-3 rounded"
                          />
                          <span className="mr-2">{channel.icon}</span>
                          {channel.label}
                        </label>
                      ))}
                    </div>
                    {errors.channels && <p className="text-red-400 text-xs mt-1">{errors.channels}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Segment
                    </label>
                    <select
                      value={formData.segment}
                      onChange={(e) => setFormData(prev => ({ ...prev, segment: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {SEGMENTS.map(segment => (
                        <option key={segment} value={segment}>{segment}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleSaveDraft}
                  disabled={!isFormValid}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Save Draft
                </button>
                <button
                  onClick={handleSendNow}
                  disabled={!isFormValid}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send Now
                </button>
                <button
                  onClick={handleSchedule}
                  disabled={!isFormValid}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Schedule
                </button>
                <button
                  onClick={() => {
                    setShowComposer(false);
                    resetForm();
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="glass">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Broadcast History</h2>
            </div>
            
            {broadcasts.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                No broadcasts yet. Create your first broadcast to get started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Channels
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Segment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {broadcasts.map((broadcast) => (
                      <tr key={broadcast.id} className="hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div className="text-white font-medium">{broadcast.title}</div>
                          <div className="text-gray-400 text-sm truncate max-w-xs">
                            {broadcast.message}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            {broadcast.channels.map(channel => {
                              const channelInfo = CHANNELS.find(c => c.id === channel);
                              return (
                                <span key={channel} className="text-xs bg-gray-700 px-2 py-1 rounded">
                                  {channelInfo?.icon} {channelInfo?.label}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {broadcast.segment}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded ${getStatusColor(broadcast.status)}`}>
                            {broadcast.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-sm">
                          <div>{formatDate(broadcast.createdAt)}</div>
                          {broadcast.scheduledAt && (
                            <div className="text-xs text-blue-400">
                              Scheduled: {formatDate(broadcast.scheduledAt)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(broadcast.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};