# Quick Start Guide - G-Note AI Landing Page

## 🚀 Bắt đầu nhanh trong 5 phút

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd landing-page-app
npm install
```

### 2. Run Development
```bash
npm run dev
```
Mở http://localhost:3001

### 3. Build & Deploy
```bash
npm run build
firebase deploy --only hosting
```

## 📋 Checklist sau khi tách

### Bước 1: Copy code
- [ ] Copy toàn bộ thư mục `landing-page-app` ra ngoài project chính
- [ ] Đổi tên thư mục thành `g-note-landing-page` (hoặc tên khác)

### Bước 2: Git setup
```bash
cd g-note-landing-page
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### Bước 3: Firebase setup
```bash
# Login
firebase login

# Tạo project mới trên https://console.firebase.google.com
# Tên project: g-note-landing

# Cập nhật .firebaserc với project ID thực tế
# Thay "g-note-landing" bằng project ID của bạn

# Deploy
firebase deploy --only hosting
```

### Bước 4: Domain setup
1. Vào Firebase Console > Hosting
2. Click "Add custom domain"
3. Nhập: `www.gnoteai.com`
4. Follow hướng dẫn để add DNS records
5. Đợi 24-48h cho SSL certificate

## 🔧 Cấu hình đã thay đổi

### URLs (src/lib/urls.ts)
```typescript
// Landing page domain
'https://www.gnoteai.com'  // ✅ NEW

// Main app domain (không đổi)
'https://gnoteai.com'       // ✅ Giữ nguyên
```

### Base URL (vite.config.ts)
```typescript
base: '/'  // ✅ Đã đổi từ '/home/'
```

### Firebase Project
```json
// .firebaserc
{
  "projects": {
    "default": "g-note-landing"  // ✅ Project mới
  }
}
```

## 📁 Cấu trúc quan trọng

```
landing-page-app/
├── src/
│   ├── lib/urls.ts          ← URLs configuration
│   ├── locales/             ← i18n translations
│   └── HomePage.tsx         ← Main page
├── public/                  ← Static assets
├── vite.config.ts          ← Build config
├── firebase.json           ← Hosting config
└── .firebaserc            ← Firebase project
```

## 🧪 Testing

### Local test
```bash
npm run dev
# Check: http://localhost:3001
```

### Production build test
```bash
npm run build
npm run preview
# Check: http://localhost:4173
```

### Deploy test (preview)
```bash
firebase hosting:channel:deploy preview
# Check preview URL
```

## 🌐 DNS Configuration

Tại nhà cung cấp domain, add records:

```
Type: A
Name: www
Value: 151.101.1.195

Type: A
Name: www
Value: 151.101.65.195

Type: TXT (for verification)
Name: www
Value: <code-from-firebase>
```

## ✅ Verification Checklist

- [ ] `npm run dev` hoạt động
- [ ] `npm run build` thành công
- [ ] `firebase deploy` thành công
- [ ] www.gnoteai.com accessible
- [ ] SSL certificate active (HTTPS)
- [ ] All links work
- [ ] Mobile responsive
- [ ] i18n works (language selector)
- [ ] Images load correctly
- [ ] Performance good (Lighthouse > 90)

## 🆘 Common Issues

### Build fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Deploy fails
```bash
firebase login --reauth
firebase use g-note-landing
firebase deploy --only hosting --debug
```

### Domain not working
- Wait 24-48 hours for DNS propagation
- Check DNS: https://dnschecker.org
- Clear browser cache
- Try incognito mode

## 📚 More Info

- Full guide: `MIGRATION-GUIDE.md`
- Deployment: `DEPLOYMENT.md`
- README: `README-STANDALONE.md`

## 🎯 Next Steps

1. [ ] Setup CI/CD (GitHub Actions already configured)
2. [ ] Add Google Analytics
3. [ ] Setup monitoring
4. [ ] Performance optimization
5. [ ] SEO optimization

## 💡 Tips

- Always test locally before deploy
- Use preview channels for testing: `firebase hosting:channel:deploy preview`
- Keep dependencies updated: `npm update`
- Monitor Firebase Console for errors
- Use Lighthouse for performance checks

## 🔗 Important Links

- Firebase Console: https://console.firebase.google.com
- Domain DNS: (your domain provider)
- Main App: https://gnoteai.com
- Landing Page: https://www.gnoteai.com

---

**Need help?** Check the detailed guides in this repository.
