# Deploy Landing Page lên GitHub Pages

## 🚀 Quick Deploy (5 phút)

### Bước 1: Tạo Repository mới trên GitHub
1. Vào https://github.com/new
2. Repository name: `gnote-landing-page` (hoặc tên khác)
3. Public repository
4. **KHÔNG** check "Add README" (đã có sẵn)
5. Click "Create repository"

### Bước 2: Push code lên GitHub
```bash
cd C:\Users\alves\Documents\NOTEEEEE\landing-page-app

# Khởi tạo git (nếu chưa có)
git init

# Add tất cả files
git add .

# Commit
git commit -m "Initial commit: Landing page for GitHub Pages"

# Add remote (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/gnote-landing-page.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

### Bước 3: Enable GitHub Pages
1. Vào repository trên GitHub
2. Click **Settings** tab
3. Scroll xuống **Pages** (menu bên trái)
4. Source: chọn **GitHub Actions**
5. Save

### Bước 4: Đợi GitHub Actions deploy
1. Vào tab **Actions** trong repo
2. Xem workflow "Deploy to GitHub Pages" đang chạy
3. Đợi ~2-3 phút cho build + deploy
4. Khi xong sẽ có ✅ màu xanh

### Bước 5: Kiểm tra site
Site sẽ có tại: `https://YOUR_USERNAME.github.io/gnote-landing-page/`

## 🌐 Cấu hình Custom Domain (www.gnoteai.com)

### Bước 1: Cấu hình trong GitHub
1. Vào **Settings** > **Pages**
2. Custom domain: nhập `www.gnoteai.com`
3. Click **Save**
4. Check **Enforce HTTPS** (sau khi DNS đã propagate)

### Bước 2: Cấu hình DNS
Tại nhà cung cấp domain (GoDaddy, Namecheap, Cloudflare, etc.):

#### Option A: CNAME (Recommended)
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 3600
```

#### Option B: A Records + CNAME
```
# A Records cho root domain (nếu muốn)
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

# CNAME cho www
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 3600
```

### Bước 3: Verify DNS
1. Đợi 5-30 phút cho DNS propagate
2. Check tại: https://dnschecker.org
3. Nhập: `www.gnoteai.com`
4. Verify CNAME trỏ đến `YOUR_USERNAME.github.io`

### Bước 4: Enable HTTPS
1. Quay lại GitHub **Settings** > **Pages**
2. Check **Enforce HTTPS**
3. Đợi vài phút cho SSL certificate
4. Test: https://www.gnoteai.com

## 📝 File CNAME

File `public/CNAME` đã được tạo với nội dung:
```
www.gnoteai.com
```

File này sẽ được copy vào `dist/` khi build và báo cho GitHub Pages biết custom domain.

## 🔄 Cập nhật Landing Page

Mỗi khi có thay đổi:

```bash
# Make changes to code
# ...

# Commit và push
git add .
git commit -m "Update landing page"
git push

# GitHub Actions sẽ tự động build và deploy
```

## 🧪 Test Local trước khi push

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# Test tại: http://localhost:3001

# Build production
npm run build

# Preview production build
npm run preview
# Test tại: http://localhost:4173
```

## ⚙️ GitHub Actions Workflow

File `.github/workflows/deploy.yml` đã được cấu hình:
- Trigger: Mỗi khi push lên branch `main`
- Build: `npm ci && npm run build`
- Deploy: Tự động deploy `dist/` lên GitHub Pages

## 🔍 Troubleshooting

### Site không load
1. Check GitHub Actions có chạy thành công không
2. Check **Settings** > **Pages** đã enable chưa
3. Clear browser cache
4. Try incognito mode

### Custom domain không hoạt động
1. Check DNS đã propagate chưa: https://dnschecker.org
2. Check file `public/CNAME` có đúng domain không
3. Đợi thêm 24h cho DNS fully propagate
4. Check GitHub Pages settings

### Build fails
```bash
# Local test
npm run build

# Check errors
# Fix issues
# Push again
```

### 404 errors
- Đảm bảo `public/.nojekyll` file tồn tại (đã tạo)
- Check base URL trong `vite.config.ts` là `/`

## 📊 Performance

GitHub Pages tự động:
- ✅ Serve qua CDN
- ✅ Enable gzip compression
- ✅ HTTPS/SSL certificate
- ✅ Global distribution

## 🔒 Security

- HTTPS enforced
- No server-side code (static site)
- No sensitive data
- Regular dependency updates

## 💰 Cost

**FREE!** GitHub Pages miễn phí cho:
- Public repositories
- Unlimited bandwidth
- Custom domain
- SSL certificate

## 📈 Monitoring

### GitHub Insights
- Vào repo > **Insights** > **Traffic**
- Xem visitors, views, clones

### Google Analytics (Optional)
Thêm vào `index.html` nếu cần:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Checklist

- [ ] Tạo GitHub repository
- [ ] Push code lên GitHub
- [ ] Enable GitHub Pages (Source: GitHub Actions)
- [ ] Đợi GitHub Actions deploy thành công
- [ ] Test site tại `YOUR_USERNAME.github.io/gnote-landing-page`
- [ ] Cấu hình custom domain `www.gnoteai.com`
- [ ] Cấu hình DNS CNAME
- [ ] Đợi DNS propagate (5-30 phút)
- [ ] Enable HTTPS
- [ ] Test https://www.gnoteai.com
- [ ] Verify mobile responsive
- [ ] Verify all links work
- [ ] Run Lighthouse test

## 🔗 Useful Links

- GitHub Pages Docs: https://docs.github.com/en/pages
- Custom Domain: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- DNS Checker: https://dnschecker.org
- Lighthouse: https://pagespeed.web.dev

## 💡 Tips

1. **Branch Protection**: Protect `main` branch để tránh push nhầm
2. **Preview Deployments**: Dùng branches khác để test trước khi merge vào `main`
3. **Cache Busting**: Vite tự động thêm hash vào filenames
4. **SEO**: Đảm bảo meta tags trong `index.html` đúng
5. **Performance**: Run Lighthouse để optimize

## 🆘 Support

Nếu gặp vấn đề:
1. Check GitHub Actions logs
2. Check browser console
3. Check DNS propagation
4. Clear cache và thử lại
5. Check GitHub Pages status: https://www.githubstatus.com

---

**Estimated Time:** 10-15 phút (không tính DNS propagation)

**Cost:** FREE ✨

**Difficulty:** ⭐ (Very Easy)
