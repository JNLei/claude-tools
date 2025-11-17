# Post Tool Use Tracker

Tracks and logs tool usage analytics after each Claude Code tool execution for monitoring and optimization.

## Description

This post-execution hook collects usage statistics and logs tool execution data, helping you understand tool usage patterns and optimize your workflow.

## Installation

1. Copy the hook script to your `.claude/hooks/` directory:
```bash
cp post-tool-use-tracker.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/post-tool-use-tracker.sh
```

2. Add the hook configuration to your Claude Code settings file (`.claude/settings.json` or `~/.claude/settings.json`):
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/post-tool-use-tracker.sh"
          }
        ]
      }
    ]
  }
}
```

## Features

- Tracks tool execution frequency
- Logs execution timestamps
- Monitors tool performance
- Generates usage analytics

## Requirements

- Claude Code

## Version

1.0.0

## License

MIT
