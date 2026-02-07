@echo off
echo ========================================
echo G-Note AI Landing Page - GitHub Setup
echo ========================================
echo.

set /p USERNAME="Enter your GitHub username: "
set /p REPONAME="Enter repository name (default: gnote-landing-page): "

if "%REPONAME%"=="" set REPONAME=gnote-landing-page

echo.
echo Creating repository on GitHub...
gh repo create %REPONAME% --public --source=. --remote=origin --push

echo.
echo Enabling GitHub Pages...
gh api repos/%USERNAME%/%REPONAME%/pages -X POST -f source[branch]=main -f source[path]=/

echo.
echo ========================================
echo Done! Your site will be available at:
echo https://%USERNAME%.github.io/%REPONAME%/
echo.
echo To use custom domain www.gnoteai.com:
echo 1. Go to: https://github.com/%USERNAME%/%REPONAME%/settings/pages
echo 2. Enter custom domain: www.gnoteai.com
echo 3. Configure DNS CNAME: www -> %USERNAME%.github.io
echo ========================================
pause
