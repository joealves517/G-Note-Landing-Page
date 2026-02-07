# Setup GitHub Pages

## Option 1: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI if not installed
# https://cli.github.com/

# Login
gh auth login

# Run setup script
setup-github.bat
```

## Option 2: Manual Setup

### 1. Create GitHub Repository

Go to: https://github.com/new
- Name: `gnote-landing-page`
- Public
- Create

### 2. Push Code

```bash
git remote add origin https://github.com/YOUR_USERNAME/gnote-landing-page.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

```bash
# Using GitHub CLI
gh api repos/YOUR_USERNAME/gnote-landing-page/pages -X POST -f source[branch]=main -f source[path]=/

# Or manually:
# Go to: Settings > Pages > Source: GitHub Actions
```

### 4. Configure Custom Domain

1. Go to: Settings > Pages
2. Custom domain: `www.gnoteai.com`
3. Configure DNS:
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

## Done!

Site will be live at:
- GitHub Pages: `https://YOUR_USERNAME.github.io/gnote-landing-page/`
- Custom Domain: `https://www.gnoteai.com` (after DNS)
