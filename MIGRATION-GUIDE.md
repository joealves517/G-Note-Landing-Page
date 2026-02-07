# Hướng dẫn Tách Landing Page ra khỏi Project Chính

## Tổng quan
Document này hướng dẫn cách tách landing page từ monorepo G-Note AI thành một repository độc lập.

## Các thay đổi đã thực hiện

### 1. Cấu hình Build
**File: `vite.config.ts`**
- ✅ Đổi `base: '/home/'` → `base: '/'`
- ✅ Thêm build optimization (code splitting, minification)
- ✅ Cấu hình manual chunks cho better caching

### 2. URLs Configuration
**File: `src/lib/urls.ts`**
- ✅ Đổi base URL: `gnoteai.com` → `www.gnoteai.com`
- ✅ Giữ links đến main app: `gnoteai.com` (không có www)
- ✅ Cập nhật comments cho rõ ràng

### 3. Firebase Configuration
**Files: `firebase.json`, `.firebaserc`**
- ✅ Tạo config riêng cho landing page
- ✅ Cấu hình caching headers
- ✅ Setup rewrites cho SPA
- ✅ Tạo project ID mới: `g-note-landing`

### 4. TypeScript Configuration
**File: `tsconfig.json`**
- ✅ Tạo config độc lập
- ✅ Loại bỏ references đến project chính
- ✅ Giữ path aliases `@/*`

### 5. Git Configuration
**File: `.gitignore`**
- ✅ Tạo .gitignore riêng
- ✅ Ignore node_modules, dist, .env
- ✅ Ignore Firebase cache

## Các bước thực hiện

### Bước 1: Copy Landing Page sang thư mục mới
```bash
# Tạo thư mục mới cho landing page
mkdir g-note-landing-page
cd g-note-landing-page

# Copy toàn bộ nội dung từ landing-page-app
cp -r /path/to/NOTEEEEE/landing-page-app/* .

# Hoặc nếu đang ở trong project chính:
cd ..
cp -r landing-page-app g-note-landing-page
cd g-note-landing-page
```

### Bước 2: Khởi tạo Git Repository mới
```bash
# Khởi tạo git
git init

# Thêm remote repository (tạo repo trên GitHub/GitLab trước)
git remote add origin <your-landing-page-repo-url>

# Commit initial code
git add .
git commit -m "Initial commit: Standalone landing page"
git branch -M main
git push -u origin main
```

### Bước 3: Cài đặt Dependencies
```bash
# Xóa node_modules cũ (nếu có)
rm -rf node_modules package-lock.json

# Cài đặt lại
npm install
```

### Bước 4: Test Local
```bash
# Chạy dev server
npm run dev

# Kiểm tra:
# - Trang chạy tại http://localhost:3001
# - Tất cả links hoạt động
# - Images load đúng
# - i18n hoạt động
# - Responsive design OK
```

### Bước 5: Build & Test Production
```bash
# Build
npm run build

# Preview production build
npm run preview

# Kiểm tra:
# - Build thành công
# - Không có errors
# - Bundle size hợp lý
# - All assets loaded
```

### Bước 6: Setup Firebase
```bash
# Login Firebase
firebase login

# Tạo project mới trên Firebase Console
# https://console.firebase.google.com
# Project name: g-note-landing

# Cập nhật .firebaserc với project ID thực tế
# Thay "g-note-landing" bằng project ID của bạn

# Deploy
firebase deploy --only hosting
```

### Bước 7: Cấu hình Domain
Xem chi tiết trong `DEPLOYMENT.md`

1. Thêm custom domain trong Firebase Console
2. Cấu hình DNS records
3. Verify domain
4. Đợi SSL certificate

## Kiểm tra sau khi tách

### Checklist
- [ ] Landing page chạy độc lập tại localhost
- [ ] Build production thành công
- [ ] Deploy lên Firebase thành công
- [ ] Domain www.gnoteai.com hoạt động
- [ ] SSL certificate active
- [ ] Tất cả links đến main app hoạt động
- [ ] i18n hoạt động với tất cả ngôn ngữ
- [ ] Responsive trên mobile/tablet/desktop
- [ ] Performance tốt (Lighthouse score > 90)
- [ ] SEO meta tags đúng

