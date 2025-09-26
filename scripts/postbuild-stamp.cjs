#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DIST_DIR = path.join(__dirname, '..', 'dist');

function createVersionFile() {
  const version = {
    version: '1.0.0',
    buildDate: new Date().toISOString(),
    gitCommit: process.env.GIT_COMMIT || 'unknown',
    environment: process.env.NODE_ENV || 'production',
    features: {
      sqlBackend: process.env.VITE_USE_SQL_BACKEND === 'true',
      notifications: true,
      pwa: true,
      rbac: true
    }
  };

  fs.writeFileSync(
    path.join(DIST_DIR, 'version.json'),
    JSON.stringify(version, null, 2)
  );

  console.log('✅ Created version.json');
}

function createHealthFile() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      build: 'ok',
      assets: 'ok',
      manifest: 'ok'
    }
  };

  // Check if critical files exist
  const criticalFiles = [
    'index.html',
    'manifest.webmanifest',
    'assets'
  ];

  criticalFiles.forEach(file => {
    const filePath = path.join(DIST_DIR, file);
    if (!fs.existsSync(filePath)) {
      health.checks[file] = 'missing';
      health.status = 'degraded';
    }
  });

  fs.writeFileSync(
    path.join(DIST_DIR, 'health.txt'),
    `Status: ${health.status}\nTimestamp: ${health.timestamp}\nBuild: OK\n`
  );

  console.log('✅ Created health.txt');
}

function calculateChecksums() {
  const indexPath = path.join(DIST_DIR, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath);
    const sha256 = crypto.createHash('sha256').update(content).digest('hex');
    const sha1 = crypto.createHash('sha1').update(content).digest('hex');
    
    fs.writeFileSync(path.join(DIST_DIR, 'index.html.sha256'), sha256);
    fs.writeFileSync(path.join(DIST_DIR, 'index.html.sha1'), sha1);
    
    console.log('✅ Created checksums for index.html');
  }
}

function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist directory not found');
    process.exit(1);
  }

  console.log('🔨 Post-build stamping...');
  
  createVersionFile();
  createHealthFile();
  calculateChecksums();
  
  console.log('✅ Post-build stamping complete');
}

if (require.main === module) {
  main();
}

module.exports = { createVersionFile, createHealthFile, calculateChecksums };