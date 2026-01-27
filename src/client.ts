import {
  client,
  bulkUploadPosts,
  checkInstagramHashtags,
  completeTelegramConnect,
  connectBlueskyCredentials,
  createAccountGroup,
  createApiKey,
  createInviteToken,
  createPost,
  createProfile,
  createQueueSlot,
  createWebhookSettings,
  deleteAccount,
  deleteAccountGroup,
  deleteApiKey,
  deleteInboxComment,
  deleteInboxReviewReply,
  deletePost,
  deleteProfile,
  deleteQueueSlot,
  deleteWebhookSettings,
  downloadBlueskyMedia,
  downloadFacebookVideo,
  downloadInstagramMedia,
  downloadLinkedInVideo,
  downloadTikTokVideo,
  downloadTwitterMedia,
  downloadYouTubeVideo,
  getAccountHealth,
  getAllAccountsHealth,
  getAnalytics,
  getConnectUrl,
  getFacebookPages,
  getFollowerStats,
  getGmbLocations,
  getGoogleBusinessReviews,
  getInboxConversation,
  getInboxConversationMessages,
  getInboxPostComments,
  getLinkedInAggregateAnalytics,
  getLinkedInMentions,
  getLinkedInOrganizations,
  getLinkedInPostAnalytics,
  getLog,
  getMediaPresignedUrl,
  getNextQueueSlot,
  getPendingOAuthData,
  getPinterestBoards,
  getPost,
  getPostLogs,
  getProfile,
  getRedditFeed,
  getRedditSubreddits,
  getTelegramConnectStatus,
  getUsageStats,
  getUser,
  getWebhookLogs,
  getWebhookSettings,
  getYouTubeDailyViews,
  getYouTubeTranscript,
  handleOAuthCallback,
  hideInboxComment,
  initiateTelegramConnect,
  likeInboxComment,
  listAccountGroups,
  listAccounts,
  listApiKeys,
  listFacebookPages,
  listGoogleBusinessLocations,
  listInboxComments,
  listInboxConversations,
  listInboxReviews,
  listLinkedInOrganizations,
  listLogs,
  listPinterestBoardsForSelection,
  listPosts,
  listProfiles,
  listQueueSlots,
  listSnapchatProfiles,
  listUsers,
  previewQueue,
  replyToInboxPost,
  replyToInboxReview,
  retryPost,
  searchReddit,
  selectFacebookPage,
  selectGoogleBusinessLocation,
  selectLinkedInOrganization,
  selectPinterestBoard,
  selectSnapchatProfile,
  sendInboxMessage,
  testWebhook,
  unhideInboxComment,
  unlikeInboxComment,
  updateAccount,
  updateAccountGroup,
  updateFacebookPage,
  updateGmbLocation,
  updateInboxConversation,
  updateLinkedInOrganization,
  updatePinterestBoards,
  updatePost,
  updateProfile,
  updateQueueSlot,
  updateRedditSubreddits,
  updateWebhookSettings,
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
   * Tools API - Media download and utilities
   */
  tools = {
    downloadYouTubeVideo: downloadYouTubeVideo,
    getYouTubeTranscript: getYouTubeTranscript,
    downloadInstagramMedia: downloadInstagramMedia,
    checkInstagramHashtags: checkInstagramHashtags,
    downloadTikTokVideo: downloadTikTokVideo,
    downloadTwitterMedia: downloadTwitterMedia,
    downloadFacebookVideo: downloadFacebookVideo,
    downloadLinkedInVideo: downloadLinkedInVideo,
    downloadBlueskyMedia: downloadBlueskyMedia,
  };

  /**
   * Analytics API - Get performance metrics
   */
  analytics = {
    getAnalytics: getAnalytics,
    getYouTubeDailyViews: getYouTubeDailyViews,
    getLinkedInAggregateAnalytics: getLinkedInAggregateAnalytics,
    getLinkedInPostAnalytics: getLinkedInPostAnalytics,
  };

  /**
   * Account Groups API - Organize accounts into groups
   */
  accountGroups = {
    listAccountGroups: listAccountGroups,
    createAccountGroup: createAccountGroup,
    updateAccountGroup: updateAccountGroup,
    deleteAccountGroup: deleteAccountGroup,
  };

  /**
   * Media API - Upload and manage media files
   */
  media = {
    getMediaPresignedUrl: getMediaPresignedUrl,
  };

  /**
   * Reddit API - Search and feed
   */
  reddit = {
    searchReddit: searchReddit,
    getRedditFeed: getRedditFeed,
  };

  /**
   * Usage API - Get usage statistics
   */
  usage = {
    getUsageStats: getUsageStats,
  };

  /**
   * Posts API - Create, schedule, and manage social media posts
   */
  posts = {
    listPosts: listPosts,
    createPost: createPost,
    getPost: getPost,
    updatePost: updatePost,
    deletePost: deletePost,
    bulkUploadPosts: bulkUploadPosts,
    retryPost: retryPost,
  };

  /**
   * Users API - User management
   */
  users = {
    listUsers: listUsers,
    getUser: getUser,
  };

  /**
   * Profiles API - Manage workspace profiles
   */
  profiles = {
    listProfiles: listProfiles,
    createProfile: createProfile,
    getProfile: getProfile,
    updateProfile: updateProfile,
    deleteProfile: deleteProfile,
  };

  /**
   * Accounts API - Manage connected social media accounts
   */
  accounts = {
    listAccounts: listAccounts,
    getFollowerStats: getFollowerStats,
    updateAccount: updateAccount,
    deleteAccount: deleteAccount,
    getAllAccountsHealth: getAllAccountsHealth,
    getAccountHealth: getAccountHealth,
    getGoogleBusinessReviews: getGoogleBusinessReviews,
    getLinkedInMentions: getLinkedInMentions,
  };

  /**
   * API Keys API - Manage API keys
   */
  apiKeys = {
    listApiKeys: listApiKeys,
    createApiKey: createApiKey,
    deleteApiKey: deleteApiKey,
  };

  /**
   * Invites API - Team invitations
   */
  invites = {
    createInviteToken: createInviteToken,
  };

  /**
   * Connect API - OAuth connection flows
   */
  connect = {
    getConnectUrl: getConnectUrl,
    handleOAuthCallback: handleOAuthCallback,
    getPendingOAuthData: getPendingOAuthData,
    getFacebookPages: getFacebookPages,
    updateFacebookPage: updateFacebookPage,
    getLinkedInOrganizations: getLinkedInOrganizations,
    updateLinkedInOrganization: updateLinkedInOrganization,
    getPinterestBoards: getPinterestBoards,
    updatePinterestBoards: updatePinterestBoards,
    getGmbLocations: getGmbLocations,
    updateGmbLocation: updateGmbLocation,
    getRedditSubreddits: getRedditSubreddits,
    updateRedditSubreddits: updateRedditSubreddits,
    facebook: {
      listFacebookPages: listFacebookPages,
      selectFacebookPage: selectFacebookPage,
    },
    googleBusiness: {
      listGoogleBusinessLocations: listGoogleBusinessLocations,
      selectGoogleBusinessLocation: selectGoogleBusinessLocation,
    },
    linkedin: {
      listLinkedInOrganizations: listLinkedInOrganizations,
      selectLinkedInOrganization: selectLinkedInOrganization,
    },
    pinterest: {
      listPinterestBoardsForSelection: listPinterestBoardsForSelection,
      selectPinterestBoard: selectPinterestBoard,
    },
    snapchat: {
      listSnapchatProfiles: listSnapchatProfiles,
      selectSnapchatProfile: selectSnapchatProfile,
    },
    bluesky: {
      connectBlueskyCredentials: connectBlueskyCredentials,
    },
    telegram: {
      getTelegramConnectStatus: getTelegramConnectStatus,
      initiateTelegramConnect: initiateTelegramConnect,
      completeTelegramConnect: completeTelegramConnect,
    },
  };

  /**
   * Queue API - Manage posting queue
   */
  queue = {
    listQueueSlots: listQueueSlots,
    createQueueSlot: createQueueSlot,
    updateQueueSlot: updateQueueSlot,
    deleteQueueSlot: deleteQueueSlot,
    previewQueue: previewQueue,
    getNextQueueSlot: getNextQueueSlot,
  };

  /**
   * Webhooks API - Configure event webhooks
   */
  webhooks = {
    getWebhookSettings: getWebhookSettings,
    createWebhookSettings: createWebhookSettings,
    updateWebhookSettings: updateWebhookSettings,
    deleteWebhookSettings: deleteWebhookSettings,
    testWebhook: testWebhook,
    getWebhookLogs: getWebhookLogs,
  };

  /**
   * Logs API - Publishing logs
   */
  logs = {
    listLogs: listLogs,
    getLog: getLog,
    getPostLogs: getPostLogs,
  };

  /**
   * messages API
   */
  messages = {
    listInboxConversations: listInboxConversations,
    getInboxConversation: getInboxConversation,
    updateInboxConversation: updateInboxConversation,
    getInboxConversationMessages: getInboxConversationMessages,
    sendInboxMessage: sendInboxMessage,
  };

  /**
   * comments API
   */
  comments = {
    listInboxComments: listInboxComments,
    getInboxPostComments: getInboxPostComments,
    replyToInboxPost: replyToInboxPost,
    deleteInboxComment: deleteInboxComment,
    hideInboxComment: hideInboxComment,
    unhideInboxComment: unhideInboxComment,
    likeInboxComment: likeInboxComment,
    unlikeInboxComment: unlikeInboxComment,
  };

  /**
   * reviews API
   */
  reviews = {
    listInboxReviews: listInboxReviews,
    replyToInboxReview: replyToInboxReview,
    deleteInboxReviewReply: deleteInboxReviewReply,
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
