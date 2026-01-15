import {
  client,
  // Posts
  listPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  retryPost,
  bulkUploadPosts,
  getPostLogs,
  // Accounts
  listAccounts,
  updateAccount,
  deleteAccount,
  getFollowerStats,
  getAllAccountsHealth,
  getAccountHealth,
  // Profiles
  listProfiles,
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  // Analytics
  getAnalytics,
  getYouTubeDailyViews,
  getLinkedInAggregateAnalytics,
  getLinkedInPostAnalytics,
  // Account Groups
  listAccountGroups,
  createAccountGroup,
  updateAccountGroup,
  deleteAccountGroup,
  // Queue
  listQueueSlots,
  createQueueSlot,
  updateQueueSlot,
  deleteQueueSlot,
  previewQueue,
  getNextQueueSlot,
  // Webhooks
  getWebhookSettings,
  createWebhookSettings,
  updateWebhookSettings,
  deleteWebhookSettings,
  testWebhook,
  getWebhookLogs,
  // API Keys
  listApiKeys,
  createApiKey,
  deleteApiKey,
  // Media
  getMediaPresignedUrl,
  // Tools
  downloadYouTubeVideo,
  getYouTubeTranscript,
  downloadInstagramMedia,
  checkInstagramHashtags,
  downloadTikTokVideo,
  downloadTwitterMedia,
  downloadFacebookVideo,
  downloadLinkedInVideo,
  downloadBlueskyMedia,
  // Users
  listUsers,
  getUser,
  // Usage
  getUsageStats,
  // Logs
  listLogs,
  getLog,
  // Connect
  getConnectUrl,
  handleOAuthCallback,
  listFacebookPages,
  selectFacebookPage,
  listGoogleBusinessLocations,
  selectGoogleBusinessLocation,
  listLinkedInOrganizations,
  selectLinkedInOrganization,
  listPinterestBoardsForSelection,
  selectPinterestBoard,
  listSnapchatProfiles,
  selectSnapchatProfile,
  connectBlueskyCredentials,
  getTelegramConnectStatus,
  initiateTelegramConnect,
  completeTelegramConnect,
  // Reddit
  searchReddit,
  getRedditFeed,
  // Invites
  createInviteToken,
  listPlatformInvites,
  createPlatformInvite,
  deletePlatformInvite,
  // Account-specific endpoints
  updateFacebookPage,
  getLinkedInOrganizations,
  updateLinkedInOrganization,
  getLinkedInMentions,
  getPinterestBoards,
  updatePinterestBoards,
  getRedditSubreddits,
  updateRedditSubreddits,
  getGoogleBusinessReviews,
} from './generated/sdk.gen';

import { LateApiError, parseApiError } from './errors';

export interface ClientOptions {
  /**
   * API key for authentication. Defaults to process.env['LATE_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API.
   * @default "https://getlate.dev/api"
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response.
   * @default 60000
   */
  timeout?: number;

  /**
   * Default headers to include with every request.
   */
  defaultHeaders?: Record<string, string>;
}

/**
 * API Client for the Late API.
 *
 * @example
 * ```typescript
 * import Late from 'late';
 *
 * const late = new Late({
 *   apiKey: process.env['LATE_API_KEY'], // This is the default and can be omitted
 * });
 *
 * async function main() {
 *   const post = await late.posts.create({
 *     body: {
 *       content: 'Hello from the Late SDK!',
 *       platforms: [{ platform: 'twitter', accountId: 'acc_123' }],
 *       publishNow: true,
 *     },
 *   });
 *   console.log(post.data);
 * }
 *
 * main();
 * ```
 */
export class Late {
  private _options: ClientOptions;

  /**
   * API key used for authentication.
   */
  apiKey: string;

  /**
   * Base URL for API requests.
   */
  baseURL: string;

  /**
   * Posts API - Create, schedule, and manage social media posts
   */
  posts = {
    list: listPosts,
    create: createPost,
    get: getPost,
    update: updatePost,
    delete: deletePost,
    retry: retryPost,
    bulkUpload: bulkUploadPosts,
    getLogs: getPostLogs,
  };

  /**
   * Accounts API - Manage connected social media accounts
   */
  accounts = {
    list: listAccounts,
    update: updateAccount,
    delete: deleteAccount,
    getFollowerStats: getFollowerStats,
    getAllHealth: getAllAccountsHealth,
    getHealth: getAccountHealth,
    updateFacebookPage: updateFacebookPage,
    getLinkedInOrganizations: getLinkedInOrganizations,
    updateLinkedInOrganization: updateLinkedInOrganization,
    getLinkedInMentions: getLinkedInMentions,
    getPinterestBoards: getPinterestBoards,
    updatePinterestBoards: updatePinterestBoards,
    getRedditSubreddits: getRedditSubreddits,
    updateRedditSubreddits: updateRedditSubreddits,
    getGoogleBusinessReviews: getGoogleBusinessReviews,
  };

  /**
   * Profiles API - Manage workspace profiles
   */
  profiles = {
    list: listProfiles,
    create: createProfile,
    get: getProfile,
    update: updateProfile,
    delete: deleteProfile,
  };

