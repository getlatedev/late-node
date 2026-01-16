#!/usr/bin/env npx tsx
/**
 * Generate SDK Reference section for README.md from the client.ts file.
 *
 * This script parses the Late client class and generates markdown tables
 * documenting all available methods.
 */

import * as fs from 'fs';
import * as path from 'path';

// Method descriptions for documentation
const METHOD_DESCRIPTIONS: Record<string, string> = {
  // Posts
  'posts.listPosts': 'List all posts',
  'posts.createPost': 'Create and schedule a post',
  'posts.getPost': 'Get a specific post',
  'posts.updatePost': 'Update a scheduled post',
  'posts.deletePost': 'Delete a post',
  'posts.retryPost': 'Retry a failed post',
  'posts.bulkUploadPosts': 'Upload multiple posts at once',
  // Accounts
  'accounts.listAccounts': 'List connected social accounts',
  'accounts.updateAccount': 'Update account settings',
  'accounts.deleteAccount': 'Disconnect an account',
  'accounts.getFollowerStats': 'Get follower growth data',
  'accounts.getAllAccountsHealth': 'Check health of all accounts',
  'accounts.getAccountHealth': 'Check health of a specific account',
  'accounts.getGoogleBusinessReviews': 'Get Google Business reviews',
  'accounts.getLinkedInMentions': 'Get LinkedIn mentions',
  // Profiles
  'profiles.listProfiles': 'List workspace profiles',
  'profiles.createProfile': 'Create a new profile',
  'profiles.getProfile': 'Get a specific profile',
  'profiles.updateProfile': 'Update a profile',
  'profiles.deleteProfile': 'Delete a profile',
  // Analytics
  'analytics.getAnalytics': 'Get post performance metrics',
  'analytics.getYouTubeDailyViews': 'Get YouTube daily view breakdown',
  'analytics.getLinkedInAggregateAnalytics': 'Get LinkedIn organization analytics',
  'analytics.getLinkedInPostAnalytics': 'Get LinkedIn post-level analytics',
  // Account Groups
  'accountGroups.listAccountGroups': 'List account groups',
  'accountGroups.createAccountGroup': 'Create an account group',
  'accountGroups.updateAccountGroup': 'Update an account group',
  'accountGroups.deleteAccountGroup': 'Delete an account group',
  // Queue
  'queue.listQueueSlots': 'List queue time slots',
  'queue.createQueueSlot': 'Create a queue slot',
  'queue.updateQueueSlot': 'Update a queue slot',
  'queue.deleteQueueSlot': 'Delete a queue slot',
  'queue.previewQueue': 'Preview upcoming queued posts',
  'queue.getNextQueueSlot': 'Get next available slot',
  // Webhooks
  'webhooks.getWebhookSettings': 'Get webhook configuration',
  'webhooks.createWebhookSettings': 'Create webhook settings',
  'webhooks.updateWebhookSettings': 'Update webhook settings',
  'webhooks.deleteWebhookSettings': 'Delete webhook settings',
  'webhooks.testWebhook': 'Send a test webhook',
  'webhooks.getWebhookLogs': 'Get webhook delivery logs',
  // API Keys
  'apiKeys.listApiKeys': 'List API keys',
  'apiKeys.createApiKey': 'Create a new API key',
  'apiKeys.deleteApiKey': 'Delete an API key',
  // Media
  'media.getMediaPresignedUrl': 'Get presigned URL for file upload',
  // Tools
  'tools.downloadYouTubeVideo': 'Download YouTube video',
  'tools.getYouTubeTranscript': 'Get YouTube video transcript',
  'tools.downloadInstagramMedia': 'Download Instagram media',
  'tools.checkInstagramHashtags': 'Check if hashtags are banned',
  'tools.downloadTikTokVideo': 'Download TikTok video',
  'tools.downloadTwitterMedia': 'Download Twitter/X media',
  'tools.downloadFacebookVideo': 'Download Facebook video',
  'tools.downloadLinkedInVideo': 'Download LinkedIn video',
  'tools.downloadBlueskyMedia': 'Download Bluesky media',
  // Users
  'users.listUsers': 'List team users',
  'users.getUser': 'Get a specific user',
  // Usage
  'usage.getUsageStats': 'Get API usage statistics',
  // Logs
  'logs.listLogs': 'List publishing logs',
  'logs.getLog': 'Get a specific log entry',
  'logs.getPostLogs': 'Get logs for a specific post',
  // Connect
  'connect.getConnectUrl': 'Get OAuth URL for a platform',
  'connect.handleOAuthCallback': 'Handle OAuth callback',
  'connect.updateFacebookPage': 'Update Facebook page settings',
  'connect.getLinkedInOrganizations': 'Get LinkedIn organizations',
  'connect.updateLinkedInOrganization': 'Update LinkedIn organization',
  'connect.getPinterestBoards': 'Get Pinterest boards',
  'connect.updatePinterestBoards': 'Update Pinterest boards',
  'connect.getRedditSubreddits': 'Get Reddit subreddits',
  'connect.updateRedditSubreddits': 'Update Reddit subreddits',
  'connect.facebook.listFacebookPages': 'List Facebook pages to connect',
  'connect.facebook.selectFacebookPage': 'Select a Facebook page',
  'connect.googleBusiness.listGoogleBusinessLocations': 'List Google Business locations',
  'connect.googleBusiness.selectGoogleBusinessLocation': 'Select a location',
  'connect.linkedin.listLinkedInOrganizations': 'List LinkedIn organizations',
  'connect.linkedin.selectLinkedInOrganization': 'Select an organization',
  'connect.pinterest.listPinterestBoardsForSelection': 'List Pinterest boards',
  'connect.pinterest.selectPinterestBoard': 'Select a board',
  'connect.snapchat.listSnapchatProfiles': 'List Snapchat profiles',
  'connect.snapchat.selectSnapchatProfile': 'Select a profile',
  'connect.bluesky.connectBlueskyCredentials': 'Connect with Bluesky credentials',
  'connect.telegram.getTelegramConnectStatus': 'Get Telegram connection status',
  'connect.telegram.initiateTelegramConnect': 'Start Telegram connection',
  'connect.telegram.completeTelegramConnect': 'Complete Telegram connection',
  // Reddit
  'reddit.searchReddit': 'Search Reddit',
  'reddit.getRedditFeed': 'Get Reddit feed',
  // Invites
  'invites.createInviteToken': 'Create an invite token',
  'invites.listPlatformInvites': 'List platform invites',
  'invites.createPlatformInvite': 'Create a platform invite',
  'invites.deletePlatformInvite': 'Delete a platform invite',
};

