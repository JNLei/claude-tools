#!/bin/bash

# TypeScript Check Hook - Setup Script
# Verifies TypeScript installation and configuration

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TypeScript Check Hook - Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Make hook script executable
echo "[1/3] Making hook script executable..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
chmod +x "$SCRIPT_DIR/tsc-check.sh"
echo "✓ Script is now executable"

# Check for TypeScript in current project
echo ""
echo "[2/3] Checking TypeScript installation in project..."

# Try to find TypeScript in the current directory or parent directories
CURRENT_DIR="$PWD"
TSC_FOUND=false

while [ "$CURRENT_DIR" != "/" ]; do
    if [ -f "$CURRENT_DIR/package.json" ]; then
        if grep -q "\"typescript\"" "$CURRENT_DIR/package.json"; then
            echo "✓ TypeScript found in package.json at $CURRENT_DIR"
            TSC_FOUND=true
            PROJECT_DIR="$CURRENT_DIR"
            break
        fi
    fi
    CURRENT_DIR="$(dirname "$CURRENT_DIR")"
done

if [ "$TSC_FOUND" = false ]; then
    echo "✗ TypeScript not found in any package.json"
    echo ""
    echo "⚠ This hook requires TypeScript in your project"
    echo "  Install it with: npm install -D typescript"
else
    # Check for tsc binary
    if [ -x "$PROJECT_DIR/node_modules/.bin/tsc" ]; then
        TSC_VERSION=$("$PROJECT_DIR/node_modules/.bin/tsc" --version)
        echo "✓ TypeScript compiler found: $TSC_VERSION"
    else
        echo "⚠ TypeScript package found but tsc binary not available"
        echo "  Run: npm install or pnpm install or yarn install"
    fi
fi

# Check for tsconfig.json
echo ""
echo "[3/3] Checking tsconfig.json configuration..."

CURRENT_DIR="$PWD"
TSCONFIG_FOUND=false

while [ "$CURRENT_DIR" != "/" ]; do
    for config_file in "tsconfig.json" "tsconfig.app.json" "tsconfig.build.json"; do
        if [ -f "$CURRENT_DIR/$config_file" ]; then
            echo "✓ Found $config_file at $CURRENT_DIR"
            TSCONFIG_FOUND=true
            TSCONFIG_DIR="$CURRENT_DIR"
            break 2
        fi
    done
    CURRENT_DIR="$(dirname "$CURRENT_DIR")"
done

if [ "$TSCONFIG_FOUND" = false ]; then
    echo "✗ No tsconfig.json found"
    echo ""
    echo "⚠ This hook requires a tsconfig.json file"
    echo "  Create one with: npx tsc --init"
    echo "  Or manually create tsconfig.json in your project root"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. Copy hook to .claude/hooks/:"
echo "   cp \"$SCRIPT_DIR/tsc-check.sh\" ~/.claude/hooks/"
echo ""
echo "2. Add to your Claude Code settings (.claude/settings.json):"
echo ""
echo '{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/tsc-check.sh"
          }
        ]
      }
    ]
  }
}'
echo ""

if [ "$TSC_FOUND" = false ] || [ "$TSCONFIG_FOUND" = false ]; then
    echo "⚠ Warning: Missing dependencies detected above"
    echo "  The hook will not function until dependencies are installed"
    echo ""
fi
