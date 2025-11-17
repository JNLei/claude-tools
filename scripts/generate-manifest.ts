#!/usr/bin/env node
/**
 * Generate manifest.json from all tool metadata.json files
 * This script scans hooks/, skills/, agents/, and slash-commands/ directories
 * and aggregates all metadata into a single manifest.json file.
 *
 * Usage: tsx scripts/generate-manifest.ts
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

interface ToolMetadata {
  id: string;
  name: string;
  category: 'hooks' | 'skills' | 'agents' | 'slash-commands';
  description: string;
  author: string;
  version: string;
  tags: string[];
  featured?: boolean;
  files: {
    main: string;
    additional?: string[];
  };
  installation: {
    targetDir: string;
    instructions?: string;
  };
  repository?: {
    url?: string;
    stars?: number;
    forks?: number;
  };
}

interface ToolManifestEntry extends ToolMetadata {
  lastUpdated: string;
  downloads?: number;
  rating?: number;
}

interface Manifest {
  version: string;
  generatedAt: string;
  totalTools: number;
  tools: ToolManifestEntry[];
  categories: {
    hooks: number;
    skills: number;
    agents: number;
    'slash-commands': number;
  };
}

const TOOL_CATEGORIES = ['hooks', 'skills', 'agents', 'slash-commands'] as const;
const ROOT_DIR = path.resolve(__dirname, '..');

/**
 * Get the last commit date for a specific file or directory
 */
function getLastCommitDate(filePath: string): string {
  try {
    const gitCommand = `git log -1 --format=%cI "${filePath}"`;
    const result = execSync(gitCommand, {
      cwd: ROOT_DIR,
      encoding: 'utf-8'
    }).trim();

    return result || new Date().toISOString();
  } catch (error) {
    console.warn(`Warning: Could not get git history for ${filePath}, using current date`);
    return new Date().toISOString();
  }
}

/**
 * Validate metadata against schema
 */
function validateMetadata(metadata: any, toolPath: string): metadata is ToolMetadata {
  const required = ['id', 'name', 'category', 'description', 'author', 'version', 'tags', 'files', 'installation'];

  for (const field of required) {
    if (!(field in metadata)) {
      throw new Error(`Missing required field "${field}" in ${toolPath}/metadata.json`);
    }
  }

  if (!TOOL_CATEGORIES.includes(metadata.category)) {
    throw new Error(`Invalid category "${metadata.category}" in ${toolPath}/metadata.json`);
  }

  if (!Array.isArray(metadata.tags)) {
    throw new Error(`Field "tags" must be an array in ${toolPath}/metadata.json`);
  }

  if (!metadata.files.main) {
    throw new Error(`Missing files.main in ${toolPath}/metadata.json`);
  }

  // Validate semver format
  const semverRegex = /^\d+\.\d+\.\d+$/;
  if (!semverRegex.test(metadata.version)) {
    throw new Error(`Invalid version format "${metadata.version}" in ${toolPath}/metadata.json. Use semver (X.Y.Z)`);
  }

  return true;
}

/**
 * Read and parse a metadata.json file
 */
async function readMetadata(category: string, toolName: string): Promise<ToolManifestEntry> {
  const toolPath = path.join(ROOT_DIR, category, toolName);
  const metadataPath = path.join(toolPath, 'metadata.json');

  try {
    const content = await fs.readFile(metadataPath, 'utf-8');
    const metadata = JSON.parse(content);

    // Validate metadata
    validateMetadata(metadata, toolPath);

    // Verify main file exists
    const mainFilePath = path.join(toolPath, metadata.files.main);
    try {
      await fs.access(mainFilePath);
    } catch {
      throw new Error(`Main file "${metadata.files.main}" not found in ${toolPath}`);
    }

    // Verify additional files exist
    if (metadata.files.additional) {
      for (const file of metadata.files.additional) {
        const filePath = path.join(toolPath, file);
        try {
          await fs.access(filePath);
        } catch {
          throw new Error(`Additional file "${file}" not found in ${toolPath}`);
        }
      }
    }

    // Get last updated date from git
    const lastUpdated = getLastCommitDate(toolPath);

    // Create manifest entry
    const manifestEntry: ToolManifestEntry = {
      ...metadata,
      lastUpdated,
      // These can be added from external sources (GitHub API, analytics)
      downloads: metadata.repository?.stars || 0,
      rating: metadata.featured ? 5.0 : 4.0,
    };

    return manifestEntry;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error reading metadata for ${category}/${toolName}: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Scan a category directory for tools
 */
async function scanCategory(category: string): Promise<ToolManifestEntry[]> {
  const categoryPath = path.join(ROOT_DIR, category);

  try {
    await fs.access(categoryPath);
  } catch {
    console.log(`Category directory ${category}/ does not exist, skipping...`);
    return [];
  }

  const entries = await fs.readdir(categoryPath, { withFileTypes: true });
  const tools: ToolManifestEntry[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('.')) continue; // Skip hidden directories

    try {
      const metadata = await readMetadata(category, entry.name);
      tools.push(metadata);
      console.log(`✓ Loaded ${category}/${entry.name}`);
    } catch (error) {
      console.error(`✗ Failed to load ${category}/${entry.name}:`, error);
      process.exit(1);
    }
  }

  return tools;
}

/**
 * Generate the complete manifest
 */
async function generateManifest(): Promise<void> {
  console.log('Generating manifest.json...\n');

  const allTools: ToolManifestEntry[] = [];
  const categories = {
    hooks: 0,
    skills: 0,
    agents: 0,
    'slash-commands': 0,
  };

  // Scan all categories
  for (const category of TOOL_CATEGORIES) {
    console.log(`\nScanning ${category}/...`);
    const tools = await scanCategory(category);
    allTools.push(...tools);
    categories[category] = tools.length;
  }

  // Sort tools: featured first, then alphabetically by name
  allTools.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });

  // Create manifest
  const manifest: Manifest = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    totalTools: allTools.length,
    tools: allTools,
    categories,
  };

  // Write manifest.json
  const manifestPath = path.join(ROOT_DIR, 'manifest.json');
  await fs.writeFile(
    manifestPath,
    JSON.stringify(manifest, null, 2) + '\n',
    'utf-8'
  );

  console.log('\n' + '='.repeat(50));
  console.log('✓ Manifest generated successfully!');
  console.log('='.repeat(50));
  console.log(`Total tools: ${manifest.totalTools}`);
  console.log(`  - Hooks: ${categories.hooks}`);
  console.log(`  - Skills: ${categories.skills}`);
  console.log(`  - Agents: ${categories.agents}`);
  console.log(`  - Slash Commands: ${categories['slash-commands']}`);
  console.log(`\nOutput: ${manifestPath}`);
}

// Run the script
generateManifest().catch((error) => {
  console.error('\n✗ Error generating manifest:', error);
  process.exit(1);
});
