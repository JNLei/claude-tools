# Contributing to ClaudeSmith Tools

Thanks for helping grow this open-source collection of Claude Code tools! This repo welcomes contributions of **agents, skills, hooks, plugins, MCP servers, and slash commands**. You can also improve docs, scripts, and examples.

## How to Contribute

1) **Fork and branch**  
   - Fork `JNLei/claude-tools`, create a feature branch (`feat/add-my-tool`).

2) **Pick a category**  
   - Use one of: `hooks`, `skills`, `agents`, `slash-commands`, `plugins`, `mcp`.

3) **Create your tool directory** under the category  
   - Example: `hooks/my-hook/` or `plugins/my-plugin/`.
   - Include a `metadata.json`.
   - Add the main executable/content files (e.g., `.sh`, `.ts`, `SKILL.md`, plugin server code).

4) **Follow metadata schema**  
   - See `docs/METADATA_SCHEMA.md` for required fields.  
   - `category` must match step 2.  
   - Include `files.main`; list any extra files in `files.additional`.  
   - For hooks, provide `hookConfig` (used to derive settings).  
   - For plugins and MCP servers, align directory layout with their respective interfaces.

5) **Validate locally (recommended)**  
   - Ensure JSON is valid (`python3 -m json.tool metadata.json`).  
   - If you add scripts/tests, run them and note results in your PR.  
   - Do not manually edit `manifest.json`; it is generated from metadata.

6) **Commit and open a PR**  
   - Keep commits scoped and include a short description.  
   - In the PR, summarize the tool, category, and any prerequisites.

## Contribution Checklist

- [ ] Tool placed under the correct category directory.
- [ ] `metadata.json` follows `docs/METADATA_SCHEMA.md` and uses the right `category`.
- [ ] Metadata includes clear description, install info, and requirements.
- [ ] Scripts/assets referenced in metadata actually exist.
- [ ] No unrelated file churn; manifest left untouched.
- [ ] Any tests or checks were run (note them in the PR).

## Additional Guidelines

- **Licensing:** Contributions are MIT-licensed by default; ensure included dependencies are compatible.
- **Security:** Avoid committing secrets; document required env vars instead.
- **Clarity first:** Prefer minimal setup steps and sensible defaults.
- **Backwards compatibility:** If you change existing tools, explain user impact and migration steps.

Thanks for contributing! Together we can make Claude Code tooling richer and easier to use.
