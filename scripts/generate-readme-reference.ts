#!/usr/bin/env npx tsx
/**
 * Generate SDK Reference section for README.md from the OpenAPI spec.
 *
 * This script parses the OpenAPI spec and generates markdown tables
 * documenting all available methods with descriptions from the spec.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';

interface OpenAPISpec {
  paths: Record<string, Record<string, OperationObject>>;
}

interface OperationObject {
  tags?: string[];
  operationId?: string;
  summary?: string;
}

// Map OpenAPI tags to SDK namespace names and display names
const TAG_TO_RESOURCE: Record<string, [string, string]> = {
  'Posts': ['posts', 'Posts'],
  'Accounts': ['accounts', 'Accounts'],
  'Profiles': ['profiles', 'Profiles'],
  'Analytics': ['analytics', 'Analytics'],
  'Account Groups': ['accountGroups', 'Account Groups'],
  'Queue': ['queue', 'Queue'],
  'Webhooks': ['webhooks', 'Webhooks'],
  'API Keys': ['apiKeys', 'API Keys'],
  'Media': ['media', 'Media'],
  'Tools': ['tools', 'Tools'],
  'Users': ['users', 'Users'],
  'Usage': ['usage', 'Usage'],
  'Logs': ['logs', 'Logs'],
  'Connect': ['connect', 'Connect (OAuth)'],
  'Reddit Search': ['reddit', 'Reddit'],
  'Invites': ['invites', 'Invites'],
  'Messages': ['messages', 'Messages (Inbox)'],
  'Comments': ['comments', 'Comments (Inbox)'],
  'Reviews': ['reviews', 'Reviews (Inbox)'],
  // Group these under existing resources
  'GMB Reviews': ['accounts', 'Accounts'],
  'LinkedIn Mentions': ['accounts', 'Accounts'],
};

// Order of resources in the README
const RESOURCE_ORDER = [
  'posts',
  'accounts',
  'profiles',
  'analytics',
  'accountGroups',
  'queue',
  'webhooks',
  'apiKeys',
  'media',
  'tools',
  'users',
  'usage',
  'logs',
  'connect',
  'reddit',
  'messages',
  'comments',
  'reviews',
  'invites',
];

// Nested resources mapping (for connect sub-resources)
const NESTED_RESOURCES: Record<string, string[]> = {
  'connect': ['facebook', 'googleBusiness', 'linkedin', 'pinterest', 'snapchat', 'bluesky', 'telegram'],
};

interface ResourceMethod {
  name: string;
  fullPath: string;
  description: string;
}

/**
 * Generate a sort key for consistent method ordering.
 */
function getMethodSortKey(methodName: string): [number, string] {
  const nameLower = methodName.toLowerCase();

  if (nameLower.startsWith('list') || nameLower.startsWith('getall')) {
    return [0, methodName];
  } else if (nameLower.startsWith('bulk') || nameLower.startsWith('create')) {
    return [1, methodName];
  } else if (nameLower.startsWith('get') && !nameLower.startsWith('getall')) {
    return [2, methodName];
  } else if (nameLower.startsWith('update')) {
    return [3, methodName];
  } else if (nameLower.startsWith('delete')) {
    return [4, methodName];
  } else {
    return [5, methodName];
  }
}

function sortMethods(methods: ResourceMethod[]): ResourceMethod[] {
  return [...methods].sort((a, b) => {
    const keyA = getMethodSortKey(a.name);
    const keyB = getMethodSortKey(b.name);
    if (keyA[0] !== keyB[0]) {
      return keyA[0] - keyB[0];
    }
    return keyA[1].localeCompare(keyB[1]);
  });
}

function loadOpenAPISpec(specPath: string): OpenAPISpec {
  const content = fs.readFileSync(specPath, 'utf-8');
  return yaml.parse(content);
}

function extractMethodsFromSpec(spec: OpenAPISpec): Record<string, ResourceMethod[]> {
  const resources: Record<string, ResourceMethod[]> = {};
  for (const name of RESOURCE_ORDER) {
    resources[name] = [];
  }

  for (const [pathStr, pathItem] of Object.entries(spec.paths || {})) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) {
        continue;
      }

      const tags = operation.tags || [];
      if (tags.length === 0) continue;

      const tag = tags[0];
      if (!(tag in TAG_TO_RESOURCE)) continue;

      const [resourceName] = TAG_TO_RESOURCE[tag];
      const operationId = operation.operationId || '';
      const summary = operation.summary || '';

      if (!operationId) continue;

      // Use summary as description, or generate from operationId
      const description = summary || operationId.replace(/([A-Z])/g, ' $1').trim();

      resources[resourceName].push({
        name: operationId,
        fullPath: `${resourceName}.${operationId}`,
        description,
      });
    }
  }

  // Sort methods within each resource
  for (const resourceName of RESOURCE_ORDER) {
    resources[resourceName] = sortMethods(resources[resourceName]);
  }

  return resources;
}

function generateReferenceSection(resources: Record<string, ResourceMethod[]>): string {
  const lines: string[] = ['## SDK Reference', ''];

  // Get display names
  const displayNames: Record<string, string> = {};
  for (const [, [name, display]] of Object.entries(TAG_TO_RESOURCE)) {
    displayNames[name] = display;
  }

  for (const resourceName of RESOURCE_ORDER) {
    const methods = resources[resourceName] || [];
    if (methods.length === 0) continue;

    const displayName = displayNames[resourceName] || resourceName;

    lines.push(`### ${displayName}`);
    lines.push('| Method | Description |');
    lines.push('|--------|-------------|');

    for (const method of methods) {
      lines.push(`| \`${method.fullPath}()\` | ${method.description} |`);
    }

    lines.push('');
  }

  return lines.join('\n');
}

function updateReadme(readmePath: string, referenceSection: string): void {
  let content = fs.readFileSync(readmePath, 'utf-8');

  // Find the SDK Reference section and replace it
  // It starts with "## SDK Reference" and ends before "## Requirements"
  const pattern = /## SDK Reference\n[\s\S]*?(?=## Requirements)/;
  const replacement = referenceSection + '\n';

  const newContent = content.replace(pattern, replacement);

  if (newContent !== content) {
    fs.writeFileSync(readmePath, newContent);
    console.log(`Updated ${readmePath}`);
  } else {
    console.log('No changes needed');
  }
}

function main(): void {
  const scriptDir = path.dirname(new URL(import.meta.url).pathname);
  const specPath = path.join(scriptDir, '..', 'openapi.yaml');
  const readmePath = path.join(scriptDir, '..', 'README.md');

  const spec = loadOpenAPISpec(specPath);
  const resources = extractMethodsFromSpec(spec);
  const referenceSection = generateReferenceSection(resources);

  if (process.argv.includes('--print')) {
    console.log(referenceSection);
  } else {
    updateReadme(readmePath, referenceSection);
  }
}

main();
