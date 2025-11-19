# Skill Activation Prompt Hook

Automatically detects and activates relevant skills based on user prompts using keyword and intent pattern matching.

## Description

This hook monitors user prompts and automatically activates the appropriate skills by matching against keywords and intent patterns defined in your `skill-rules.json` file. It helps streamline your workflow by ensuring the right skill context is loaded for your tasks.

## Features

- Keyword-based skill matching
- Intent pattern recognition
- Automatic skill activation
- Configurable via skill-rules.json
- TypeScript implementation for reliability

## Installation

### Manual Installation

1. Copy both files to your `.claude/hooks/` directory:
```bash
cp skill-activation-prompt.sh ~/.claude/hooks/
cp skill-activation-prompt.ts ~/.claude/hooks/
chmod +x ~/.claude/hooks/skill-activation-prompt.sh
```

2. Ensure Node.js is installed (required for TypeScript execution)

3. Add the hook configuration to your Claude Code settings file (`.claude/settings.json` or `~/.claude/settings.json`):
```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/skill-activation-prompt.sh"
          }
        ]
      }
    ]
  }
}
```

### Automated Setup

Run the included setup script to automatically check dependencies:
```bash
cd .claude/hooks/skill-activation-prompt
chmod +x setup.sh
./setup.sh
```

The setup script will:
- Verify Node.js installation
- Check for tsx (install globally if needed)
- Verify or help create skill-rules.json

## Usage

The hook automatically runs when you submit a prompt to Claude Code. It:
1. Reads your prompt
2. Checks against skill-rules.json patterns
3. Activates matching skills
4. Injects skill context into the conversation

## Configuration

The hook uses `.claude/skills/skill-rules.json` for configuration. Example:

```json
{
  "version": "1.0",
  "skills": {
    "frontend-development": {
      "type": "domain",
      "enforcement": "suggest",
      "priority": "high",
      "promptTriggers": {
        "keywords": ["react", "component", "ui", "design"],
        "intentPatterns": ["create.*component", "build.*page"]
      }
    }
  }
}
```

## Requirements

- Node.js runtime
- Claude Code
- skill-rules.json file in .claude/skills/

## Version

1.0.0

## License

MIT
