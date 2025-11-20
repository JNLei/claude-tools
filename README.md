# ClaudeSmith Marketplace

Open-source marketplace of Claude Code plugins (commands, hooks, agents, skills, MCPs, and bundles) in the standard Claude plugin layout.

## What’s inside

- `.claude-plugin/marketplace.json` — catalog of all plugins (regenerated from `plugins/`)
- `plugins/` — actual plugins scoped by type:
  - `commands/` — slash command plugins
  - `hooks/` — event hook plugins with `hooks/hooks.json`
  - `agents/` — subagent plugins
  - `skills/` — Agent Skills with `SKILL.md`
  - `mcp/` — MCP server plugins (`.mcp.json`)
  - `bundles/` — multi-component bundles
- `scripts/generate-marketplace.js` — rebuilds the marketplace catalog from manifests

## Quick start

1) Install or update the catalog after changes:

```bash
node scripts/generate-marketplace.js
```

2) Add the marketplace locally and install a plugin (from repo root in Claude Code):

```bash
/plugin marketplace add ./
/plugin install dev-docs@claudesmith-marketplace
```

3) Validate manifests (optional):

```bash
claude plugin validate .
```

## Adding a new plugin

Each plugin lives under `plugins/<category>/<name>/` with a manifest at `.claude-plugin/plugin.json` and component directories at the plugin root (not inside `.claude-plugin/`).

Minimal manifest example:

```json
{
  "name": "my-plugin",
  "version": "0.1.0",
  "description": "What this plugin does",
  "author": { "name": "Your Name" },
  "license": "MIT",
  "keywords": ["team", "feature"]
}
```

After adding files, run `node scripts/generate-marketplace.js` to refresh `marketplace.json`.

## Conventions

- Manifests: `.claude-plugin/plugin.json` required; keep paths relative; use `${CLAUDE_PLUGIN_ROOT}` in scripts/hooks.
- Hooks: config in `hooks/hooks.json`; scripts in `scripts/` and executable.
- Skills: `skills/<skill-name>/SKILL.md` with frontmatter.
- MCP: `.mcp.json` or `mcpServers` in manifest; commands may use `npx` or bundled binaries.
- Tags: set `keywords` in `plugin.json`; generator merges category + keywords into marketplace tags.

## Current plugins (by category)

- Commands: dev-docs
- Hooks: tsc-check, post-tool-use-tracker, skill-activation-prompt, trigger-build-resolver
- Agents: code-refactor-master
- Skills: frontend-development, skill-optimizer, skill-developer
- MCP: next-devtools, shadcn
- Bundles: next-project-starter

