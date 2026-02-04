#!/usr/bin/env npx tsx
/**
 * Generate SDK Reference section for README.md from the OpenAPI spec.
 *
 * This script parses the OpenAPI spec and generates markdown tables
 * documenting all available methods with descriptions from the spec.
 *
 * New tags added to the OpenAPI spec are auto-discovered and included
 * in the README. Only special cases need explicit configuration below.
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

// Tags that should be merged into another resource instead of getting their own section
const TAG_MERGE: Record<string, string> = {
  'GMB Reviews': 'accounts',
  'LinkedIn Mentions': 'accounts',
};

// Tags to skip entirely (no SDK methods)
const SKIP_TAGS = new Set([
  'Inbox Access',
]);

// Override display names (tag → display name). Unmatched tags use the tag name as-is.
const DISPLAY_NAME_OVERRIDES: Record<string, string> = {
  'Connect': 'Connect (OAuth)',
  'Reddit Search': 'Reddit',
  'Messages': 'Messages (Inbox)',
  'Comments': 'Comments (Inbox)',
  'Reviews': 'Reviews (Inbox)',
};

// Override resource key names (tag → camelCase key). Unmatched tags are auto-converted.
const RESOURCE_KEY_OVERRIDES: Record<string, string> = {
  'Account Groups': 'accountGroups',
  'API Keys': 'apiKeys',
  'Reddit Search': 'reddit',
};

// Preferred ordering for known resources. Auto-discovered resources appear after these.
const PREFERRED_ORDER = [
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
];

// Resources that should always appear last, in this order
const LAST_RESOURCES = [
  'invites',
];

interface ResourceMethod {
  name: string;
  fullPath: string;
  description: string;
}

/**
 * Convert a tag name to a camelCase resource key.
 * e.g. "Account Groups" → "accountGroups", "Messages" → "messages"
 */
function tagToResourceKey(tag: string): string {
  if (RESOURCE_KEY_OVERRIDES[tag]) return RESOURCE_KEY_OVERRIDES[tag];
  const words = tag.split(/\s+/);
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join('');
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

function extractMethodsFromSpec(spec: OpenAPISpec): {
  resources: Record<string, ResourceMethod[]>;
  resourceOrder: string[];
  displayNames: Record<string, string>;
} {
  const resources: Record<string, ResourceMethod[]> = {};
  const displayNames: Record<string, string> = {};
  const discoveredResources = new Set<string>();

  for (const [pathStr, pathItem] of Object.entries(spec.paths || {})) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) {
        continue;
      }

      const tags = operation.tags || [];
      if (tags.length === 0) continue;

      const tag = tags[0];
      if (SKIP_TAGS.has(tag)) continue;

      const operationId = operation.operationId || '';
      if (!operationId) continue;

      // Resolve the resource key: merged tags go to their parent, others auto-generate
      const resourceName = TAG_MERGE[tag] || tagToResourceKey(tag);
      discoveredResources.add(resourceName);

      // Track display name (non-merged tags only)
      if (!TAG_MERGE[tag]) {
        displayNames[resourceName] = DISPLAY_NAME_OVERRIDES[tag] || tag;
      }

      if (!resources[resourceName]) {
        resources[resourceName] = [];
      }

      const summary = operation.summary || '';
      const description = summary || operationId.replace(/([A-Z])/g, ' $1').trim();

      resources[resourceName].push({
        name: operationId,
        fullPath: `${resourceName}.${operationId}`,
        description,
      });
    }
  }

  // Build final order: preferred first, then auto-discovered, then last resources
  const preferredSet = new Set(PREFERRED_ORDER);
  const lastSet = new Set(LAST_RESOURCES);
  const autoDiscovered = [...discoveredResources]
    .filter((r) => !preferredSet.has(r) && !lastSet.has(r))
    .sort();

  const resourceOrder = [
    ...PREFERRED_ORDER.filter((r) => discoveredResources.has(r)),
    ...autoDiscovered,
    ...LAST_RESOURCES.filter((r) => discoveredResources.has(r)),
  ];

  // Sort methods within each resource
  for (const resourceName of resourceOrder) {
    if (resources[resourceName]) {
      resources[resourceName] = sortMethods(resources[resourceName]);
    }
  }

  return { resources, resourceOrder, displayNames };
}

function generateReferenceSection(
  resources: Record<string, ResourceMethod[]>,
  resourceOrder: string[],
  displayNames: Record<string, string>
): string {
  const lines: string[] = ['## SDK Reference', ''];

  for (const resourceName of resourceOrder) {
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
  const { resources, resourceOrder, displayNames } = extractMethodsFromSpec(spec);
  const referenceSection = generateReferenceSection(resources, resourceOrder, displayNames);

  if (process.argv.includes('--print')) {
    console.log(referenceSection);
  } else {
    updateReadme(readmePath, referenceSection);
  }
}

main();
