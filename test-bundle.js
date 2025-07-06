#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing JS bundle creation...');

try {
  // Create assets directory if it doesn't exist
  const assetsDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Create res directory if it doesn't exist
  const resDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');
  if (!fs.existsSync(resDir)) {
    fs.mkdirSync(resDir, { recursive: true });
  }

  // Run the bundle command
  const command = 'npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/';
  
  console.log('Running:', command);
  execSync(command, { stdio: 'inherit' });
  
  console.log('✅ Bundle created successfully!');
  
  // Check if bundle file exists
  const bundlePath = path.join(__dirname, 'android', 'app', 'src', 'main', 'assets', 'index.android.bundle');
  if (fs.existsSync(bundlePath)) {
    const stats = fs.statSync(bundlePath);
    console.log(`📦 Bundle size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  } else {
    console.log('❌ Bundle file not found');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Bundle creation failed:', error.message);
  process.exit(1);
} 