### Test URLs
```bash
# Landing page (www)
https://www.gnoteai.com

# Main app (no www)
https://gnoteai.com

# Blog
https://gnoteai.com/blog

# Privacy
https://gnoteai.com/privacy

# Terms
https://gnoteai.com/terms

# Extension
https://chromewebstore.google.com/detail/g-note-ai/...
```

## Cập nhật Project Chính

Sau khi landing page đã hoạt động độc lập, cập nhật project chính:

### 1. Xóa landing-page-app khỏi project chính
```bash
cd /path/to/NOTEEEEE
rm -rf landing-page-app
```

### 2. Cập nhật package.json
Xóa các scripts liên quan đến landing page:
```json
{
  "scripts": {
    // Xóa hoặc comment out:
    // "build:landing": "...",
    // "build:pwa-with-landing": "...",
    // "build:all": "..."
  }
}
```

### 3. Cập nhật firebase.json của project chính
Nếu có rewrites cho `/home`, xóa chúng đi

### 4. Cập nhật documentation
Cập nhật README.md của project chính để note rằng landing page đã tách riêng

## Maintenance

### Cập nhật Landing Page
```bash
cd g-note-landing-page
git pull
# Make changes
npm run build
firebase deploy --only hosting
```

### Sync changes từ project chính (nếu cần)
Nếu có components/styles được share:
```bash
# Copy specific files
cp /path/to/NOTEEEEE/src/components/SomeComponent.tsx src/components/
```

### Update dependencies
```bash
npm update
npm audit fix
npm run build
npm run preview
# Test thoroughly before deploy
firebase deploy --only hosting
```

## Rollback Plan

Nếu có vấn đề, rollback về version trước:

### Firebase Rollback
```bash
firebase hosting:rollback
```

### Git Rollback
```bash
git log
git revert <commit-hash>
git push
firebase deploy --only hosting
```

## Architecture

### Trước khi tách
```
NOTEEEEE/
├── src/                    # Main app
├── landing-page-app/       # Landing page
├── backend/               # Backend
├── dist/                  # Build output
│   ├── index.html        # Main app
│   └── home/             # Landing page
└── firebase.json         # Shared config
```

### Sau khi tách
```
NOTEEEEE/                   # Main app repo
├── src/
├── backend/
├── dist/
│   └── index.html
└── firebase.json

g-note-landing-page/       # Landing page repo (NEW)
├── src/
├── dist/
└── firebase.json
```

### Domain Structure
```
www.gnoteai.com          → Landing page (Firebase Project A)
gnoteai.com              → Main app (Firebase Project B)
gnoteai.com/blog         → Main app blog
gnoteai.com/privacy      → Main app privacy
gnoteai.com/terms        → Main app terms
```

## Benefits của việc tách

1. **Deployment độc lập**: Deploy landing page không ảnh hưởng main app
2. **Faster builds**: Build time nhanh hơn cho cả 2 projects
3. **Better caching**: CDN cache riêng biệt
4. **Easier maintenance**: Code cleaner, dễ maintain
5. **Team collaboration**: Teams có thể work độc lập
6. **Scalability**: Dễ scale từng phần riêng biệt

## Potential Issues & Solutions

### Issue 1: CORS errors
**Solution**: Cấu hình CORS headers trong firebase.json

### Issue 2: Links broken
**Solution**: Kiểm tra lại tất cả URLs trong `src/lib/urls.ts`

### Issue 3: Images not loading
**Solution**: Đảm bảo images trong `public/` và `src/assets/` được copy đúng

### Issue 4: i18n not working
**Solution**: Kiểm tra `src/locales/` có đầy đủ translation files

### Issue 5: Build size too large
**Solution**: Optimize images, enable code splitting trong vite.config.ts

## Support

Nếu gặp vấn đề:
1. Check `DEPLOYMENT.md` cho deployment issues
2. Check `README-STANDALONE.md` cho general info
3. Check Firebase Console logs
4. Check browser console for errors

## Next Steps

Sau khi tách thành công:
1. [ ] Setup CI/CD với GitHub Actions
2. [ ] Add monitoring (Google Analytics, Sentry)
3. [ ] Setup staging environment
4. [ ] Add E2E tests
5. [ ] Performance optimization
6. [ ] SEO optimization
7. [ ] Add sitemap.xml
8. [ ] Add robots.txt
