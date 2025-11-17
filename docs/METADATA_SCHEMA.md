# Metadata Schema for claudesmith-tools

This document defines the metadata.json schema used for each tool in the public repository.

## Schema Definition

Each tool directory must contain a `metadata.json` file with the following structure:

```json
{
  "id": "string (required)",
  "name": "string (required)",
  "category": "hooks | skills | agents | slash-commands | plugins | mcp (required)",
  "description": "string (required)",
  "author": "string (required)",
  "version": "string (required, semver format)",
  "tags": ["array", "of", "strings"] (required),
  "featured": boolean (optional, default: false),
  "files": {
    "main": "string (required) - primary file path",
    "additional": ["array", "of", "additional", "file", "paths"] (optional)
  },
  "installation": {
    "targetDir": "string (required) - where to copy in .claude/",
    "instructions": "string (optional) - additional setup steps"
  },
  "repository": {
    "url": "string (optional) - GitHub URL to this tool's directory",
    "stars": number (optional),
    "forks": number (optional)
  }
}
```

## Field Descriptions

### Core Fields

- **id**: Unique identifier (kebab-case, e.g., "skill-activation-prompt")
- **name**: Human-readable name (e.g., "Skill Activation Prompt")
- **category**: Tool type classification
  - `hooks`: Event-driven automation scripts
  - `skills`: Knowledge and guideline documents
  - `agents`: Autonomous workflow orchestrators
  - `slash-commands`: Quick action triggers
  - `plugins`: Claude Code plugins
  - `mcp`: MCP servers that connect Claude Code to external systems
- **description**: Brief description of what the tool does (max 200 chars)
- **author**: Creator name or organization
- **version**: Semantic version (e.g., "1.0.0", "2.1.3")
- **tags**: Searchable keywords (e.g., ["typescript", "build", "validation"])
- **featured**: Whether to highlight on website (optional)

### File References

- **files.main**: Primary file path relative to tool directory
  - For skills: "SKILL.md"
  - For hooks: "hook-name.sh" or "hook-name.ts"
- **files.additional**: Other files to include (e.g., ["REFERENCE.md", "EXAMPLES.md"])

### Installation Info

- **installation.targetDir**: Where to copy files in user's `.claude/` directory
  - For skills: ".claude/skills/[tool-name]"
  - For hooks: ".claude/hooks/[tool-name]" or ".claude/hooks/" (if single file)
- **installation.instructions**: Additional setup steps (optional)

### Repository Metadata (Optional)

- **repository.url**: Direct GitHub link to tool directory
- **repository.stars**: GitHub stars (can be auto-generated)
- **repository.forks**: GitHub forks (can be auto-generated)

## Example: Skill Metadata

```json
{
  "id": "frontend-development",
  "name": "Frontend Development",
  "category": "skills",
  "description": "Create distinctive, production-grade frontend interfaces with exceptional design quality",
  "author": "ClaudeSmith",
  "version": "1.0.0",
  "tags": ["frontend", "react", "design", "ui", "nextjs"],
  "featured": true,
  "files": {
    "main": "SKILL.md",
    "additional": ["REFERENCE.md", "EXAMPLES.md", "EXISTING-CODEBASE-CHECKLIST.md", "NEW-PROJECT-DESIGN.md"]
  },
  "installation": {
    "targetDir": ".claude/skills/frontend-development",
    "instructions": "After copying files, ensure the skill is registered in .claude/skills/skill-rules.json"
  },
  "repository": {
    "url": "https://github.com/yourorg/claudesmith-tools/tree/main/skills/frontend-development"
  }
}
```

## Example: Hook Metadata

```json
{
  "id": "tsc-check",
  "name": "TypeScript Check Hook",
  "category": "hooks",
  "description": "Automatically run TypeScript type checking before tool execution",
  "author": "ClaudeSmith",
  "version": "1.2.0",
  "tags": ["typescript", "validation", "build", "type-checking"],
  "featured": false,
  "files": {
    "main": "tsc-check.sh"
  },
  "installation": {
    "targetDir": ".claude/hooks",
    "instructions": "Make the hook executable: chmod +x .claude/hooks/tsc-check.sh"
  },
  "repository": {
    "url": "https://github.com/yourorg/claudesmith-tools/tree/main/hooks/tsc-check"
  }
}
```

## Validation Rules

1. **id** must be unique across all tools
2. **version** must follow semver format (X.Y.Z)
3. **category** must be one of the six defined types
4. **tags** array should have 1-10 items
5. **description** should be 50-200 characters
6. **files.main** must reference an existing file
7. All file paths in **files.additional** must exist

## Auto-Generated Fields

The manifest generator script will automatically add:
- `lastUpdated`: ISO timestamp of last git commit for the tool
- `downloads`: Can be tracked via GitHub API or analytics
- `rating`: Can be calculated from GitHub stars or user feedback

These fields are NOT stored in metadata.json but generated during manifest creation.
