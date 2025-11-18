# claudesmith-tools Public Repository Structure

This document defines the complete directory structure for the public tools repository.

## Complete Directory Tree

```
claudesmith-tools/
├── .github/
│   ├── workflows/
│   │   ├── generate-manifest.yml      # Auto-generate manifest on push
│   │   ├── validate-metadata.yml      # Validate all metadata.json files
│   │   └── test-tools.yml             # Test tools work correctly
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── tool_submission.md
│   └── PULL_REQUEST_TEMPLATE.md
├── hooks/
│   ├── skill-activation-prompt/
│   │   ├── skill-activation-prompt.sh
│   │   ├── skill-activation-prompt.ts
│   │   └── metadata.json
│   ├── tsc-check/
│   │   ├── tsc-check.sh
│   │   └── metadata.json
│   ├── trigger-build-resolver/
│   │   ├── trigger-build-resolver.sh
│   │   └── metadata.json
│   ├── post-tool-use-tracker/
│   │   ├── post-tool-use-tracker.sh
│   │   └── metadata.json
│   └── README.md                      # Overview of all hooks (optional)
├── skills/
│   ├── frontend-development/
│   │   ├── SKILL.md
│   │   ├── REFERENCE.md
│   │   ├── EXAMPLES.md
│   │   ├── EXISTING-CODEBASE-CHECKLIST.md
│   │   ├── NEW-PROJECT-DESIGN.md
│   │   └── metadata.json
│   ├── skill-developer/
│   │   ├── SKILL.md
│   │   ├── [other skill files]
│   │   └── metadata.json
│   ├── skill-optimizer/
│   │   ├── SKILL.md
│   │   ├── [other skill files]
│   │   └── metadata.json
│   └── README.md                      # Overview of all skills (optional)
├── agents/
│   ├── README.md                      # Overview (future agents)
│   └── .gitkeep
├── slash-commands/
│   ├── README.md                      # Overview (future commands)
│   └── .gitkeep
├── plugins/
│   ├── README.md                      # Overview (future plugins)
│   └── .gitkeep
├── mcp/
│   ├── README.md                      # Overview (future MCP servers)
│   └── .gitkeep
├── scripts/
│   ├── generate-manifest.ts           # Generate manifest.json from metadata
│   ├── validate-metadata.ts           # Validate all metadata.json files
│   ├── create-tool.ts                 # Scaffolding script for new tools
│   └── package.json                   # Dependencies for scripts
├── docs/
│   ├── CONTRIBUTING.md                # How to contribute tools
│   ├── METADATA_SCHEMA.md             # Metadata.json specification
│   ├── TOOL_GUIDELINES.md             # Best practices for tools
│   └── INSTALLATION_GUIDE.md          # How to install tools
├── manifest.json                      # GENERATED - Do not edit manually
├── package.json                       # Root package.json
├── tsconfig.json                      # TypeScript config for scripts
├── .gitignore
├── .prettierrc                        # Code formatting
├── .editorconfig                      # Editor configuration
├── LICENSE                            # MIT License
└── README.md                          # Main documentation

```

## Directory Responsibilities

### `/hooks/`
Contains event-driven automation scripts that execute on Claude Code lifecycle events.

Each hook tool must have:
- Main executable file (.sh or .ts)
- metadata.json (following schema)
Additional docs are optional.

### `/skills/`
Contains knowledge documents and guidelines that extend Claude Code's capabilities.

Each skill must have:
- SKILL.md (main skill definition with YAML frontmatter)
- metadata.json (following schema)
- Additional reference files (REFERENCE.md, EXAMPLES.md, etc.)
Additional docs are optional.

### `/agents/`
Future directory for autonomous workflow orchestrators.
Currently empty but structured for future expansion.

### `/slash-commands/`
Future directory for quick action triggers.
Currently empty but structured for future expansion.

### `/plugins/`
Future directory for Claude Code plugins following the plugin interface.
Currently empty but structured for future expansion.

### `/mcp/`
Future directory for MCP servers that connect Claude Code to external systems.
Currently empty but structured for future expansion.

### `/scripts/`
Build and maintenance scripts for the repository itself.

**Key scripts:**
- `generate-manifest.ts`: Scans all tools, reads metadata.json files, generates manifest.json
- `validate-metadata.ts`: Ensures all metadata.json files follow schema
- `create-tool.ts`: Interactive CLI to scaffold new tool directories

### `/.github/`
GitHub-specific configuration and automation.

**Workflows:**
- `generate-manifest.yml`: Runs on push to auto-regenerate manifest.json
- `validate-metadata.yml`: Runs on PR to validate metadata changes
- `test-tools.yml`: Tests that tools work correctly

### `/docs/`
Documentation for contributors and users.

### Root Files

- **manifest.json**: Auto-generated index of all tools with metadata (committed to repo)
- **package.json**: Root package configuration, includes scripts for maintenance
- **README.md**: Main repository documentation with installation instructions
- **LICENSE**: MIT License for open source distribution

## File Naming Conventions

### Hooks
- Executable files: `hook-name.sh` or `hook-name.ts`
- Directory name matches hook name: `hook-name/`
- metadata.json always named `metadata.json`

### Skills
- Main file always: `SKILL.md`
- Reference files: `REFERENCE.md`, `EXAMPLES.md`, etc.
- Directory name matches skill name: `skill-name/`
- metadata.json always named `metadata.json`

### Common Files
- Every tool directory has: `metadata.json`
- Additional docs (like README.md) are optional; metadata should carry the essential description/installation info
- MCP entries may be metadata-only; installation should include the command to install the server
- metadata.json contains machine-readable metadata

## manifest.json Structure

Generated file that aggregates all tool metadata:

```json
{
  "version": "1.0.0",
  "generatedAt": "2025-11-17T12:00:00Z",
  "totalTools": 8,
  "tools": [
    {
      "id": "frontend-development",
      "name": "Frontend Development",
      "category": "skills",
      "description": "...",
      "author": "ClaudeSmith",
      "version": "1.0.0",
      "tags": ["frontend", "react"],
      "featured": true,
      "files": { "main": "SKILL.md", "additional": [...] },
      "installation": { "targetDir": ".claude/skills/frontend-development" },
      "repository": { "url": "..." },
      "lastUpdated": "2025-11-15T10:30:00Z",
      "downloads": 1250,
      "rating": 4.8
    },
    ...
  ],
  "categories": {
    "hooks": 4,
    "skills": 3,
    "agents": 0,
    "slash-commands": 0,
    "plugins": 0,
    "mcp": 0
  }
}
```

## Next Steps

1. Create public GitHub repository: `claudesmith-tools`
2. Initialize with this structure
3. Migrate existing tools from `.claude/` directory
4. Create metadata.json for each tool
5. Set up GitHub Actions for automation
6. Keep the top-level README.md updated (per-tool READMEs are optional)
