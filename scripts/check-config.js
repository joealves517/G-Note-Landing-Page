#!/usr/bin/env node

/**
 * Configuration checker for G-Note AI Landing Page
 * Run: node scripts/check-config.js
 */

const fs = require('fs');
const path = require('path');

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

function readFile(filePath) {
  try {
    return fs.readFileSync(path.join(__dirname, '..', filePath), 'utf8');
  } catch (error) {
    return null;
  }
}

function checkConfig() {
  log('\n🔍 Configuration Checker\n', colors.bright);

  let hasErrors = false;
  let hasWarnings = false;

  // Check vite.config.ts
  log('1. Checking vite.config.ts...', colors.blue);
  const viteConfig = readFile('vite.config.ts');
  if (viteConfig) {
    if (viteConfig.includes("base: '/'")) {
      log('✅ Base URL is correct: /', colors.green);
    } else if (viteConfig.includes("base: '/home/'")) {
      log('❌ Base URL is still /home/ - should be /', colors.red);
      log('   Fix: Change base: \'/home/\' to base: \'/\'', colors.yellow);
      hasErrors = true;
    } else {
      log('⚠️  Base URL not found or unusual', colors.yellow);
      hasWarnings = true;
    }
  } else {
    log('❌ vite.config.ts not found', colors.red);
    hasErrors = true;
  }

  // Check urls.ts
  log('\n2. Checking src/lib/urls.ts...', colors.blue);
  const urlsConfig = readFile('src/lib/urls.ts');
  if (urlsConfig) {
    if (urlsConfig.includes('www.gnoteai.com')) {
      log('✅ Landing page URL is correct: www.gnoteai.com', colors.green);
    } else if (urlsConfig.includes('gnoteai.com') && !urlsConfig.includes('www.gnoteai.com')) {
      log('⚠️  URL might need www prefix', colors.yellow);
      log('   Current: gnoteai.com', colors.yellow);
      log('   Expected: www.gnoteai.com', colors.yellow);
      hasWarnings = true;
    }

    if (urlsConfig.includes('APP: \'https://gnoteai.com\'')) {
      log('✅ Main app URL is correct: gnoteai.com (no www)', colors.green);
    }
  } else {
    log('❌ src/lib/urls.ts not found', colors.red);
    hasErrors = true;
  }

  // Check firebase.json
  log('\n3. Checking firebase.json...', colors.blue);
  const firebaseConfig = readFile('firebase.json');
  if (firebaseConfig) {
    try {
      const config = JSON.parse(firebaseConfig);
      
      if (config.hosting) {
        log('✅ Hosting configuration found', colors.green);
        
        if (config.hosting.public === 'dist') {
          log('✅ Public directory is correct: dist', colors.green);
        } else {
          log(`⚠️  Public directory is: ${config.hosting.public}`, colors.yellow);
          hasWarnings = true;
        }

        if (config.hosting.rewrites) {
          log('✅ SPA rewrites configured', colors.green);
        } else {
          log('⚠️  No rewrites found - SPA routing might not work', colors.yellow);
          hasWarnings = true;
        }

        if (config.hosting.headers) {
          log('✅ Caching headers configured', colors.green);
        } else {
          log('⚠️  No caching headers - performance might be affected', colors.yellow);
          hasWarnings = true;
        }
      } else {
        log('❌ No hosting configuration found', colors.red);
        hasErrors = true;
      }
    } catch (error) {
      log('❌ Invalid JSON in firebase.json', colors.red);
      hasErrors = true;
    }
  } else {
    log('❌ firebase.json not found', colors.red);
    hasErrors = true;
  }

  // Check .firebaserc
  log('\n4. Checking .firebaserc...', colors.blue);
  const firebaserc = readFile('.firebaserc');
  if (firebaserc) {
    try {
      const config = JSON.parse(firebaserc);
      if (config.projects && config.projects.default) {
        log(`✅ Firebase project: ${config.projects.default}`, colors.green);
        if (config.projects.default === 'g-note-e02cd') {
          log('⚠️  Using main project ID - should use separate project', colors.yellow);
          log('   Create new Firebase project for landing page', colors.yellow);
          hasWarnings = true;
        }
      } else {
        log('❌ No default project configured', colors.red);
        hasErrors = true;
      }
    } catch (error) {
      log('❌ Invalid JSON in .firebaserc', colors.red);
      hasErrors = true;
    }
  } else {
    log('❌ .firebaserc not found', colors.red);
    hasErrors = true;
  }

  // Check package.json
  log('\n5. Checking package.json...', colors.blue);
  const packageJson = readFile('package.json');
  if (packageJson) {
    try {
      const pkg = JSON.parse(packageJson);
      
      if (pkg.name) {
        log(`✅ Package name: ${pkg.name}`, colors.green);
      }

      if (pkg.scripts) {
        const requiredScripts = ['dev', 'build', 'preview'];
        requiredScripts.forEach(script => {
          if (pkg.scripts[script]) {
            log(`✅ Script "${script}" found`, colors.green);
          } else {
            log(`❌ Script "${script}" missing`, colors.red);
            hasErrors = true;
          }
        });
      }

      // Check dependencies
      const requiredDeps = ['react', 'react-dom', 'react-router-dom', 'i18next'];
      requiredDeps.forEach(dep => {
        if (pkg.dependencies && pkg.dependencies[dep]) {
          log(`✅ Dependency "${dep}" found`, colors.green);
        } else {
          log(`⚠️  Dependency "${dep}" not found`, colors.yellow);
          hasWarnings = true;
        }
      });
    } catch (error) {
      log('❌ Invalid JSON in package.json', colors.red);
      hasErrors = true;
    }
  } else {
    log('❌ package.json not found', colors.red);
    hasErrors = true;
  }

  // Check tsconfig.json
  log('\n6. Checking tsconfig.json...', colors.blue);
  const tsconfig = readFile('tsconfig.json');
  if (tsconfig) {
    try {
      const config = JSON.parse(tsconfig);
      if (config.compilerOptions) {
        log('✅ TypeScript configuration found', colors.green);
        
        if (config.compilerOptions.jsx === 'react-jsx') {
          log('✅ JSX configuration correct', colors.green);
        }

        if (config.compilerOptions.paths && config.compilerOptions.paths['@/*']) {
          log('✅ Path aliases configured', colors.green);
        }
      }
    } catch (error) {
      log('❌ Invalid JSON in tsconfig.json', colors.red);
      hasErrors = true;
    }
  } else {
    log('❌ tsconfig.json not found', colors.red);
    hasErrors = true;
  }

  // Check .gitignore
  log('\n7. Checking .gitignore...', colors.blue);
  const gitignore = readFile('.gitignore');
  if (gitignore) {
    const requiredIgnores = ['node_modules', 'dist', '.env'];
    requiredIgnores.forEach(pattern => {
      if (gitignore.includes(pattern)) {
        log(`✅ Ignoring ${pattern}`, colors.green);
      } else {
        log(`⚠️  Not ignoring ${pattern}`, colors.yellow);
        hasWarnings = true;
      }
    });
  } else {
    log('⚠️  .gitignore not found', colors.yellow);
    hasWarnings = true;
  }

  // Summary
  log('\n' + '='.repeat(50), colors.bright);
  if (!hasErrors && !hasWarnings) {
    log('✅ All checks passed!', colors.green);
    log('Configuration is ready for deployment.', colors.green);
  } else if (hasErrors) {
    log('❌ Configuration has errors', colors.red);
    log('Please fix the errors before deploying.', colors.red);
  } else if (hasWarnings) {
    log('⚠️  Configuration has warnings', colors.yellow);
    log('Review warnings before deploying.', colors.yellow);
  }
  log('='.repeat(50) + '\n', colors.bright);

  return hasErrors ? 1 : 0;
}

const exitCode = checkConfig();
process.exit(exitCode);
