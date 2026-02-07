import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of all supported languages from main app
const languages = [
  'vi', 'ja', 'ko', 'zh-CN', 'zh-TW', 'de', 'fr', 'es', 'pt-BR', 
  'it', 'nl', 'ar', 'hi', 'tr', 'pl', 'th', 'id'
];

// Read the English template
const enTemplatePath = path.join(__dirname, '../src/locales/en.json');
const enTemplate = JSON.parse(fs.readFileSync(enTemplatePath, 'utf-8'));

// Create locales directory if it doesn't exist
const localesDir = path.join(__dirname, '../src/locales');
if (!fs.existsSync(localesDir)) {
  fs.mkdirSync(localesDir, { recursive: true });
}

// Generate template files for each language
languages.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  
  // Always update to match English structure
  fs.writeFileSync(filePath, JSON.stringify(enTemplate, null, 2), 'utf-8');
  console.log(`✓ Updated template: ${lang}.json`);
});

console.log('\n✓ All locale template files updated successfully!');
console.log('Note: All files contain English text as placeholders.');
console.log('Please provide these files to your translation team.\n');
