import React from 'react';
import { useAppConfig } from '../../hooks/useAppConfig';

export const SidebarPage: React.FC = () => {
  const { config } = useAppConfig();

  return (
    <div className="p-6">
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30">
        <h3 className="text-lg font-semibold text-slate-50 mb-4">Sidebar Settings</h3>
        <p className="text-slate-400">Sidebar customization coming soon...</p>
      </div>
    </div>
  );
};