// Resource display names
const RESOURCE_DISPLAY_NAMES: Record<string, string> = {
  posts: 'Posts',
  accounts: 'Accounts',
  profiles: 'Profiles',
  analytics: 'Analytics',
  accountGroups: 'Account Groups',
  queue: 'Queue',
  webhooks: 'Webhooks',
  apiKeys: 'API Keys',
  media: 'Media',
  tools: 'Tools',
  users: 'Users',
  usage: 'Usage',
  logs: 'Logs',
  connect: 'Connect (OAuth)',
  reddit: 'Reddit',
  invites: 'Invites',
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
  'invites',
];

interface ResourceMethod {
  name: string;
  fullPath: string;
}

interface Resource {
  name: string;
  displayName: string;
  methods: ResourceMethod[];
  nested?: Record<string, ResourceMethod[]>;
}

/**
 * Generate a sort key for consistent method ordering.
 *
 * Ordering rules (CRUD-style):
 * 1. list/getAll methods first
 * 2. create methods
 * 3. get (single) methods
 * 4. update methods
 * 5. delete methods
 * 6. Everything else alphabetically
 *
 * This ensures consistent output regardless of how methods are discovered.
 */
function getMethodSortKey(methodName: string): [number, string] {
  const nameLower = methodName.toLowerCase();

  if (nameLower.startsWith('list') || nameLower.startsWith('getall')) {
    return [0, methodName];
  } else if (nameLower.startsWith('create') || nameLower === 'bulkuploadposts') {
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

function parseClientFile(clientPath: string): Resource[] {
  const content = fs.readFileSync(clientPath, 'utf-8');
  const resources: Resource[] = [];

  // Parse resource blocks using regex
  // Match patterns like: posts = { ... };
  const resourceRegex = /(\w+)\s*=\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\};/g;

  let match;
  while ((match = resourceRegex.exec(content)) !== null) {
    const resourceName = match[1];
    const resourceBody = match[2];

    if (!RESOURCE_ORDER.includes(resourceName)) {
      continue;
    }

    const resource: Resource = {
      name: resourceName,
      displayName: RESOURCE_DISPLAY_NAMES[resourceName] || resourceName,
      methods: [],
      nested: {},
    };

    // Parse top-level methods: methodName: methodName,
    const methodRegex = /^\s*(\w+):\s*\w+,?\s*$/gm;
    let methodMatch;
    while ((methodMatch = methodRegex.exec(resourceBody)) !== null) {
      const methodName = methodMatch[1];
      resource.methods.push({
        name: methodName,
        fullPath: `${resourceName}.${methodName}`,
      });
    }

    // Parse nested resources: nestedName: { ... },
    const nestedRegex = /(\w+):\s*\{([^}]+)\}/g;
    let nestedMatch;
    while ((nestedMatch = nestedRegex.exec(resourceBody)) !== null) {
      const nestedName = nestedMatch[1];
      const nestedBody = nestedMatch[2];

      // Skip if it's a top-level method assignment
      if (nestedBody.includes(':')) {
        const nestedMethods: ResourceMethod[] = [];
        const nestedMethodRegex = /(\w+):\s*\w+/g;
        let nestedMethodMatch;
        while ((nestedMethodMatch = nestedMethodRegex.exec(nestedBody)) !== null) {
          const methodName = nestedMethodMatch[1];
          nestedMethods.push({
            name: methodName,
            fullPath: `${resourceName}.${nestedName}.${methodName}`,
          });
        }
        if (nestedMethods.length > 0) {
          resource.nested![nestedName] = nestedMethods;
        }
      }
    }

    resources.push(resource);
  }

  // Sort resources by the defined order
  resources.sort((a, b) => {
    return RESOURCE_ORDER.indexOf(a.name) - RESOURCE_ORDER.indexOf(b.name);
  });

  return resources;
}

