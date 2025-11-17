# Build Resolver Trigger Hook

Triggers build processes and resolves build configurations automatically when file changes are detected.

## Description

This hook monitors file changes and automatically triggers appropriate build processes, helping keep your project in a ready-to-run state.

## Installation

1. Copy the hook script to your `.claude/hooks/` directory:
```bash
cp trigger-build-resolver.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/trigger-build-resolver.sh
```

2. Add the hook configuration to your Claude Code settings file (`.claude/settings.json` or `~/.claude/settings.json`):
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/trigger-build-resolver.sh"
          }
        ]
      }
    ]
  }
}
```

## Requirements

- Claude Code
- Build tools configured in your project (npm, webpack, etc.)

## Version

1.0.0

## License

MIT
