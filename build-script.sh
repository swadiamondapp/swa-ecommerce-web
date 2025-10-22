#!/bin/bash
set -e

echo "🌟 Building app..."

# Increase memory limit for build
export NODE_OPTIONS="--max-old-space-size=2048"

# Detect framework
if [ "$APP_FRAMEWORK" == "react" ]; then
  npm install --legacy-peer-deps
  npm run build

  # Vite already builds to dist/
  if [ -d dist ]; then
    echo "✅ React (Vite) build output in dist/"
  else
    echo "❌ dist folder not found after build"
    exit 1
  fi

elif [ "$APP_FRAMEWORK" == "next" ]; then
  npm install --legacy-peer-deps
  npm run build
  if npm run | grep -q "export"; then
    npm run export
    mv out dist
  else
    cp -r .next dist
  fi
else
  echo "❌ Unknown APP_FRAMEWORK: $APP_FRAMEWORK"
  exit 1
fi

echo "✅ Build completed, dist/ folder created"
