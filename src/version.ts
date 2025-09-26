// Auto-generated version info
export const VERSION_INFO = {
  version: '1.0.0',
  buildDate: new Date().toISOString(),
  gitCommit: process.env.VITE_GIT_COMMIT || 'unknown',
  environment: import.meta.env.MODE,
  features: {
    sqlBackend: import.meta.env.VITE_USE_SQL_BACKEND === 'true',
    notifications: true,
    pwa: true,
    rbac: true
  }
};

export const getBuildInfo = () => {
  return {
    ...VERSION_INFO,
    userAgent: navigator.userAgent,
    timestamp: Date.now()
  };
};

export const logBuildInfo = () => {
  console.group('🚀 Chit Funds CRM - Build Info');
  console.log('Version:', VERSION_INFO.version);
  console.log('Build Date:', VERSION_INFO.buildDate);
  console.log('Environment:', VERSION_INFO.environment);
  console.log('Features:', VERSION_INFO.features);
  console.groupEnd();
};