  /**
   * Analytics API - Get performance metrics
   */
  analytics = {
    get: getAnalytics,
    getYouTubeDailyViews: getYouTubeDailyViews,
    getLinkedInAggregate: getLinkedInAggregateAnalytics,
    getLinkedInPostAnalytics: getLinkedInPostAnalytics,
  };

  /**
   * Account Groups API - Organize accounts into groups
   */
  accountGroups = {
    list: listAccountGroups,
    create: createAccountGroup,
    update: updateAccountGroup,
    delete: deleteAccountGroup,
  };

  /**
   * Queue API - Manage posting queue
   */
  queue = {
    listSlots: listQueueSlots,
    createSlot: createQueueSlot,
    updateSlot: updateQueueSlot,
    deleteSlot: deleteQueueSlot,
    preview: previewQueue,
    getNextSlot: getNextQueueSlot,
  };

  /**
   * Webhooks API - Configure event webhooks
   */
  webhooks = {
    getSettings: getWebhookSettings,
    createSettings: createWebhookSettings,
    updateSettings: updateWebhookSettings,
    deleteSettings: deleteWebhookSettings,
    test: testWebhook,
    getLogs: getWebhookLogs,
  };

  /**
   * API Keys API - Manage API keys
   */
  apiKeys = {
    list: listApiKeys,
    create: createApiKey,
    delete: deleteApiKey,
  };

  /**
   * Media API - Upload and manage media files
   */
  media = {
    getPresignedUrl: getMediaPresignedUrl,
  };

  /**
   * Tools API - Media download and utilities
   */
  tools = {
    downloadYouTube: downloadYouTubeVideo,
    getYouTubeTranscript: getYouTubeTranscript,
    downloadInstagram: downloadInstagramMedia,
    checkInstagramHashtags: checkInstagramHashtags,
    downloadTikTok: downloadTikTokVideo,
    downloadTwitter: downloadTwitterMedia,
    downloadFacebook: downloadFacebookVideo,
    downloadLinkedIn: downloadLinkedInVideo,
    downloadBluesky: downloadBlueskyMedia,
  };

  /**
   * Users API - User management
   */
  users = {
    list: listUsers,
    get: getUser,
  };

  /**
   * Usage API - Get usage statistics
   */
  usage = {
    getStats: getUsageStats,
  };

  /**
   * Logs API - Publishing logs
   */
  logs = {
    list: listLogs,
    get: getLog,
  };

  /**
   * Connect API - OAuth connection flows
   */
  connect = {
    getUrl: getConnectUrl,
    handleCallback: handleOAuthCallback,
    facebook: {
      listPages: listFacebookPages,
      selectPage: selectFacebookPage,
    },
    googleBusiness: {
      listLocations: listGoogleBusinessLocations,
      selectLocation: selectGoogleBusinessLocation,
    },
    linkedIn: {
      listOrganizations: listLinkedInOrganizations,
      selectOrganization: selectLinkedInOrganization,
    },
    pinterest: {
      listBoards: listPinterestBoardsForSelection,
      selectBoard: selectPinterestBoard,
    },
    snapchat: {
      listProfiles: listSnapchatProfiles,
      selectProfile: selectSnapchatProfile,
    },
    bluesky: {
      connectCredentials: connectBlueskyCredentials,
    },
    telegram: {
      getStatus: getTelegramConnectStatus,
      initiate: initiateTelegramConnect,
      complete: completeTelegramConnect,
    },
  };

  /**
   * Reddit API - Search and feed
   */
  reddit = {
    search: searchReddit,
    getFeed: getRedditFeed,
  };

  /**
   * Invites API - Team invitations
   */
  invites = {
    createToken: createInviteToken,
    list: listPlatformInvites,
    create: createPlatformInvite,
    delete: deletePlatformInvite,
  };

  /**
   * Create a new Late API client.
   *
   * @param options - Configuration options for the client
   */
  constructor(options: ClientOptions = {}) {
    const apiKey = options.apiKey ?? process.env['LATE_API_KEY'];

    if (!apiKey) {
      throw new LateApiError(
        "The LATE_API_KEY environment variable is missing or empty; either provide it, or instantiate the Late client with an apiKey option, like new Late({ apiKey: 'sk_...' }).",
        401,
        'missing_api_key'
      );
    }

    this.apiKey = apiKey;
    this.baseURL = options.baseURL ?? 'https://getlate.dev/api';
    this._options = options;

    // Configure the generated client
    client.setConfig({
      baseUrl: this.baseURL,
    });

    // Add auth interceptor
    client.interceptors.request.use((request) => {
      request.headers.set('Authorization', `Bearer ${this.apiKey}`);
      if (options.defaultHeaders) {
        for (const [key, value] of Object.entries(options.defaultHeaders)) {
          request.headers.set(key, value);
        }
      }
      return request;
    });

    // Add error handling interceptor
    client.interceptors.response.use(async (response) => {
      if (!response.ok) {
        let body: Record<string, unknown> | undefined;
        try {
          body = (await response.clone().json()) as Record<string, unknown>;
        } catch {
          // Ignore JSON parse errors
        }
        throw parseApiError(response, body);
      }
      return response;
    });
  }
}

// Default export for convenient usage
export default Late;
