# Hooks

Event-driven automation scripts that execute on Claude Code lifecycle events.

## Available Hooks

- **[skill-activation-prompt](skill-activation-prompt/)** - Automatically activates relevant skills based on user prompts
- **[tsc-check](tsc-check/)** - Runs TypeScript type checking before tool execution
- **[trigger-build-resolver](trigger-build-resolver/)** - Triggers build processes automatically
- **[post-tool-use-tracker](post-tool-use-tracker/)** - Tracks tool usage analytics

## Installation

Claude Code hooks require two steps to install:

### 1. Copy Hook Files

Copy the hook scripts to your `.claude/hooks/` directory:

```bash
# Copy a specific hook
cp hooks/[hook-name]/*.sh ~/.claude/hooks/
cp hooks/[hook-name]/*.ts ~/.claude/hooks/  # If TypeScript files exist
chmod +x ~/.claude/hooks/*.sh
```

### 2. Configure in settings.json

Add hook configuration to your Claude Code settings file (`.claude/settings.json` or `~/.claude/settings.json`):

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
    ],
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
    ],
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/trigger-build-resolver.sh"
          }
        ]
      },
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

Each hook's README.md contains the exact configuration needed for that specific hook.

## Hook Events

Hooks are triggered by specific Claude Code events:

- **UserPromptSubmit** - Runs when user submits a prompt
- **PreToolUse** - Runs before Claude executes a tool (supports matchers)
- **PostToolUse** - Runs after Claude completes a tool (supports matchers)
- **Stop** - Runs when Claude finishes responding
- **SessionStart** - Runs when a new session starts
- **SessionEnd** - Runs when a session ends

See [Claude Code Hooks Documentation](https://code.claude.com/docs/en/hooks-reference) for complete details.

## Setup Scripts

Several hooks include automated setup scripts to verify dependencies:

```bash
cd hooks/skill-activation-prompt
chmod +x setup.sh
./setup.sh
```

Setup scripts will check for required dependencies and help configure the hook properly.

## Creating Hooks

For guidelines on creating your own hooks, see our [contributing documentation](../docs/CONTRIBUTING.md).
