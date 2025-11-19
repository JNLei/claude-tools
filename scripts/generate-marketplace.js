#!/usr/bin/env node
/*
 * Regenerate .claude-plugin/marketplace.json plugin listings by scanning the plugins/ directory.
 * Keeps existing top-level metadata (name, owner, metadata) and replaces the plugins array.
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const MARKETPLACE_PATH = path.join(ROOT, '.claude-plugin', 'marketplace.json');
const PLUGINS_ROOT = path.join(ROOT, 'plugins');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function findPluginDirs(base) {
  const found = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const manifest = path.join(full, '.claude-plugin', 'plugin.json');
        if (fs.existsSync(manifest)) {
          found.push(full);
          continue; // don't descend further once a plugin root is found
        }
        walk(full);
      }
    }
  }
  walk(base);
  return found;
}

function deriveCategory(relPath) {
  const [category] = relPath.split(path.sep);
  return category || 'uncategorized';
}

function buildPluginEntry(pluginDir) {
  const manifestPath = path.join(pluginDir, '.claude-plugin', 'plugin.json');
  const manifest = readJson(manifestPath);
  const rel = path.relative(PLUGINS_ROOT, pluginDir).split(path.sep).join('/');
  const category = deriveCategory(rel);
  const keywords = Array.isArray(manifest.keywords) ? manifest.keywords : [];
  const baseTags = [category];
  const tags = Array.from(new Set([...baseTags, ...keywords]));

  if (!manifest.name) {
    throw new Error(`Missing name in manifest: ${manifestPath}`);
  }

  return {
    name: manifest.name,
    source: `./plugins/${rel}`,
    description: manifest.description || '',
    category,
    tags
  };
}

function main() {
  if (!fs.existsSync(MARKETPLACE_PATH)) {
    throw new Error('No marketplace.json found at ' + MARKETPLACE_PATH);
  }
  if (!fs.existsSync(PLUGINS_ROOT)) {
    throw new Error('No plugins/ directory found');
  }

  const head = readJson(MARKETPLACE_PATH);
  const pluginDirs = findPluginDirs(PLUGINS_ROOT);
  const entries = pluginDirs.map(buildPluginEntry).sort((a, b) => a.name.localeCompare(b.name));

  const next = {
    ...head,
    plugins: entries
  };

  fs.writeFileSync(MARKETPLACE_PATH, JSON.stringify(next, null, 2) + '\n');
  console.log(`Updated ${MARKETPLACE_PATH} with ${entries.length} plugins.`);
}

main();
