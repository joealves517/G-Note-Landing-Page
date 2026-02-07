# ✅ Checklist - Tách Landing Page

## Giai đoạn 1: Chuẩn bị (5 phút)

- [ ] Copy thư mục `landing-page-app` ra ngoài project chính
- [ ] Đổi tên thành `g-note-landing-page` (hoặc tên khác)
- [ ] Mở terminal trong thư mục mới

## Giai đoạn 2: Git Setup (2 phút)

```bash
cd g-note-landing-page
git init
git add .
git commit -m "Initial commit: Standalone landing page"
```

- [ ] Tạo repository mới trên GitHub/GitLab
- [ ] Add remote và push:

```bash
git remote add origin <your-repo-url>
git push -u origin main
```

## Giai đoạn 3: Dependencies (3 phút)

```bash
npm install
```

- [ ] Cài đặt thành công
- [ ] Không có errors

## Giai đoạn 4: Test Local (2 phút)

```bash
npm run dev
```

- [ ] Server chạy tại http://localhost:3001
- [ ] Trang load đúng
- [ ] Không có console errors
- [ ] Language selector hoạt động
- [ ] Tất cả images hiển thị
- [ ] Links hoạt động

## Giai đoạn 5: Build Test (2 phút)

```bash
npm run build
npm run preview
```

- [ ] Build thành công
- [ ] Preview chạy tốt
- [ ] Không có warnings nghiêm trọng

## Giai đoạn 6: Firebase Setup (10 phút)

### 6.1 Cài đặt Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

- [ ] Firebase CLI installed
- [ ] Đã login thành công

### 6.2 Tạo Firebase Project
- [ ] Vào https://console.firebase.google.com
- [ ] Click "Add project"
- [ ] Tên project: `g-note-landing` (hoặc tên khác)
- [ ] Disable Google Analytics (không cần cho landing page)
- [ ] Create project

### 6.3 Cập nhật .firebaserc
```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

- [ ] Thay `g-note-landing` bằng project ID thực tế
- [ ] Save file

## Giai đoạn 7: Deploy (5 phút)

```bash
npm run deploy
```

hoặc

```bash
npm run build
firebase deploy --only hosting
```

- [ ] Deploy thành công
- [ ] Nhận được URL: `https://your-project.web.app`
- [ ] Test URL hoạt động

## Giai đoạn 8: Custom Domain (30-60 phút)

### 8.1 Add Domain trong Firebase
- [ ] Vào Firebase Console > Hosting
- [ ] Click "Add custom domain"
- [ ] Nhập: `www.gnoteai.com`
- [ ] Copy DNS records được cung cấp

### 8.2 Cấu hình DNS
Tại nhà cung cấp domain (GoDaddy, Namecheap, Cloudflare, etc.):

- [ ] Add A records:
  ```
  Type: A
  Name: www
  Value: 151.101.1.195
  
  Type: A
  Name: www
  Value: 151.101.65.195
  ```

- [ ] Add TXT record (verification):
  ```
  Type: TXT
  Name: www
  Value: <code-from-firebase>
  ```

- [ ] Save DNS changes

### 8.3 Verify Domain
- [ ] Đợi 5-30 phút cho DNS propagate
- [ ] Click "Verify" trong Firebase Console
- [ ] Domain verified thành công

### 8.4 SSL Certificate
- [ ] Đợi 24-48 giờ
- [ ] Check https://www.gnoteai.com
- [ ] SSL certificate active (ổ khóa xanh)

## Giai đoạn 9: Final Testing (10 phút)

### Test trên www.gnoteai.com
- [ ] Trang load nhanh
- [ ] HTTPS hoạt động (ổ khóa xanh)
- [ ] Tất cả images load
- [ ] Language selector hoạt động
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive

### Test Links
- [ ] Link đến main app: https://gnoteai.com
- [ ] Link đến blog: https://gnoteai.com/blog
- [ ] Link đến privacy: https://gnoteai.com/privacy
- [ ] Link đến terms: https://gnoteai.com/terms
- [ ] Link đến Chrome extension

### Performance Test
- [ ] Run Lighthouse test
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

## Giai đoạn 10: Cleanup Project Chính (5 phút)

Quay lại project chính (NOTEEEEE):

```bash
cd /path/to/NOTEEEEE
```

### Xóa landing-page-app
```bash
rm -rf landing-page-app
```

### Cập nhật package.json
- [ ] Xóa hoặc comment out scripts:
  - `build:landing`
  - `build:pwa-with-landing`
  - `build:all`

### Cập nhật README.md
- [ ] Note rằng landing page đã tách riêng
- [ ] Add link đến landing page repo

### Commit changes
```bash
git add .
git commit -m "Remove landing-page-app (moved to separate repo)"
git push
```

## Giai đoạn 11: Documentation (5 phút)

Trong landing page repo:

- [ ] Cập nhật README-STANDALONE.md với thông tin thực tế
- [ ] Cập nhật .firebaserc với project ID đúng
- [ ] Add team members vào Firebase project (nếu cần)
- [ ] Share repo URL với team

## Giai đoạn 12: CI/CD (Optional - 15 phút)

### Setup GitHub Actions
- [ ] Vào GitHub repo > Settings > Secrets
- [ ] Add secret: `FIREBASE_SERVICE_ACCOUNT`
  - Get từ: Firebase Console > Project Settings > Service Accounts
  - Generate new private key
  - Copy toàn bộ JSON content
  - Paste vào GitHub secret

- [ ] Push code để trigger workflow
- [ ] Check Actions tab để xem deployment

## Giai đoạn 13: Monitoring (Optional - 10 phút)

### Google Analytics (nếu cần)
- [ ] Tạo GA4 property
- [ ] Add tracking code vào index.html
- [ ] Test tracking hoạt động

### Firebase Performance Monitoring
- [ ] Enable trong Firebase Console
- [ ] Add SDK vào project (nếu cần)

## 🎉 Hoàn thành!

Checklist này đã hoàn thành khi:
- ✅ Landing page chạy độc lập tại www.gnoteai.com
- ✅ SSL certificate active
- ✅ Tất cả tests pass
- ✅ Performance tốt
- ✅ Project chính đã cleanup
- ✅ Documentation đầy đủ

## 📞 Support

Nếu gặp vấn đề:
1. Check `QUICK-START.md` cho quick fixes
2. Check `DEPLOYMENT.md` cho deployment issues
3. Check `MIGRATION-GUIDE.md` cho detailed guide
4. Check Firebase Console logs
5. Check browser console errors

## 🔄 Maintenance

### Weekly
- [ ] Check Firebase Console cho errors
- [ ] Check website uptime
- [ ] Check SSL certificate expiry

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Run security audit: `npm audit fix`
- [ ] Check performance metrics
- [ ] Review and update content

### Quarterly
- [ ] Review and optimize images
- [ ] Update translations
- [ ] Performance optimization
- [ ] SEO optimization

---

**Estimated Total Time:** 1-2 hours (excluding DNS propagation wait time)

**Difficulty:** ⭐⭐⭐ (Medium)

**Prerequisites:**
- Node.js 18+
- npm
- Git
- Firebase account
- Domain access (for DNS configuration)