function generateDescription(fullPath: string): string {
  if (METHOD_DESCRIPTIONS[fullPath]) {
    return METHOD_DESCRIPTIONS[fullPath];
  }

  // Auto-generate from method name
  const parts = fullPath.split('.');
  const methodName = parts[parts.length - 1];
  return methodName
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}

function generateReferenceSection(resources: Resource[]): string {
  const lines: string[] = ['## SDK Reference', ''];

  for (const resource of resources) {
    lines.push(`### ${resource.displayName}`);
    lines.push('| Method | Description |');
    lines.push('|--------|-------------|');

    // Top-level methods (sorted with CRUD ordering)
    const sortedMethods = sortMethods(resource.methods);
    for (const method of sortedMethods) {
      const desc = generateDescription(method.fullPath);
      lines.push(`| \`${method.fullPath}()\` | ${desc} |`);
    }

    // Nested methods (sorted with CRUD ordering)
    if (resource.nested) {
      for (const [nestedName, nestedMethods] of Object.entries(resource.nested)) {
        const sortedNestedMethods = sortMethods(nestedMethods);
        for (const method of sortedNestedMethods) {
          const desc = generateDescription(method.fullPath);
          lines.push(`| \`${method.fullPath}()\` | ${desc} |`);
        }
      }
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
  const clientPath = path.join(scriptDir, '..', 'src', 'client.ts');
  const readmePath = path.join(scriptDir, '..', 'README.md');

  const resources = parseClientFile(clientPath);

  if (process.argv.includes('--print')) {
    console.log(generateReferenceSection(resources));
  } else {
    const referenceSection = generateReferenceSection(resources);
    updateReadme(readmePath, referenceSection);
  }
}

main();
