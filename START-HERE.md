# 🎯 BẮT ĐẦU TẠI ĐÂY

## ✅ Đã hoàn thành

- ✅ Git repository đã được khởi tạo
- ✅ Code đã được commit
- ✅ Cấu hình cho GitHub Pages đã sẵn sàng
- ✅ File CNAME với domain `www.gnoteai.com` đã được tạo
- ✅ GitHub Actions workflow đã được cấu hình

## 🚀 Bước tiếp theo (5 phút)

### 1. Tạo GitHub Repository

Mở trình duyệt: https://github.com/new

- Repository name: `gnote-landing-page`
- Public
- **KHÔNG** check bất kỳ option nào
- Click **Create repository**

### 2. Copy URL của repo

Sau khi tạo, GitHub sẽ hiển thị URL giống:
```
https://github.com/YOUR_USERNAME/gnote-landing-page.git
```

Copy URL này.

### 3. Push code lên GitHub

Mở terminal trong thư mục này và chạy:

```bash
# Thay YOUR_USERNAME bằng GitHub username của bạn
git remote add origin https://github.com/YOUR_USERNAME/gnote-landing-page.git

# Push
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. Vào repo trên GitHub
2. Click **Settings** tab
3. Click **Pages** (menu bên trái)
4. Source: chọn **GitHub Actions**
5. Done!

### 5. Đợi deploy

- Vào tab **Actions**
- Xem workflow "Deploy to GitHub Pages" chạy
- Đợi ~2-3 phút
- Site sẽ live tại: `https://YOUR_USERNAME.github.io/gnote-landing-page/`

### 6. Cấu hình domain (Optional)

**Trong GitHub:**
- Settings > Pages > Custom domain: `www.gnoteai.com`

**Trong DNS provider:**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

Đợi 5-30 phút cho DNS propagate.

## 📚 Hướng dẫn chi tiết

- **[PUSH-TO-GITHUB.md](PUSH-TO-GITHUB.md)** - Hướng dẫn từng bước chi tiết
- **[DEPLOYMENT-GITHUB-PAGES.md](DEPLOYMENT-GITHUB-PAGES.md)** - Hướng dẫn deploy đầy đủ
- **[README.md](README.md)** - Tổng quan project

## 💡 Lưu ý

- Thư mục này (`landing-page-app`) đã sẵn sàng để push lên GitHub
- Không cần build trước, GitHub Actions sẽ tự động build
- File `dist/` đã có sẵn để test local, nhưng GitHub sẽ build lại
- Mỗi lần push, GitHub Actions sẽ tự động deploy

## 🆘 Cần giúp?

1. Đọc [PUSH-TO-GITHUB.md](PUSH-TO-GITHUB.md) cho hướng dẫn chi tiết
2. Check phần Troubleshooting trong file đó
3. Xem GitHub Actions logs nếu deploy fails

---

**Next:** Mở file [PUSH-TO-GITHUB.md](PUSH-TO-GITHUB.md) để bắt đầu! 🚀
