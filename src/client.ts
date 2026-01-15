import {
  client,
  // Posts
  getV1Posts,
  postV1Posts,
  getV1PostsByPostId,
  putV1PostsByPostId,
  deleteV1PostsByPostId,
  postV1PostsByPostIdRetry,
  postV1PostsBulkUpload,
  getV1PostsByPostIdLogs,
  // Accounts
  getV1Accounts,
  putV1AccountsByAccountId,
  deleteV1AccountsByAccountId,
  getV1AccountsFollowerStats,
  getV1AccountsHealth,
  getV1AccountsByAccountIdHealth,
  // Profiles
  getV1Profiles,
  postV1Profiles,
  getV1ProfilesByProfileId,
  putV1ProfilesByProfileId,
  deleteV1ProfilesByProfileId,
  // Analytics
  getV1Analytics,
  getV1AnalyticsYoutubeDailyViews,
  getV1AccountsByAccountIdLinkedinAggregateAnalytics,
  getV1AccountsByAccountIdLinkedinPostAnalytics,
  // Account Groups
  getV1AccountGroups,
  postV1AccountGroups,
  putV1AccountGroupsByGroupId,
  deleteV1AccountGroupsByGroupId,
  // Queue
  getV1QueueSlots,
  postV1QueueSlots,
  putV1QueueSlots,
  deleteV1QueueSlots,
  getV1QueuePreview,
  getV1QueueNextSlot,
  // Webhooks
  getV1WebhooksSettings,
  postV1WebhooksSettings,
  putV1WebhooksSettings,
  deleteV1WebhooksSettings,
  postV1WebhooksTest,
  getV1WebhooksLogs,
  // API Keys
  getV1ApiKeys,
  postV1ApiKeys,
  deleteV1ApiKeysByKeyId,
  // Media
  postV1MediaPresign,
  // Tools
  getV1ToolsYoutubeDownload,
  getV1ToolsYoutubeTranscript,
  getV1ToolsInstagramDownload,
  postV1ToolsInstagramHashtagChecker,
  getV1ToolsTiktokDownload,
  getV1ToolsTwitterDownload,
  getV1ToolsFacebookDownload,
  getV1ToolsLinkedinDownload,
  getV1ToolsBlueskyDownload,
  // Users
  getV1Users,
  getV1UsersByUserId,
  // Usage
  getV1UsageStats,
  // Logs
  getV1Logs,
  getV1LogsByLogId,
  // Connect
  getV1ConnectByPlatform,
  postV1ConnectByPlatform,
  getV1ConnectFacebookSelectPage,
  postV1ConnectFacebookSelectPage,
  getV1ConnectGooglebusinessLocations,
  postV1ConnectGooglebusinessSelectLocation,
  getV1ConnectLinkedinOrganizations,
  postV1ConnectLinkedinSelectOrganization,
  getV1ConnectPinterestSelectBoard,
  postV1ConnectPinterestSelectBoard,
  getV1ConnectSnapchatSelectProfile,
  postV1ConnectSnapchatSelectProfile,
  postV1ConnectBlueskyCredentials,
  getV1ConnectTelegram,
  postV1ConnectTelegram,
  patchV1ConnectTelegram,
  // Reddit
  getV1RedditSearch,
  getV1RedditFeed,
  // Invites
  postV1InviteTokens,
  getV1PlatformInvites,
  postV1PlatformInvites,
  deleteV1PlatformInvites,
  // Account-specific endpoints
  putV1AccountsByAccountIdFacebookPage,
  getV1AccountsByAccountIdLinkedinOrganizations,
  putV1AccountsByAccountIdLinkedinOrganization,
  getV1AccountsByAccountIdLinkedinMentions,
  getV1AccountsByAccountIdPinterestBoards,
  putV1AccountsByAccountIdPinterestBoards,
  getV1AccountsByAccountIdRedditSubreddits,
  putV1AccountsByAccountIdRedditSubreddits,
  getV1AccountsByAccountIdGmbReviews,
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
 * import Late from '@getlatedev/node';
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
    list: getV1Posts,
    create: postV1Posts,
    get: getV1PostsByPostId,
    update: putV1PostsByPostId,
    delete: deleteV1PostsByPostId,
    retry: postV1PostsByPostIdRetry,
    bulkUpload: postV1PostsBulkUpload,
    getLogs: getV1PostsByPostIdLogs,
  };

  /**
   * Accounts API - Manage connected social media accounts
   */
  accounts = {
    list: getV1Accounts,
    update: putV1AccountsByAccountId,
    delete: deleteV1AccountsByAccountId,
    getFollowerStats: getV1AccountsFollowerStats,
    getAllHealth: getV1AccountsHealth,
    getHealth: getV1AccountsByAccountIdHealth,
    updateFacebookPage: putV1AccountsByAccountIdFacebookPage,
    getLinkedInOrganizations: getV1AccountsByAccountIdLinkedinOrganizations,
    updateLinkedInOrganization: putV1AccountsByAccountIdLinkedinOrganization,
    getLinkedInMentions: getV1AccountsByAccountIdLinkedinMentions,
    getPinterestBoards: getV1AccountsByAccountIdPinterestBoards,
    updatePinterestBoards: putV1AccountsByAccountIdPinterestBoards,
    getRedditSubreddits: getV1AccountsByAccountIdRedditSubreddits,
    updateRedditSubreddits: putV1AccountsByAccountIdRedditSubreddits,
    getGoogleBusinessReviews: getV1AccountsByAccountIdGmbReviews,
  };

  /**
   * Profiles API - Manage workspace profiles
   */
  profiles = {
    list: getV1Profiles,
    create: postV1Profiles,
    get: getV1ProfilesByProfileId,
    update: putV1ProfilesByProfileId,
    delete: deleteV1ProfilesByProfileId,
  };

  /**
   * Analytics API - Get performance metrics
   */
  analytics = {
    get: getV1Analytics,
    getYouTubeDailyViews: getV1AnalyticsYoutubeDailyViews,
    getLinkedInAggregate: getV1AccountsByAccountIdLinkedinAggregateAnalytics,
    getLinkedInPostAnalytics: getV1AccountsByAccountIdLinkedinPostAnalytics,
  };

  /**
   * Account Groups API - Organize accounts into groups
   */
  accountGroups = {
    list: getV1AccountGroups,
    create: postV1AccountGroups,
    update: putV1AccountGroupsByGroupId,
    delete: deleteV1AccountGroupsByGroupId,
  };

  /**
   * Queue API - Manage posting queue
   */
  queue = {
    listSlots: getV1QueueSlots,
    createSlot: postV1QueueSlots,
    updateSlot: putV1QueueSlots,
    deleteSlot: deleteV1QueueSlots,
    preview: getV1QueuePreview,
    getNextSlot: getV1QueueNextSlot,
  };

  /**
   * Webhooks API - Configure event webhooks
   */
  webhooks = {
    getSettings: getV1WebhooksSettings,
    createSettings: postV1WebhooksSettings,
    updateSettings: putV1WebhooksSettings,
    deleteSettings: deleteV1WebhooksSettings,
    test: postV1WebhooksTest,
    getLogs: getV1WebhooksLogs,
  };

  /**
   * API Keys API - Manage API keys
   */
  apiKeys = {
    list: getV1ApiKeys,
    create: postV1ApiKeys,
    delete: deleteV1ApiKeysByKeyId,
  };

  /**
   * Media API - Upload and manage media files
   */
  media = {
    getPresignedUrl: postV1MediaPresign,
  };

  /**
   * Tools API - Media download and utilities
   */
  tools = {
    downloadYouTube: getV1ToolsYoutubeDownload,
    getYouTubeTranscript: getV1ToolsYoutubeTranscript,
    downloadInstagram: getV1ToolsInstagramDownload,
    checkInstagramHashtags: postV1ToolsInstagramHashtagChecker,
    downloadTikTok: getV1ToolsTiktokDownload,
    downloadTwitter: getV1ToolsTwitterDownload,
    downloadFacebook: getV1ToolsFacebookDownload,
    downloadLinkedIn: getV1ToolsLinkedinDownload,
    downloadBluesky: getV1ToolsBlueskyDownload,
  };

  /**
   * Users API - User management
   */
  users = {
    list: getV1Users,
    get: getV1UsersByUserId,
  };

  /**
   * Usage API - Get usage statistics
   */
  usage = {
    getStats: getV1UsageStats,
  };

  /**
   * Logs API - Publishing logs
   */
  logs = {
    list: getV1Logs,
    get: getV1LogsByLogId,
  };

  /**
   * Connect API - OAuth connection flows
   */
  connect = {
    getUrl: getV1ConnectByPlatform,
    handleCallback: postV1ConnectByPlatform,
    facebook: {
      listPages: getV1ConnectFacebookSelectPage,
      selectPage: postV1ConnectFacebookSelectPage,
    },
    googleBusiness: {
      listLocations: getV1ConnectGooglebusinessLocations,
      selectLocation: postV1ConnectGooglebusinessSelectLocation,
    },
    linkedIn: {
      listOrganizations: getV1ConnectLinkedinOrganizations,
      selectOrganization: postV1ConnectLinkedinSelectOrganization,
    },
    pinterest: {
      listBoards: getV1ConnectPinterestSelectBoard,
      selectBoard: postV1ConnectPinterestSelectBoard,
    },
    snapchat: {
      listProfiles: getV1ConnectSnapchatSelectProfile,
      selectProfile: postV1ConnectSnapchatSelectProfile,
    },
    bluesky: {
      connectCredentials: postV1ConnectBlueskyCredentials,
    },
    telegram: {
      getStatus: getV1ConnectTelegram,
      initiate: postV1ConnectTelegram,
      complete: patchV1ConnectTelegram,
    },
  };

  /**
   * Reddit API - Search and feed
   */
  reddit = {
    search: getV1RedditSearch,
    getFeed: getV1RedditFeed,
  };

  /**
   * Invites API - Team invitations
   */
  invites = {
    createToken: postV1InviteTokens,
    list: getV1PlatformInvites,
    create: postV1PlatformInvites,
    delete: deleteV1PlatformInvites,
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
