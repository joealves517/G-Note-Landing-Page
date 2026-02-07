# 🚀 G-Note AI Landing Page

Landing page cho G-Note AI - Deploy trên GitHub Pages tại **www.gnoteai.com**

## Quick Start

```bash
# Install
npm install

# Dev
npm run dev

# Build
npm run build
```

## Deploy lên GitHub Pages

### 1. Tạo repo mới trên GitHub
- Vào https://github.com/new
- Tên: `gnote-landing-page`
- Public
- Create repository

### 2. Push code
```bash
# Thay YOUR_USERNAME bằng GitHub username của bạn
git remote add origin https://github.com/YOUR_USERNAME/gnote-landing-page.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
- Vào repo > **Settings** > **Pages**
- Source: **GitHub Actions**
- Save

### 4. Đợi deploy (2-3 phút)
- Vào tab **Actions** xem progress
- Site sẽ có tại: `https://YOUR_USERNAME.github.io/gnote-landing-page/`

### 5. Cấu hình custom domain
- **Settings** > **Pages** > Custom domain: `www.gnoteai.com`
- Cấu hình DNS CNAME:
  ```
  Type: CNAME
  Name: www
  Value: YOUR_USERNAME.github.io
  ```
- Đợi DNS propagate (5-30 phút)
- Enable HTTPS

## 📁 Cấu trúc

```
landing-page-app/
├── src/                    # Source code
│   ├── components/        # React components
│   ├── locales/          # i18n (13 languages)
│   └── lib/urls.ts       # URL config
├── public/               # Static files
│   ├── CNAME            # Custom domain
│   └── .nojekyll        # GitHub Pages config
├── dist/                # Build output (auto-deployed)
└── .github/workflows/   # GitHub Actions
```

## 🌐 URLs

- Landing: `https://www.gnoteai.com`
- Main App: `https://gnoteai.com`
- Blog: `https://gnoteai.com/blog`

## 🌍 Languages

English, Tiếng Việt, Español, Français, Deutsch, 日本語, 한국어, Português, Italiano, العربية, हिन्दी, 中文, Bahasa Indonesia

## 📚 Docs

- [GitHub Pages Deploy](DEPLOYMENT-GITHUB-PAGES.md) - Chi tiết deploy
- [Quick Start](QUICK-START.md) - Hướng dẫn nhanh
- [Checklist](CHECKLIST.md) - Checklist đầy đủ

## 🛠️ Tech Stack

React 19 • TypeScript • Vite 6 • Tailwind CSS 4 • i18next • GitHub Pages

## 📝 License

MIT

---

Made with ❤️ by G-Note AI Team
