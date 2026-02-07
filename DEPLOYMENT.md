# Hướng dẫn Deploy Landing Page

## Chuẩn bị

### 1. Tạo Firebase Project mới
```bash
# Truy cập: https://console.firebase.google.com
# Tạo project mới với tên: g-note-landing (hoặc tên khác)
```

### 2. Cài đặt Firebase CLI
```bash
npm install -g firebase-tools
```

### 3. Login Firebase
```bash
firebase login
```

## Cấu hình Project

### 1. Khởi tạo Firebase trong project
```bash
cd landing-page-app

# Nếu chưa có firebase.json
firebase init hosting

# Chọn:
# - Use existing project: g-note-landing
# - Public directory: dist
# - Single-page app: Yes
# - Set up automatic builds: No
```

### 2. Cập nhật .firebaserc
Đảm bảo file `.firebaserc` có nội dung:
```json
{
  "projects": {
    "default": "g-note-landing"
  }
}
```

## Build & Deploy

### Build production
```bash
npm install
npm run build
```

### Deploy lên Firebase
```bash
firebase deploy --only hosting
```

### Deploy với message
```bash
firebase deploy --only hosting -m "Update landing page"
```

## Cấu hình Custom Domain (www.gnoteai.com)

### Bước 1: Thêm domain trong Firebase Console
1. Vào Firebase Console > Hosting
2. Click "Add custom domain"
3. Nhập: `www.gnoteai.com`
4. Firebase sẽ cung cấp DNS records

### Bước 2: Cấu hình DNS
Tại nhà cung cấp domain (GoDaddy, Namecheap, Cloudflare, etc.), thêm records:

#### Option A: A Records (Recommended)
```
Type: A
Name: www
Value: 151.101.1.195
TTL: 3600

Type: A
Name: www
Value: 151.101.65.195
TTL: 3600
```

#### Option B: CNAME (Alternative)
```
Type: CNAME
Name: www
Value: <your-firebase-project>.web.app
TTL: 3600
```

### Bước 3: Verify domain
1. Firebase sẽ yêu cầu thêm TXT record để verify
```
Type: TXT
Name: www (hoặc @)
Value: <verification-code-from-firebase>
TTL: 3600
```

2. Đợi DNS propagate (5-30 phút)
3. Click "Verify" trong Firebase Console

### Bước 4: SSL Certificate
Firebase tự động cấp SSL certificate (Let's Encrypt)
- Đợi 24-48 giờ để certificate được issue
- Sau đó site sẽ tự động chuyển sang HTTPS

## Redirect từ gnoteai.com sang www.gnoteai.com (Optional)

Nếu muốn redirect từ root domain sang www:

### Option 1: Cloudflare Page Rules
```
URL: gnoteai.com/*
Forwarding URL: 301 - Permanent Redirect
Destination: https://www.gnoteai.com/$1
```

### Option 2: DNS + Firebase
Thêm domain `gnoteai.com` vào Firebase Hosting và cấu hình redirect

## Kiểm tra Deployment

### 1. Check build locally
```bash
npm run build
npm run preview
```

### 2. Check Firebase hosting
```bash
firebase hosting:channel:deploy preview
```

### 3. Check production
```bash
# Sau khi deploy
curl -I https://www.gnoteai.com
```

## Rollback

### Xem lịch sử deployments
```bash
firebase hosting:clone --only hosting
```

### Rollback về version trước
```bash
firebase hosting:rollback
```

## CI/CD với GitHub Actions (Optional)

Tạo file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: g-note-landing
```

## Monitoring

### Firebase Console
- Hosting metrics: https://console.firebase.google.com
- Usage statistics
- Error logs

### Google Analytics (Optional)
Thêm GA tracking code vào `index.html` nếu cần

## Troubleshooting

### Build fails
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Deploy fails
```bash
# Check Firebase login
firebase login --reauth

# Check project
firebase projects:list
firebase use g-note-landing

# Try deploy again
firebase deploy --only hosting --debug
```

### Domain not working
1. Check DNS propagation: https://dnschecker.org
2. Wait 24-48 hours for SSL
3. Clear browser cache
4. Try incognito mode

### SSL Certificate issues
```bash
# Check certificate
openssl s_client -connect www.gnoteai.com:443 -servername www.gnoteai.com

# Wait 24-48 hours after domain verification
# Firebase auto-renews certificates
```

## Performance Optimization

### 1. Enable compression
Firebase Hosting tự động enable gzip/brotli

### 2. CDN Caching
Headers đã được cấu hình trong `firebase.json`

### 3. Image optimization
```bash
# Optimize images trước khi commit
npm install -g sharp-cli
sharp -i src/assets/*.png -o src/assets/ --webp
```

## Security

### 1. Security headers
Thêm vào `firebase.json`:
```json
{
  "headers": [
    {
      "source": "**",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 2. Content Security Policy
Thêm CSP meta tag vào `index.html`

## Backup

### Export Firebase config
```bash
firebase hosting:clone source:g-note-landing destination:backup-project
```

### Backup source code
```bash
git push origin main
# Hoặc tạo release tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```
