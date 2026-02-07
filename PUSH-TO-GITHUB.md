# 🚀 Hướng dẫn Push lên GitHub và Deploy

## Bước 1: Tạo Repository trên GitHub

1. Mở trình duyệt, vào: https://github.com/new

2. Điền thông tin:
   - **Repository name:** `gnote-landing-page` (hoặc tên khác)
   - **Description:** Landing page for G-Note AI
   - **Public** (chọn Public)
   - **KHÔNG** check "Add a README file"
   - **KHÔNG** check "Add .gitignore"
   - **KHÔNG** check "Choose a license"

3. Click **Create repository**

4. Copy URL của repo (sẽ giống: `https://github.com/YOUR_USERNAME/gnote-landing-page.git`)

## Bước 2: Push Code lên GitHub

Mở terminal trong thư mục `landing-page-app` và chạy:

```bash
# Thay YOUR_USERNAME bằng GitHub username thực tế của bạn
git remote add origin https://github.com/YOUR_USERNAME/gnote-landing-page.git

# Push code
git branch -M main
git push -u origin main
```

**Lưu ý:** Nếu GitHub yêu cầu authentication:
- Dùng Personal Access Token thay vì password
- Hoặc dùng GitHub CLI: `gh auth login`

## Bước 3: Enable GitHub Pages

1. Vào repository trên GitHub (refresh trang nếu cần)

2. Click tab **Settings** (ở trên cùng)

3. Scroll xuống menu bên trái, click **Pages**

4. Trong phần **Build and deployment**:
   - **Source:** Chọn **GitHub Actions** (không phải Deploy from a branch)
   
5. Không cần làm gì thêm, GitHub Actions sẽ tự động chạy

## Bước 4: Xem Deploy Progress

1. Click tab **Actions** (ở trên cùng)

2. Bạn sẽ thấy workflow "Deploy to GitHub Pages" đang chạy (màu vàng 🟡)

3. Click vào workflow để xem chi tiết

4. Đợi ~2-3 phút cho:
   - ✅ Build job hoàn thành
   - ✅ Deploy job hoàn thành

5. Khi xong, sẽ có dấu ✅ màu xanh

## Bước 5: Kiểm tra Site

1. Quay lại tab **Settings** > **Pages**

2. Bạn sẽ thấy thông báo:
   ```
   Your site is live at https://YOUR_USERNAME.github.io/gnote-landing-page/
   ```

3. Click vào link để xem site

4. Verify:
   - ✅ Trang load đúng
   - ✅ Images hiển thị
   - ✅ Language selector hoạt động
   - ✅ Links hoạt động

## Bước 6: Cấu hình Custom Domain (www.gnoteai.com)

### 6.1 Trong GitHub

1. Vẫn ở **Settings** > **Pages**

2. Phần **Custom domain**:
   - Nhập: `www.gnoteai.com`
   - Click **Save**

3. GitHub sẽ tạo file `CNAME` trong repo (đã có sẵn)

### 6.2 Cấu hình DNS

Vào trang quản lý domain của bạn (GoDaddy, Namecheap, Cloudflare, etc.):

1. Tìm phần **DNS Management** hoặc **DNS Settings**

2. Thêm CNAME record:
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   TTL: 3600 (hoặc Auto)
   ```
   **Thay `YOUR_USERNAME` bằng GitHub username thực tế**

3. **Save** hoặc **Add Record**

### 6.3 Verify DNS

1. Đợi 5-30 phút cho DNS propagate

2. Check tại: https://dnschecker.org
   - Nhập: `www.gnoteai.com`
   - Type: CNAME
   - Verify trỏ đến `YOUR_USERNAME.github.io`

3. Khi DNS đã propagate, quay lại GitHub **Settings** > **Pages**

4. Check **Enforce HTTPS** (nếu chưa được check tự động)

5. Đợi vài phút cho SSL certificate

6. Test: https://www.gnoteai.com

## ✅ Hoàn thành!

Landing page của bạn đã live tại:
- 🌐 https://www.gnoteai.com (custom domain)
- 🌐 https://YOUR_USERNAME.github.io/gnote-landing-page/ (GitHub Pages URL)

## 🔄 Cập nhật Landing Page

Mỗi khi muốn cập nhật:

```bash
# 1. Make changes to code
# ...

# 2. Commit
git add .
git commit -m "Update landing page"

# 3. Push
git push

# 4. GitHub Actions sẽ tự động build và deploy (2-3 phút)
```

## 🐛 Troubleshooting

### Push bị reject
```bash
# Pull trước
git pull origin main --rebase
git push
```

### GitHub Actions fails
1. Vào **Actions** tab
2. Click vào failed workflow
3. Xem logs để biết lỗi
4. Fix lỗi, commit, push lại

### Custom domain không hoạt động
1. Check DNS đã đúng chưa: https://dnschecker.org
2. Đợi thêm 24h cho DNS fully propagate
3. Check file `public/CNAME` có đúng domain không
4. Clear browser cache, thử incognito

### Site shows 404
1. Check GitHub Pages đã enable chưa
2. Check GitHub Actions đã chạy thành công chưa
3. Check file `public/.nojekyll` tồn tại
4. Đợi vài phút và refresh

## 💡 Tips

- **Branch Protection:** Protect `main` branch trong Settings > Branches
- **Preview:** Tạo branch khác để test trước khi merge vào `main`
- **Monitoring:** Check **Insights** > **Traffic** để xem visitors
- **Performance:** Run Lighthouse test tại https://pagespeed.web.dev

## 📞 Support

Nếu gặp vấn đề:
1. Check GitHub Actions logs
2. Check browser console (F12)
3. Check DNS propagation
4. Clear cache và thử lại

---

**Estimated Time:** 10-15 phút (không tính DNS propagation)

**Cost:** FREE ✨
