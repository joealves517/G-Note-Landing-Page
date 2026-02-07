# G-Note AI Landing Page - Standalone Project

## Tổng quan
Landing page độc lập cho G-Note AI, được tách ra từ project chính để deploy riêng tại **www.gnoteai.com**

## Cấu trúc Project
```
landing-page-app/
├── src/                    # Source code
│   ├── components/        # React components
│   ├── locales/          # i18n translations
│   ├── lib/              # Utilities
│   └── assets/           # Images, icons
├── public/               # Static assets
├── dist/                 # Build output
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript config
├── firebase.json         # Firebase hosting config
└── .firebaserc          # Firebase project config
```

## Yêu cầu hệ thống
- Node.js >= 18
- npm hoặc yarn
- Firebase CLI (cho deployment)

## Cài đặt

### 1. Clone repository
```bash
git clone <your-landing-page-repo-url>
cd landing-page-app
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Chạy development server
```bash
npm run dev
```
Server sẽ chạy tại: http://localhost:3001

## Build & Deploy

### Build cho production
```bash
npm run build
```
Output sẽ được tạo trong thư mục `dist/`

### Deploy lên Firebase Hosting
```bash
# Login Firebase (chỉ cần làm 1 lần)
firebase login

# Deploy
firebase deploy --only hosting
```

## Cấu hình Domain

### Firebase Hosting
1. Vào Firebase Console > Hosting
2. Thêm custom domain: `www.gnoteai.com`
3. Làm theo hướng dẫn để cấu hình DNS records

### DNS Records (tại nhà cung cấp domain)
Thêm các records sau:
```
Type: A
Name: www
Value: <Firebase IP addresses>

Type: TXT
Name: www
Value: <Firebase verification code>
```

## Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build locally

## Environment Variables
Project này không cần environment variables vì chỉ là static landing page.

## Cấu hình quan trọng

### Base URL
- Development: `/`
- Production: `/`
- Domain: `www.gnoteai.com`

### URLs trong code
Tất cả URLs đã được cấu hình trong `src/lib/urls.ts`:
- HOME: `https://www.gnoteai.com`
- APP: `https://gnoteai.com` (main app)
- BLOG: `https://gnoteai.com/blog`
- PRIVACY: `https://gnoteai.com/privacy`
- TERMS: `https://gnoteai.com/terms`

## Tính năng

### Đa ngôn ngữ (i18n)
Hỗ trợ các ngôn ngữ:
- English (en)
- Tiếng Việt (vi)
- Español (es)
- Français (fr)
- Deutsch (de)
- 日本語 (ja)
- 한국어 (ko)
- Português (pt)
- Italiano (it)
- العربية (ar)
- हिन्दी (hi)
- 中文 (zh)
- Bahasa Indonesia (id)

### Responsive Design
- Mobile-first approach
- Tablet và desktop optimized
- Touch gestures support

### Performance
- Lazy loading images
- Code splitting
- Optimized bundle size
- CDN caching

## Bảo trì

### Cập nhật nội dung
- Translations: `src/locales/*.json`
- Images: `src/assets/` và `public/`
- URLs: `src/lib/urls.ts`

### Cập nhật dependencies
```bash
npm update
npm audit fix
```

## Troubleshooting

### Build errors
```bash
# Clear cache và rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Firebase deployment issues
```bash
# Re-login
firebase logout
firebase login

# Check project
firebase projects:list
firebase use <project-id>
```

## Support
- Main App: https://gnoteai.com
- Documentation: https://gnoteai.com/docs
- Issues: <your-repo-issues-url>
