# TypeScript Check Hook

Automatically runs TypeScript type checking before tool execution to catch type errors early in development.

## Description

This pre-execution hook runs `tsc --noEmit` to check for TypeScript type errors before Claude Code executes tools. It helps catch type issues early and prevents errors from propagating through your codebase.

## Features

- Automatic TypeScript type checking
- Pre-execution validation
- Clear error reporting
- Non-blocking for non-TypeScript projects
- Incremental checking support

## Installation

### Manual Installation

1. Copy the hook script to your `.claude/hooks/` directory:
```bash
cp tsc-check.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/tsc-check.sh
```

2. Add the hook configuration to your Claude Code settings file (`.claude/settings.json` or `~/.claude/settings.json`):
```json
{
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
}
```

### Automated Setup

Run the included setup script to automatically verify dependencies:
```bash
cd .claude/hooks/tsc-check
chmod +x setup.sh
./setup.sh
```

The setup script will:
- Check for TypeScript in your project
- Verify tsconfig.json exists
- Provide helpful setup guidance

## Requirements

- TypeScript installed in your project (`npm install -D typescript`)
- `tsconfig.json` in your project root
- Claude Code

## Usage

The hook runs automatically before tool execution. If type errors are found:
1. Errors are displayed in the console
2. Execution continues (non-blocking)
3. You're alerted to fix type issues

## Configuration

Configure via your project's `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true
  }
}
```

## Version

1.0.0

## License

MIT
