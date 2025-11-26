#!/bin/bash
set -e

echo "🌟 Building Next.js App..."

# Increase memory limit for build
export NODE_OPTIONS="--max-old-space-size=2048"

# Install dependencies
npm install --legacy-peer-deps

# Build Next.js
npm run build

# Check if export command exists (Static Export)
if npm run | grep -q "export"; then
  echo "📦 Running static export..."
  npm run export

  if [ -d out ]; then
    rm -rf dist
    mv out dist
    echo "📌 Exported static build → dist/"
  else
    echo "❌ Build failed: 'out' folder missing!"
    exit 1
  fi
else
  echo "❌ This Next.js project does not support static export."
  echo "👉 Remove export OR switch to SSR deployment"
  exit 1
fi

echo "🎉 Next.js build completed successfully → dist/"


