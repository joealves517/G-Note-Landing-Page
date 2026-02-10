
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://gnoteai.com';
const DIST_DIR = path.resolve(__dirname, '../dist');

// Language to locale mapping mirroring src/lib/seo.ts
const languageLocales = {
    en: 'en',
    vi: 'vi',
    ja: 'ja',
    ko: 'ko',
    'zh-CN': 'zh-Hans',
    'zh-TW': 'zh-Hant',
    de: 'de',
    fr: 'fr',
    es: 'es',
    'pt-BR': 'pt-BR',
    it: 'it',
    nl: 'nl',
    ar: 'ar',
    hi: 'hi',
    tr: 'tr',
    pl: 'pl',
    th: 'th',
    id: 'id'
};

const languages = Object.keys(languageLocales);

function generateSitemap() {
    const date = new Date().toISOString();

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    // Landing Page URL (Root)
    sitemap += `
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>`;

    // Add hreflang links to the root URL entry
    languages.forEach(lang => {
        const href = lang === 'en' ? `${SITE_URL}/` : `${SITE_URL}/?lang=${lang}`;
        const hreflang = languageLocales[lang];
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`;
    });

    // Add x-default
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>`;

    sitemap += `
  </url>`;

    sitemap += `
</urlset>`;

    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR, { recursive: true });
    }

    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated at dist/sitemap.xml');
}

function generateRobots() {
    const robots = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_URL}`;

    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR, { recursive: true });
    }

    fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
    console.log('✅ Robots.txt generated at dist/robots.txt');
}

try {
    generateSitemap();
    generateRobots();
} catch (error) {
    console.error('Error generating SEO files:', error);
    process.exit(1);
}
