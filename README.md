# ClaudeSmith Tools

> A curated collection of open-source tools for [Claude Code](https://claude.com/code) - including hooks, skills, agents, slash commands, plugins, and MCP servers.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/JNLei/claude-tools?style=social)](https://github.com/JNLei/claude-tools)

## 🎯 Overview

ClaudeSmith Tools is an open-source repository of productivity-enhancing tools for Claude Code. Browse our collection at [claudesmith.com](https://claudesmith.com) or install tools directly from this repository.

### What's Inside

- **Hooks** - Event-driven automation scripts that execute on Claude Code lifecycle events
- **Skills** - Knowledge documents and guidelines that extend Claude's capabilities
- **Plugins** - Extend Claude Code via the official plugin interface
- **MCP Servers** - Connect Claude Code to external systems via Model Context Protocol
- **Agents** - Autonomous workflow orchestrators for complex multi-step tasks *(coming soon)*
- **Slash Commands** - Quick action triggers for common operations *(coming soon)*

## 🚀 Quick Start

### Browse & Copy (Easiest)

1. Visit [claudesmith.com](https://claudesmith.com)
2. Browse tools by category
3. Click "Copy" to copy tool content to clipboard
4. Paste into your `.claude/` directory

### Direct Installation

#### Manual Installation

1. Clone this repository:
```bash
git clone https://github.com/JNLei/claude-tools.git
cd claudesmith-tools
```

2. Copy the tool you want to your `.claude/` directory:

**For Skills:**
```bash
# Copy entire skill directory
cp -r skills/frontend-development ~/.claude/skills/

# Update skill-rules.json to register the skill
```

**For Hooks:**
```bash
# Copy hook file(s)
cp hooks/tsc-check/tsc-check.sh ~/.claude/hooks/

# Make executable
chmod +x ~/.claude/hooks/tsc-check.sh

# Add hook configuration to settings.json
# Use the hookConfig in each hook's metadata.json to build the settings entry
```

**Important for Hooks:** After copying files, you MUST configure the hook in your Claude Code settings file (`.claude/settings.json` or `~/.claude/settings.json`). Each hook's `metadata.json` contains a `hookConfig` field showing the exact values (event, matcher, command) to add.

Example hook configuration:
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

See [hooks/README.md](hooks/README.md) for complete hook configuration guide.

3. Follow any additional setup instructions noted in the tool's `metadata.json`

## 📁 Repository Structure

```
claudesmith-tools/
├── hooks/              # Event-driven automation
│   ├── skill-activation-prompt/
│   ├── tsc-check/
│   └── ...
├── skills/             # Knowledge & guidelines
│   ├── frontend-development/
│   ├── skill-developer/
│   └── ...
├── agents/             # Workflow orchestrators (coming soon)
├── slash-commands/     # Quick actions (coming soon)
├── plugins/            # Claude Code plugins (coming soon)
├── mcp/                # MCP servers to connect external systems (coming soon)
├── scripts/            # Build & maintenance scripts
├── docs/               # Documentation
└── manifest.json       # Tool index (auto-generated)
```

## 🛠️ Available Tools

### Featured Tools

#### Frontend Development Skill
Create distinctive, production-grade frontend interfaces with exceptional design quality.
- **Category:** Skill
- **Tags:** frontend, react, design, ui, nextjs
- [View Details](skills/frontend-development/)

#### TypeScript Check Hook
Automatically run TypeScript type checking before tool execution.
- **Category:** Hook
- **Tags:** typescript, validation, build
- [View Details](hooks/tsc-check/)

> **See all tools:** Browse the complete collection at [claudesmith.com](https://claudesmith.com) or view [manifest.json](manifest.json)

## 📖 Documentation

- **[Installation Guide](docs/INSTALLATION_GUIDE.md)** - Detailed installation instructions
- **[Tool Guidelines](docs/TOOL_GUIDELINES.md)** - Best practices for using tools
- **[Contributing](docs/CONTRIBUTING.md)** - How to contribute your own tools
- **[Metadata Schema](docs/METADATA_SCHEMA.md)** - Tool metadata specification

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Submit a Tool

1. Fork this repository
2. Create a new directory for your tool under the appropriate category
3. Add your tool files and `metadata.json`
5. Submit a pull request

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for detailed guidelines.

### Report Issues

Found a bug or have a feature request? [Open an issue](https://github.com/JNLei/claude-tools/issues/new)

### Spread the Word

- Star this repository ⭐
- Share on social media
- Write a blog post about your favorite tools

## 📋 Requirements

- [Claude Code](https://claude.com/code) (latest version recommended)
- Git (for cloning the repository)
- Appropriate permissions to modify `.claude/` directory

### Tool-Specific Requirements

Each tool may have additional requirements. Check the tool's `metadata.json` (description/installation/requirements) for details:
- Hooks may require bash/sh or Node.js runtime
- Skills work out-of-the-box with Claude Code
- Some tools may require specific dependencies

## 🔧 Tool Development

### Creating a New Tool

Use our scaffolding script to quickly create a new tool:

```bash
cd scripts
npm install
npm run create-tool
```

This will guide you through:
1. Selecting tool category
2. Naming your tool
3. Generating metadata.json
4. Setting up file structure

### Testing Your Tool

1. Copy your tool to `.claude/` directory
2. Test with Claude Code
3. Verify all files are included
4. Ensure metadata.json is accurate

### Generating Manifest

After adding/updating tools, regenerate the manifest:

```bash
cd scripts
npm run generate
```

## 📊 Statistics

- **Total Tools:** 8 (and growing!)
- **Categories:** 2 active, 4 coming soon
- **Contributors:** Join us!
- **Downloads:** Tracked via GitHub API

## 🌟 Featured On

- [claudesmith.com](https://claudesmith.com) - Official directory website
- *Add your blog/site here!*

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### What This Means

- ✅ Use tools in personal and commercial projects
- ✅ Modify tools to fit your needs
- ✅ Share and distribute tools
- ✅ Include in your own projects
- ℹ️ Provide attribution (appreciated but not required)

## 🔗 Links

- **Website:** [claudesmith.com](https://claudesmith.com)
- **Documentation:** [docs/](docs/)
- **Issues:** [GitHub Issues](https://github.com/JNLei/claude-tools/issues)
- **Discussions:** [GitHub Discussions](https://github.com/JNLei/claude-tools/discussions)

## 💬 Community

- Join discussions about tools and best practices
- Share your use cases and experiences
- Get help with installation and usage
- Collaborate on new tools

## 🙏 Acknowledgments

Thank you to all contributors who make this project possible!

Special thanks to:
- The Claude Code team at Anthropic
- Early adopters and testers
- Tool contributors

## 📮 Contact

- **Issues & Bugs:** [GitHub Issues](https://github.com/JNLei/claude-tools/issues)
- **Feature Requests:** [GitHub Discussions](https://github.com/JNLei/claude-tools/discussions)
- **General Questions:** [GitHub Discussions](https://github.com/JNLei/claude-tools/discussions)

---

<p align="center">
  Made with ❤️ for the Claude Code community
</p>

<p align="center">
  <a href="https://claudesmith.com">Website</a> •
  <a href="docs/CONTRIBUTING.md">Contribute</a> •
  <a href="https://github.com/JNLei/claude-tools/issues">Report Bug</a> •
  <a href="https://github.com/JNLei/claude-tools/discussions">Discussions</a>
</p>
