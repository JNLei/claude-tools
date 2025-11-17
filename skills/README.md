# Skills

Knowledge documents and guidelines that extend Claude Code's capabilities.

## Available Skills

- **[frontend-development](frontend-development/)** ⭐ - Create distinctive, production-grade frontend interfaces
- **[skill-developer](skill-developer/)** ⭐ - Create and manage Claude Code skills following best practices
- **[skill-optimizer](skill-optimizer/)** - Optimize skills for token efficiency

## Installation

Each skill has its own installation instructions. Generally:

```bash
# Copy the skill directory to your .claude/skills/ directory
cp -r skills/[skill-name] ~/.claude/skills/

# Register the skill in your skill-rules.json
# Edit ~/.claude/skills/skill-rules.json and add the skill configuration
```

## Using Skills

Skills are automatically activated based on your prompts. Each skill defines its own trigger patterns in the SKILL.md frontmatter.

## Creating Skills

For guidelines on creating your own skills, see the [skill-developer](skill-developer/) skill or our [contributing documentation](../docs/CONTRIBUTING.md).
