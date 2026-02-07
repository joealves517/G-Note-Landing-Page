# 🚀 G-Note AI Landing Page - Standalone

<div align="center">

![G-Note AI](public/g-note.svg)

**Landing page độc lập cho G-Note AI**

[Live Demo](https://www.gnoteai.com) • [Main App](https://gnoteai.com) • [Documentation](#documentation)

[![Deploy Status](https://img.shields.io/badge/deploy-success-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()

</div>

---

## 📖 Tổng quan

Landing page này đã được tách ra từ monorepo G-Note AI để:
- ✅ Deploy độc lập tại **www.gnoteai.com**
- ✅ Faster builds và deployments
- ✅ Better caching và performance
- ✅ Easier maintenance
- ✅ Separate concerns

## 🎯 Quick Start

### Cài đặt nhanh
```bash
# Clone repo
git clone <your-repo-url>
cd landing-page-app

# Install dependencies
npm install

# Run development server
npm run dev
```

Mở http://localhost:3001

### Deploy nhanh
```bash
# Build
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICK-START.md](QUICK-START.md) | Bắt đầu nhanh trong 5 phút |
| [CHECKLIST.md](CHECKLIST.md) | Checklist đầy đủ từng bước |
| [MIGRATION-GUIDE.md](MIGRATION-GUIDE.md) | Hướng dẫn tách từ project chính |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Hướng dẫn deploy chi tiết |
| [README-STANDALONE.md](README-STANDALONE.md) | README đầy đủ |

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **i18n:** i18next
- **Routing:** React Router 7
- **Hosting:** Firebase Hosting
- **CI/CD:** GitHub Actions

## 📁 Project Structure

```
landing-page-app/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # UI components (Radix UI)
│   │   ├── LanguageSelector.tsx
│   │   └── SEO.tsx
│   ├── locales/            # i18n translations (13 languages)
│   ├── lib/
│   │   └── urls.ts         # URL configurations
│   ├── assets/             # Images, icons
│   ├── App.tsx             # App component
│   ├── HomePage.tsx        # Main landing page
│   ├── Home.css           # Styles
│   └── main.tsx           # Entry point
├── public/                 # Static assets
│   ├── g-note.svg         # Logo
│   ├── favicon.svg        # Favicon
│   └── ...
├── scripts/               # Utility scripts
│   ├── setup.js          # Setup automation
│   └── check-config.js   # Config checker
├── .github/
│   └── workflows/
│       └── deploy.yml    # CI/CD workflow
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript config
├── firebase.json         # Firebase hosting config
├── .firebaserc          # Firebase project
└── package.json         # Dependencies
```

## 🌐 URLs Configuration

| Type | URL | Description |
|------|-----|-------------|
| Landing Page | `https://www.gnoteai.com` | This landing page |
| Main App | `https://gnoteai.com` | Main application |
| Blog | `https://gnoteai.com/blog` | Blog |
| Privacy | `https://gnoteai.com/privacy` | Privacy policy |
| Terms | `https://gnoteai.com/terms` | Terms of service |

## 🌍 Supported Languages

- 🇺🇸 English (en)
- 🇻🇳 Tiếng Việt (vi)
- 🇪🇸 Español (es)
- 🇫🇷 Français (fr)
- 🇩🇪 Deutsch (de)
- 🇯🇵 日本語 (ja)
- 🇰🇷 한국어 (ko)
- 🇵🇹 Português (pt)
- 🇮🇹 Italiano (it)
- 🇸🇦 العربية (ar)
- 🇮🇳 हिन्दी (hi)
- 🇨🇳 中文 (zh)
- 🇮🇩 Bahasa Indonesia (id)

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 3001)
npm run build           # Build for production
npm run preview         # Preview production build

# Deployment
npm run deploy          # Build + deploy to Firebase
npm run deploy:preview  # Deploy to preview channel

# Utilities
npm run setup           # Run setup automation
npm run check           # Check configuration
npm run lint            # Type check
npm run clean           # Clean build artifacts
npm run reinstall       # Clean + reinstall dependencies
```

## 🚀 Deployment

### Prerequisites
- Node.js >= 18
- Firebase CLI: `npm install -g firebase-tools`
- Firebase account

### Steps
1. **Build**
   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

3. **Configure Domain**
   - Add custom domain in Firebase Console
   - Configure DNS records
   - Wait for SSL certificate (24-48h)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🔧 Configuration

### Environment Variables
No environment variables needed - this is a static landing page.

### Firebase Project
Update `.firebaserc` with your project ID:
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### URLs
Update `src/lib/urls.ts` if needed:
```typescript
export const LINKS = {
    HOME: 'https://www.gnoteai.com',
    APP: 'https://gnoteai.com',
    // ...
};
```

## 🧪 Testing

### Local Testing
```bash
npm run dev
# Test at http://localhost:3001
```

### Production Build Testing
```bash
npm run build
npm run preview
# Test at http://localhost:4173
```

### Preview Deployment
```bash
npm run deploy:preview
# Get preview URL from Firebase
```

## 📊 Performance

Target metrics (Lighthouse):
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

Optimizations:
- Code splitting
- Image optimization
- CDN caching
- Gzip/Brotli compression
- Lazy loading

## 🔒 Security

- HTTPS enforced
- Security headers configured
- No sensitive data in client
- Regular dependency updates
- Firebase security rules

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

## 🆘 Troubleshooting

### Build fails
```bash
npm run clean
npm install
npm run build
```

### Deploy fails
```bash
firebase login --reauth
firebase use <project-id>
firebase deploy --only hosting --debug
```

### Domain not working
- Wait 24-48 hours for DNS propagation
- Check DNS: https://dnschecker.org
- Clear browser cache
- Try incognito mode

See [DEPLOYMENT.md](DEPLOYMENT.md) for more troubleshooting.

## 📞 Support

- **Issues:** [GitHub Issues](<your-repo-issues-url>)
- **Main App:** https://gnoteai.com
- **Email:** support@gnoteai.com

## 🙏 Acknowledgments

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

---

<div align="center">

Made with ❤️ by G-Note AI Team

[Website](https://www.gnoteai.com) • [App](https://gnoteai.com) • [GitHub](<your-github-url>)

</div>
