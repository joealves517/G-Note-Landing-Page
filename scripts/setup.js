#!/usr/bin/env node

/**
 * Setup script for G-Note AI Landing Page
 * Run: node scripts/setup.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    return execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    log(`Error executing: ${command}`, colors.red);
    throw error;
  }
}

function checkFile(filePath) {
  return fs.existsSync(path.join(__dirname, '..', filePath));
}

async function main() {
  log('\n🚀 G-Note AI Landing Page Setup\n', colors.bright);

  // Check Node version
  log('1. Checking Node.js version...', colors.blue);
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion < 18) {
    log(`❌ Node.js ${nodeVersion} detected. Please upgrade to Node.js 18 or higher.`, colors.red);
    process.exit(1);
  }
  log(`✅ Node.js ${nodeVersion}`, colors.green);

  // Check required files
  log('\n2. Checking required files...', colors.blue);
  const requiredFiles = [
    'package.json',
    'vite.config.ts',
    'tsconfig.json',
    'firebase.json',
    '.firebaserc',
    'src/main.tsx',
    'src/App.tsx',
  ];

  let allFilesExist = true;
  for (const file of requiredFiles) {
    if (checkFile(file)) {
      log(`✅ ${file}`, colors.green);
    } else {
      log(`❌ ${file} not found`, colors.red);
      allFilesExist = false;
    }
  }

  if (!allFilesExist) {
    log('\n❌ Some required files are missing. Please check your setup.', colors.red);
    process.exit(1);
  }

  // Install dependencies
  log('\n3. Installing dependencies...', colors.blue);
  log('This may take a few minutes...', colors.yellow);
  try {
    exec('npm install');
    log('✅ Dependencies installed', colors.green);
  } catch (error) {
    log('❌ Failed to install dependencies', colors.red);
    process.exit(1);
  }

  // Check Firebase CLI
  log('\n4. Checking Firebase CLI...', colors.blue);
  try {
    execSync('firebase --version', { stdio: 'pipe' });
    log('✅ Firebase CLI installed', colors.green);
  } catch (error) {
    log('⚠️  Firebase CLI not found', colors.yellow);
    log('Install it with: npm install -g firebase-tools', colors.yellow);
  }

  // Build test
  log('\n5. Testing build...', colors.blue);
  try {
    exec('npm run build');
    log('✅ Build successful', colors.green);
  } catch (error) {
    log('❌ Build failed', colors.red);
    process.exit(1);
  }

  // Check dist folder
  if (checkFile('dist/index.html')) {
    log('✅ Build output verified', colors.green);
  } else {
    log('❌ Build output not found', colors.red);
    process.exit(1);
  }

  // Summary
  log('\n' + '='.repeat(50), colors.bright);
  log('✅ Setup completed successfully!', colors.green);
  log('='.repeat(50) + '\n', colors.bright);

  log('Next steps:', colors.bright);
  log('1. Run development server:', colors.blue);
  log('   npm run dev\n', colors.yellow);
  
  log('2. Configure Firebase:', colors.blue);
  log('   firebase login', colors.yellow);
  log('   firebase use <your-project-id>\n', colors.yellow);
  
  log('3. Deploy to Firebase:', colors.blue);
  log('   firebase deploy --only hosting\n', colors.yellow);

  log('4. Configure custom domain:', colors.blue);
  log('   See DEPLOYMENT.md for details\n', colors.yellow);

  log('📚 Documentation:', colors.bright);
  log('   - Quick Start: QUICK-START.md', colors.blue);
  log('   - Migration: MIGRATION-GUIDE.md', colors.blue);
  log('   - Deployment: DEPLOYMENT.md', colors.blue);
  log('   - README: README-STANDALONE.md\n', colors.blue);
}

main().catch((error) => {
  log('\n❌ Setup failed', colors.red);
  console.error(error);
  process.exit(1);
});
