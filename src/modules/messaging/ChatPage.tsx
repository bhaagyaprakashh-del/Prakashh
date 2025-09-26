import React, { useState, useEffect } from 'react';
import { TAWK, STORAGE_KEYS } from './config';
import { TawkConfig } from './types';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export const ChatPage: React.FC = () => {
  const [config, setConfig] = useState<TawkConfig>(TAWK);
  const [showSettings, setShowSettings] = useState(false);
  const [tempConfig, setTempConfig] = useState<TawkConfig>(TAWK);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load config from localStorage
    const saved = localStorage.getItem(STORAGE_KEYS.TAWK_CONFIG);
    if (saved) {
      try {
        const savedConfig = JSON.parse(saved);
        setConfig(savedConfig);
        setTempConfig(savedConfig);
      } catch (error) {
        console.error('Failed to parse Tawk config:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Load Tawk widget if config is valid
    if (config.propertyId && config.widgetId && 
        config.propertyId !== 'YOUR_TAWK_PROPERTY_ID' && 
        config.widgetId !== 'YOUR_WIDGET_ID') {
      loadTawkWidget();
    }

    return () => {
      // Cleanup on unmount
      if (window.Tawk_API) {
        try {
          window.Tawk_API.onLoad = null;
          window.Tawk_API.onStatusChange = null;
        } catch (error) {
          console.error('Tawk cleanup error:', error);
        }
      }
    };
  }, [config]);

  const loadTawkWidget = () => {
    // Remove existing script if present
    const existingScript = document.getElementById('tawk-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Reset Tawk
    if (window.Tawk_API) {
      delete window.Tawk_API;
      delete window.Tawk_LoadStart;
    }

    // Create new script
    const script = document.createElement('script');
    script.id = 'tawk-script';
    script.async = true;
    script.src = `https://embed.tawk.to/${config.propertyId}/${config.widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load Tawk widget');
      setIsLoaded(false);
    };

    document.head.appendChild(script);

    // Initialize Tawk
    window.Tawk_LoadStart = new Date();
  };

  const handleSaveConfig = () => {
    if (!tempConfig.propertyId.trim() || !tempConfig.widgetId.trim()) {
      alert('Please enter both Property ID and Widget ID');
      return;
    }

    setConfig(tempConfig);
    localStorage.setItem(STORAGE_KEYS.TAWK_CONFIG, JSON.stringify(tempConfig));
    setShowSettings(false);
    setIsLoaded(false);
  };

  const isConfigValid = config.propertyId && config.widgetId && 
                       config.propertyId !== 'YOUR_TAWK_PROPERTY_ID' && 
                       config.widgetId !== 'YOUR_WIDGET_ID';

  return (
    <div className="kanban-background min-h-screen">
      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Chat (Tawk)</h1>
            <p className="text-gray-300">
              Live chat widget integration for customer support
            </p>
          </div>

          <div className="glass p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Tawk Configuration</h2>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><strong>Property ID:</strong> {config.propertyId}</p>
                  <p><strong>Widget ID:</strong> {config.widgetId}</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      isConfigValid 
                        ? isLoaded 
                          ? 'bg-green-600 text-white' 
                          : 'bg-yellow-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}>
                      {isConfigValid 
                        ? isLoaded 
                          ? 'Loaded' 
                          : 'Loading...'
                        : 'Not Configured'
                      }
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Change IDs
              </button>
            </div>

            {!isConfigValid && (
              <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 mb-4">
                <p className="text-yellow-200 text-sm">
                  ⚠️ Please configure your Tawk Property ID and Widget ID to enable the chat widget.
                </p>
              </div>
            )}

            {showSettings && (
              <div className="glass-strong p-4 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-4">Update Tawk Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Property ID
                    </label>
                    <input
                      type="text"
                      value={tempConfig.propertyId}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, propertyId: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 1a2b3c4d5e6f7g8h9i"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Widget ID
                    </label>
                    <input
                      type="text"
                      value={tempConfig.widgetId}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, widgetId: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 1j2k3l4m5n"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveConfig}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      Save & Apply
                    </button>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="glass p-6">
            <h2 className="text-xl font-semibold text-white mb-4">How to Get Tawk IDs</h2>
            <div className="text-gray-300 space-y-2 text-sm">
              <p>1. Sign up or log in to <a href="https://tawk.to" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">tawk.to</a></p>
              <p>2. Go to Administration → Chat Widget</p>
              <p>3. Copy the Property ID and Widget ID from the embed code</p>
              <p>4. The embed code looks like: <code className="bg-gray-800 px-2 py-1 rounded">https://embed.tawk.to/PROPERTY_ID/WIDGET_ID</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};