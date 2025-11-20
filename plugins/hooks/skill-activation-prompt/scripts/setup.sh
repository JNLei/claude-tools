#!/bin/bash

# Skill Activation Prompt Hook - Setup Script
# Automatically checks dependencies and helps configure the hook

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Skill Activation Prompt Hook - Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check for Node.js
echo "[1/4] Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js found: $NODE_VERSION"
else
    echo "✗ Node.js not found"
    echo ""
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check for tsx
echo ""
echo "[2/4] Checking tsx installation..."
if command -v tsx &> /dev/null; then
    TSX_VERSION=$(tsx --version)
    echo "✓ tsx found: $TSX_VERSION"
else
    echo "✗ tsx not found"
    echo ""
    read -p "Install tsx globally? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Installing tsx..."
        npm install -g tsx
        echo "✓ tsx installed successfully"
    else
        echo "⚠ Skipping tsx installation. The hook requires tsx to run."
        echo "Install manually: npm install -g tsx"
    fi
fi

# Make hook script executable
echo ""
echo "[3/4] Making hook script executable..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
chmod +x "$SCRIPT_DIR/skill-activation-prompt.sh"
echo "✓ Script is now executable"

# Check for skill-rules.json
echo ""
echo "[4/4] Checking skill-rules.json configuration..."
SKILLS_DIR="$HOME/.claude/skills"
SKILL_RULES="$SKILLS_DIR/skill-rules.json"

if [ -f "$SKILL_RULES" ]; then
    echo "✓ skill-rules.json found at $SKILL_RULES"
else
    echo "✗ skill-rules.json not found"
    echo ""
    read -p "Create a template skill-rules.json? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        mkdir -p "$SKILLS_DIR"
        cat > "$SKILL_RULES" << 'EOF'
{
  "version": "1.0",
  "skills": {
    "frontend-development": {
      "type": "domain",
      "enforcement": "suggest",
      "priority": "high",
      "promptTriggers": {
        "keywords": ["react", "component", "ui", "design", "frontend"],
        "intentPatterns": ["create.*component", "build.*page", "design.*interface"]
      }
    },
    "skill-developer": {
      "type": "domain",
      "enforcement": "suggest",
      "priority": "medium",
      "promptTriggers": {
        "keywords": ["skill", "hook", "trigger", "pattern"],
        "intentPatterns": ["create.*skill", "add.*hook"]
      }
    }
  }
}
EOF
        echo "✓ Created template skill-rules.json at $SKILL_RULES"
        echo "  Edit this file to customize skill activation patterns"
    else
        echo "⚠ Skipping skill-rules.json creation"
        echo "  The hook requires this file to function properly"
        echo "  Create it at: $SKILL_RULES"
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. Copy hook files to .claude/hooks/:"
echo "   cp -r \"$SCRIPT_DIR\" ~/.claude/hooks/"
echo ""
echo "2. Add to your Claude Code settings (.claude/settings.json):"
echo ""
echo '{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/skill-activation-prompt/skill-activation-prompt.sh"
          }
        ]
      }
    ]
  }
}'
echo ""
echo "3. Customize ~/.claude/skills/skill-rules.json for your skills"
echo ""
