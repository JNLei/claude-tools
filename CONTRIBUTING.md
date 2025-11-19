# Contributing

Thanks for contributing to the ClaudeSmith marketplace. The goal is to keep plugin authors focused on their tools while the catalog stays auto-generated.

## Prerequisites

- Node.js 18+ (for `scripts/generate-marketplace.js`)
- Claude Code CLI if you want to validate (`claude plugin validate .`)

## Adding or updating a plugin

1. Pick the category under `plugins/` (`commands/`, `hooks/`, `agents/`, `skills/`, `mcp/`, `bundles/`).
2. Create the plugin folder `plugins/<category>/<name>/`.
3. Add `.claude-plugin/plugin.json` (required). Include:
   - `name` (kebab-case), `version`, `description`, `author`, `license`
   - `keywords` to influence marketplace tags
   - Optional: `hooks`, `commands`, `agents`, `skills`, `mcpServers` paths
4. Place components at plugin root (not inside `.claude-plugin/`):
   - Hooks: `hooks/hooks.json`, scripts under `scripts/` (chmod +x)
   - Commands: `commands/*.md`
   - Agents: `agents/*.md`
   - Skills: `skills/<skill>/SKILL.md`
   - MCP: `.mcp.json` (or inline `mcpServers`)
5. Run the generator to refresh the catalog:

```bash
node scripts/generate-marketplace.js
```

6. (Optional) Validate manifests:

```bash
claude plugin validate .
```

7. Commit your changes.

## Style and naming

- Use kebab-case for plugin names.
- Keep manifests minimal but include `keywords` for discoverability.
- Use `${CLAUDE_PLUGIN_ROOT}` in hooks/scripts for portable paths.
- Keep scripts executable where applicable.

## PR checklist

- [ ] New/updated plugin has `.claude-plugin/plugin.json` with `name`, `version`, `description`, `author`, `license`.
- [ ] Components are in the correct root directories (commands/, hooks/, agents/, skills/, scripts/, .mcp.json).
- [ ] `node scripts/generate-marketplace.js` has been run (and staged output).
- [ ] Any scripts meant to run are executable (`chmod +x`).
- [ ] Optional: `claude plugin validate .` passes locally.

