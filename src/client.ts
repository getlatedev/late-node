import packageJson from '../package.json';
import { createClient, createConfig, type Client } from '@hey-api/client-fetch';
import {
  activateSequence,
  activateWorkflow,
  addAccountCallouts,
  addAdKeywords,
  addBroadcastRecipients,
  addBusinessAgentAllowlistEntry,
  addBusinessAgentWebsite,
  addConversionAssociations,
  addDiscordMemberRole,
  addMessageReaction,
  addTrackingTagSharedAccount,
  addUsersToAdAudience,
  addWhatsAppGroupParticipants,
  adjustConversions,
  appealSmsRegistration,
  approveWhatsAppGroupJoinRequests,
  archiveLeadForm,
  assignGoogleBusinessLocation,
  attachCampaignAssets,
  attachNumberToSipTrunk,
  batchGetGoogleBusinessReviews,
  blockWhatsAppUsers,
  bookmarkPost,
  boostPost,
  bulkCreateContacts,
  bulkUpdateAdCampaignStatus,
  bulkUploadPosts,
  cancelBroadcast,
  cancelPhoneNumberPortIn,
  cancelRfReservation,
  checkPhoneNumberAvailability,
  checkPhoneNumberPortability,
  checkVerification,
  checkWhatsAppNumberAvailability,
  clearContactFieldValue,
  completeGoogleBusinessVerification,
  completeTelegramConnect,
  completeWhatsAppPhoneSelection,
  configureTikTokAdsBrandIdentity,
  connectAds,
  connectBlueskyCredentials,
  connectDiscordChannel,
  connectOpenAiAdsCredentials,
  connectShopifyWithToken,
  connectSlackChannel,
  connectWhatsAppCredentials,
  connectWhatsAppEmbeddedSignup,
  createAccountGroup,
  createAdAudience,
  createAdCampaign,
  createAdCreative,
  createAdInsightsReport,
  createAdSet,
  createApiKey,
  createBidStrategy,
  createBlog,
  createBlogArticle,
  createBroadcast,
  createBusinessAgentConnector,
  createBusinessAgentConnectorTool,
  createBusinessAgentFaq,
  createBusinessAgentSkill,
  createBusinessAgentUiSkill,
  createCallAd,
  createCommentAutomation,
  createContact,
  createConversionAction,
  createConversionDestination,
  createCtwaAd,
  createCustomConversion,
  createCustomField,
  createDiscordGuildRole,
  createDiscordScheduledEvent,
  createDiscordThread,
  createGoogleBusinessMedia,
  createGoogleBusinessPlaceAction,
  createHighDemandPeriod,
  createInboxConversation,
  createInviteToken,
  createLeadForm,
  createMessagingAd,
  createPhoneNumberKycLink,
  createPhoneNumberPortIn,
  createPhoneNumberStockWatch,
  createPinterestBoard,
  createPost,
  createProfile,
  createQueueSlot,
  createRfPrediction,
  createSequence,
  createSipTrunk,
  createSmsSenderId,
  createStandaloneAd,
  createTestLead,
  createTrackingTag,
  createValueRuleSet,
  createVerification,
  createVoiceCall,
  createVoiceWebSession,
  createWebhookSettings,
  createWhatsAppDataset,
  createWhatsAppFlow,
  createWhatsAppGroupChat,
  createWhatsAppGroupInviteLink,
  createWhatsAppNumberKycLink,
  createWhatsAppSandboxSession,
  createWhatsAppTemplate,
  createWorkflow,
  crosspostDiscordMessage,
  deactivateSmsRegistration,
  deleteAccount,
  deleteAccountGroup,
  deleteAd,
  deleteAdAudience,
  deleteAdCampaign,
  deleteAdCreative,
  deleteAdSet,
  deleteAdVideo,
  deleteApiKey,
  deleteBlog,
  deleteBlogArticle,
  deleteBroadcast,
  deleteBusinessAgentConnector,
  deleteBusinessAgentConnectorTool,
  deleteBusinessAgentFaq,
  deleteBusinessAgentFile,
  deleteBusinessAgentSkill,
  deleteBusinessAgentUiSkill,
  deleteBusinessAgentWebsite,
  deleteCommentAutomation,
  deleteContact,
  deleteConversionDestination,
  deleteCustomField,
  deleteDiscordGuildRole,
  deleteDiscordMessage,
  deleteDiscordScheduledEvent,
  deleteGoogleBusinessMedia,
  deleteGoogleBusinessPlaceAction,
  deleteGoogleBusinessReviewReply,
  deleteInboxComment,
  deleteInboxMessage,
  deleteInboxReviewReply,
  deleteInstagramIceBreakers,
  deleteMessengerMenu,
  deletePhoneNumberStockWatch,
  deletePost,
  deleteProfile,
  deleteQueueSlot,
  deleteSequence,
  deleteSipTrunk,
  deleteSmsSenderId,
  deleteTelegramCommands,
  deleteValueRuleSet,
  deleteWebhookSettings,
  deleteWhatsAppFlow,
  deleteWhatsAppGroupChat,
  deleteWhatsAppSandboxSession,
  deleteWhatsAppTemplate,
  deleteWhatsAppTemplateById,
  deleteWhatsappBusinessUsername,
  deleteWorkflow,
  deprecateWhatsAppFlow,
  detachNumberFromSipTrunk,
  dialVoiceWebCall,
  disableSmsOnNumber,
  disableVoiceOnNumber,
  disableWhatsAppCalling,
  disableWhatsAppCallingLegacy,
  duplicateAd,
  duplicateAdCampaign,
  duplicateAdSet,
  duplicateWorkflow,
  editDiscordGuildRole,
  editInboxComment,
  editInboxMessage,
  editPost,
  enableSmsOnNumber,
  enableVoiceOnNumber,
  enableWhatsAppCalling,
  enableWhatsAppCallingLegacy,
  endVoiceCall,
  enrollContacts,
  estimateAdReach,
  fetchGoogleBusinessVerificationOptions,
  followUser,
  generateAdPreviews,
  generateKeywordHistoricalMetrics,
  generateKeywordIdeas,
  getAccountHealth,
  getAccountPosts,
  getAd,
  getAdAccountFinance,
  getAdAnalytics,
  getAdAudience,
  getAdComments,
  getAdCreative,
  getAdInsightsReport,
  getAdMedia,
  getAdPreviews,
  getAdSetDetails,
  getAdTrackingTags,
  getAdTree,
  getAdsActivityLog,
  getAdsSearchTerms,
  getAdsTimeline,
  getAllAccountsHealth,
  getAnalytics,
  getAnalyticsDelta,
  getBestTimeToPost,
  getBilling,
  getBlog,
  getBlogArticle,
  getBlueskySettings,
  getBroadcast,
  getBusinessAgentBudget,
  getBusinessAgentBusinessInformation,
  getBusinessAgentConnector,
  getBusinessAgentConnectorLogs,
  getBusinessAgentConnectorTool,
  getBusinessAgentEvent,
  getBusinessAgentFaq,
  getBusinessAgentFile,
  getBusinessAgentSkill,
  getBusinessAgentStatus,
  getBusinessAgentUiSkill,
  getBusinessAgentWebsite,
  getCall,
  getCallRecording,
  getCallsUsage,
  getCampaignAnalytics,
  getCampaignBidding,
  getCampaignTargeting,
  getCommentAutomation,
  getConnectUrl,
  getContact,
  getContactChannels,
  getContentDecay,
  getConversionDestination,
  getConversionMetrics,
  getConversionsQuality,
  getDailyMetrics,
  getDiscordChannels,
  getDiscordGuildMember,
  getDiscordScheduledEvent,
  getDiscordSettings,
  getDsaDefaults,
  getDsaRecommendations,
  getFacebookPageInsights,
  getFacebookPages,
  getFacebookPostEarnings,
  getFacebookPostReactions,
  getFollowerStats,
  getGmbAttributeMetadata,
  getGmbLocations,
  getGoogleBusinessAttributes,
  getGoogleBusinessFoodMenus,
  getGoogleBusinessLocationDetails,
  getGoogleBusinessPerformance,
  getGoogleBusinessReview,
  getGoogleBusinessReviews,
  getGoogleBusinessSearchKeywords,
  getGoogleBusinessServices,
  getGoogleBusinessVerifications,
  getInboxConversation,
  getInboxConversationAnalytics,
  getInboxConversationMessages,
  getInboxHeatmap,
  getInboxPostComments,
  getInboxResponseTime,
  getInboxSourceBreakdown,
  getInboxTopAccounts,
  getInboxVolume,
  getInstagramAccountInsights,
  getInstagramAudio,
  getInstagramDemographics,
  getInstagramFollowStatus,
  getInstagramFollowerHistory,
  getInstagramIceBreakers,
  getInstagramPublishingLimit,
  getInstagramStoryInsights,
  getLeadForm,
  getLinkedInAggregateAnalytics,
  getLinkedInBidPricing,
  getLinkedInMentions,
  getLinkedInOrgAggregateAnalytics,
  getLinkedInOrganizations,
  getLinkedInPostAnalytics,
  getLinkedInPostReactions,
  getLinkedInSupplyForecast,
  getMediaPresignedUrl,
  getMessageAttachment,
  getMessengerMenu,
  getNextQueueSlot,
  getPendingOAuthData,
  getPhoneNumber,
  getPhoneNumberKycForm,
  getPhoneNumberPortInOrderRequirements,
  getPhoneNumberPortInRequirements,
  getPhoneNumberRemediation,
  getPinterestBoards,
  getPost,
  getPostTimeline,
  getPostingFrequency,
  getProfile,
  getRedditFeed,
  getRedditFlairs,
  getRedditSubreddits,
  getRfPrediction,
  getSequence,
  getShopifyConnectUrl,
  getSipTrunk,
  getSlackSettings,
  getSmsRegistration,
  getSmsUsage,
  getSubredditRules,
  getTelegramCommands,
  getTelegramConnectStatus,
  getTikTokAccountInsights,
  getTikTokCreatorInfo,
  getTrackingTag,
  getTrackingTagStats,
  getTweet,
  getUsage,
  getUsageStats,
  getUser,
  getValueRuleSet,
  getVerification,
  getVoiceCall,
  getVoiceCallEstimate,
  getVoiceCallRecording,
  getWebhookLogs,
  getWebhookSettings,
  getWhatsAppBlockStatus,
  getWhatsAppBlockedUsers,
  getWhatsAppBusinessProfile,
  getWhatsAppCall,
  getWhatsAppCallEstimate,
  getWhatsAppCallPermissions,
  getWhatsAppCallRecording,
  getWhatsAppCalling,
  getWhatsAppCallingConfig,
  getWhatsAppDataset,
  getWhatsAppDisplayName,
  getWhatsAppFlow,
  getWhatsAppFlowJson,
  getWhatsAppFlowPreview,
  getWhatsAppFlowsEncryptionKey,
  getWhatsAppGroupChat,
  getWhatsAppLibraryTemplate,
  getWhatsAppMedia,
  getWhatsAppNumberInfo,
  getWhatsAppNumberKycForm,
  getWhatsAppNumberRemediation,
  getWhatsAppPhoneNumber,
  getWhatsAppPhoneNumbers,
  getWhatsAppSdkConfig,
  getWhatsAppTemplate,
  getWhatsAppTemplateById,
  getWhatsAppTemplates,
  getWhatsappBusinessUsername,
  getWhatsappBusinessUsernameSuggestions,
  getWorkflow,
  getWorkflowVersion,
  getXApiPricing,
  getYouTubeChannelInsights,
  getYouTubeDailyViews,
  getYouTubeDemographics,
  getYouTubeVideoRetention,
  getYoutubeCaptions,
  getYoutubePlaylists,
  handleOAuthCallback,
  hideInboxComment,
  initiateTelegramConnect,
  initiateWhatsAppCall,
  likeInboxComment,
  likePost,
  listAccountCallouts,
  listAccountGroups,
  listAccounts,
  listAdAccounts,
  listAdAudiences,
  listAdCampaigns,
  listAdCatalogProductSets,
  listAdCatalogs,
  listAdCreatives,
  listAdImages,
  listAdKeywords,
  listAdLabels,
  listAdSets,
  listAdStudies,
  listAdVideos,
  listAds,
  listAdsBusinessCenters,
  listApiKeys,
  listBidStrategies,
  listBlogArticles,
  listBlogs,
  listBroadcastRecipients,
  listBroadcasts,
  listBusinessAgentAllowlist,
  listBusinessAgentConnectorTools,
  listBusinessAgentConnectors,
  listBusinessAgentFaqs,
  listBusinessAgentFiles,
  listBusinessAgentSettings,
  listBusinessAgentSkills,
  listBusinessAgentUiSkills,
  listBusinessAgentWebsites,
  listCalls,
  listCampaignNegativeKeywords,
  listCommentAutomationLogs,
  listCommentAutomations,
  listConnectedApps,
  listContacts,
  listConversionActions,
  listConversionAssociations,
  listConversionDestinations,
  listCustomConversions,
  listCustomFields,
  listDiscordGuildMembers,
  listDiscordGuildRoles,
  listDiscordPinnedMessages,
  listDiscordScheduledEvents,
  listFacebookPages,
  listFormLeads,
  listGoogleBusinessLocations,
  listGoogleBusinessMedia,
  listGoogleBusinessPlaceActions,
  listHighDemandPeriods,
  listInboxComments,
  listInboxConversationAnalytics,
  listInboxConversations,
  listInboxMentions,
  listInboxReviews,
  listInstagramPages,
  listInstagramStories,
  listLeadForms,
  listLeads,
  listLinkedInOrganizations,
  listLocalServicesLeadConversations,
  listLocalServicesLeads,
  listLogs,
  listMetaBusinesses,
  listPhoneNumberCountries,
  listPhoneNumberPortIns,
  listPhoneNumberStockWatches,
  listPhoneNumbers,
  listPinterestBoardsForSelection,
  listPosts,
  listProfiles,
  listQueueSlots,
  listSequenceEnrollments,
  listSequences,
  listSipTrunks,
  listSlackChannels,
  listSlackMembers,
  listSmsOptOuts,
  listSmsRegistrations,
  listSmsSenderIds,
  listSnapchatProfiles,
  listTrackingTagSharedAccounts,
  listTrackingTags,
  listUsers,
  listValueRuleSets,
  listVoiceCalls,
  listWhatsAppAccountEvents,
  listWhatsAppCalls,
  listWhatsAppConversions,
  listWhatsAppFlowResponses,
  listWhatsAppFlowVersions,
  listWhatsAppFlows,
  listWhatsAppGroupChats,
  listWhatsAppGroupJoinRequests,
  listWhatsAppNumberCountries,
  listWhatsAppPhoneNumbers,
  listWhatsAppSandboxSessions,
  listWorkflowExecutionEvents,
  listWorkflowExecutions,
  listWorkflowVersions,
  listWorkflows,
  lookupSmsNumber,
  markConversationRead,
  moveAccountToProfile,
  moveWhatsAppNumberToProfile,
  onboardBusinessAgent,
  pauseSequence,
  pauseWorkflow,
  pinDiscordMessage,
  preflightSmsRegistration,
  previewQueue,
  publishWhatsAppFlow,
  purchasePhoneNumber,
  purchaseWhatsAppPhoneNumber,
  queryAdInsights,
  readBusinessAgentEvals,
  redeliverWebhookEvent,
  refreshBusinessAgentConnectorTools,
  registerWhatsAppNumber,
  rejectWhatsAppGroupJoinRequests,
  releasePhoneNumber,
  releaseWhatsAppPhoneNumber,
  remediatePhoneNumber,
  remediateWhatsAppNumber,
  removeAccountCallout,
  removeAdKeyword,
  removeBookmark,
  removeBusinessAgentAllowlistEntry,
  removeConversionAssociations,
  removeDiscordMemberRole,
  removeMessageReaction,
  removeTrackingTagSharedAccount,
  removeWhatsAppGroupParticipants,
  replaceAdAudienceCompanies,
  replaceBusinessAgentBudget,
  replaceBusinessAgentBusinessInformation,
  replaceCampaignNegativeKeywords,
  replyToGoogleBusinessReview,
  replyToInboxPost,
  replyToInboxReview,
  replyToMention,
  replyToPhoneNumberReviewer,
  requestSmsSenderIdLimitIncrease,
  requestWhatsAppVerificationCode,
  resendSmsRegistrationOtp,
  reserveRfPrediction,
  resetBusinessAgentBusinessInformation,
  respondToPhoneNumberReviewer,
  respondToSmsRegistrationReview,
  restoreWorkflowVersion,
  retryPost,
  retweetPost,
  reuseSmsRegistrationForNumber,
  reviewPhoneNumberKycPacket,
  revokeConnectedApp,
  rotateSipTrunkCredentials,
  runBusinessAgentConnectorTool,
  scheduleBroadcast,
  searchAdInterests,
  searchAdLibrary,
  searchAdTargeting,
  searchAvailablePhoneNumbers,
  searchAvailableWhatsAppNumbers,
  searchDiscordGuildMembers,
  searchInboxConversations,
  searchInstagramAudio,
  searchReddit,
  searchTweets,
  selectFacebookPage,
  selectGoogleBusinessLocation,
  selectInstagramAccount,
  selectLinkedInOrganization,
  selectPinterestBoard,
  selectSnapchatProfile,
  sendBroadcast,
  sendBusinessAgentEvent,
  sendBusinessAgentTestMessage,
  sendConversions,
  sendDiscordDirectMessage,
  sendInboxMessage,
  sendPrivateReplyToComment,
  sendSms,
  sendTypingIndicator,
  sendWhatsAppConversion,
  sendWhatsAppFlowMessage,
  setBusinessAgentConnectorCredentials,
  setCommentModeration,
  setContactFieldValue,
  setConversationThreadControl,
  setInstagramIceBreakers,
  setMessengerMenu,
  setRedditPostFlair,
  setTelegramCommands,
  setWhatsAppFlowsEncryptionKey,
  setWhatsappBusinessUsername,
  shareSmsRegistration,
  startBusinessAgentEvalRun,
  startGoogleBusinessVerification,
  startSmsRegistration,
  startWhatsAppCallerIdVerification,
  submitPhoneNumberKyc,
  submitWhatsAppNumberKyc,
  syncExternalPosts,
  testWebhook,
  transferVoiceCall,
  triggerWorkflow,
  unblockWhatsAppUsers,
  undoRetweet,
  unenrollContact,
  unfollowUser,
  unhideInboxComment,
  unlikeInboxComment,
  unlikePost,
  unpinDiscordMessage,
  unpublishPost,
  updateAccount,
  updateAccountGroup,
  updateAd,
  updateAdAccount,
  updateAdAudience,
  updateAdCampaign,
  updateAdCampaignStatus,
  updateAdCreative,
  updateAdKeyword,
  updateAdSet,
  updateAdSetStatus,
  updateAdStatus,
  updateAdTrackingTags,
  updateBidStrategy,
  updateBlog,
  updateBlogArticle,
  updateBlueskySettings,
  updateBroadcast,
  updateBusinessAgentConnector,
  updateBusinessAgentConnectorTool,
  updateBusinessAgentFaq,
  updateBusinessAgentSettings,
  updateBusinessAgentSkill,
  updateBusinessAgentUiSkill,
  updateBusinessAgentWebsite,
  updateCampaignTargeting,
  updateCommentAutomation,
  updateContact,
  updateConversionDestination,
  updateCustomField,
  updateDiscordScheduledEvent,
  updateDiscordSettings,
  updateFacebookPage,
  updateGmbLocation,
  updateGoogleBusinessAttributes,
  updateGoogleBusinessFoodMenus,
  updateGoogleBusinessLocationDetails,
  updateGoogleBusinessPlaceAction,
  updateGoogleBusinessServices,
  updateInboxConversation,
  updateLinkedInOrganization,
  updatePinterestBoards,
  updatePost,
  updatePostMetadata,
  updateProfile,
  updateQueueSlot,
  updateRedditSubreddits,
  updateSequence,
  updateSlackSettings,
  updateTrackingTag,
  updateValueRuleSet,
  updateWebhookSettings,
  updateWhatsAppBusinessProfile,
  updateWhatsAppCalling,
  updateWhatsAppCallingLegacy,
  updateWhatsAppDisplayName,
  updateWhatsAppFlow,
  updateWhatsAppGroupChat,
  updateWhatsAppTemplate,
  updateWhatsAppTemplateById,
  updateWorkflow,
  updateYoutubeDefaultPlaylist,
  uploadAdImage,
  uploadAdVideo,
  uploadBusinessAgentFile,
  uploadMediaDirect,
  uploadPhoneNumberKycDocument,
  uploadPhoneNumberPortInDocument,
  uploadSmsOptInProof,
  uploadSmsOptInProofFile,
  uploadWhatsAppFlowJson,
  uploadWhatsAppNumberKycDocument,
  uploadWhatsAppProfilePhoto,
  validateMedia,
  validatePhoneNumberKycAddress,
  validatePost,
  validatePostLength,
  validateSubreddit,
  validateWhatsAppNumberKycAddress,
  verifyCredential,
  verifySmsRegistrationOtp,
  verifyWhatsAppCallerId,
  verifyWhatsAppNumber,
  viewPhoneNumberKycDocument,
  voteRedditThing,
} from './generated/sdk.gen';

import { ZernioApiError, parseApiError } from './errors';
export interface ClientOptions {
  /**
   * API key for authentication. Defaults to process.env['ZERNIO_API_KEY'] (falls back to LATE_API_KEY).
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API.
   * @default "https://zernio.com/api"
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
 * API Client for the Zernio API.
 *
 * @example
 * ```typescript
 * import Zernio from '@zernio/node';
 *
 * const zernio = new Zernio({
 *   apiKey: process.env['ZERNIO_API_KEY'], // This is the default and can be omitted
 * });
 *
 * async function main() {
 *   const post = await zernio.posts.create({
 *     body: {
 *       content: 'Hello from the Zernio SDK!',
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
export class Zernio {
  private _options: ClientOptions;

  /**
   * HTTP client owned by this instance. Every namespace method below is bound
   * to it, so two Zernio instances in the same process never see each other's
   * credentials.
   */
  private _client!: Client;

  /**
   * Wrapper around `_client` that `_bind` injects into operations. Identical
   * to `_client` except that its HTTP methods strip the `client` selector from
   * request options before dispatch (see `_stripClientSelector`).
   */
  private _dispatchClient!: Client;

  /**
   * API key used for authentication.
   */
  apiKey: string;

  /**
   * Base URL for API requests.
   */
  baseURL: string;

  /**
   * Routes a generated operation through this instance's client, preserving the
   * operation's own signature. Reads `_client` when the method is called, not
   * when it is bound, because class fields initialize before the constructor
   * body runs.
   */
  private _bind<F>(operation: F): F {
    return ((options?: Record<string, unknown>) => {
      const withClient = { ...options };
      if (withClient['client'] === undefined) {
        withClient['client'] = this._dispatchClient;
      }
      return (operation as (opts: unknown) => unknown)(withClient);
    }) as F;
  }

  /**
   * TODO: remove once hey-api ships a fix for
   * https://github.com/hey-api/hey-api/issues/4177 and we can upgrade.
   *
   * `_bind` injects the per-instance client into each operation's options
   * under the `client` key, and the generated operations forward that whole
   * options object to @hey-api/client-fetch, which spreads it into the fetch
   * `RequestInit`. Node's undici ignores unknown init fields, but Deno defines
   * its own `client` init option (a `Deno.HttpClient`) and validates it, so
   * `new Request(...)` throws and every SDK call fails on Deno, Deno Deploy,
   * and Supabase Edge Functions. The selector has already done its job by the
   * time an HTTP method runs, so this wrapper strips it before hey-api builds
   * the request. The real client is left untouched — config and interceptors
   * still live on it, and the wrapper delegates everything else to it.
   */
  private static _stripClientSelector(client: Client): Client {
    const wrapped = Object.create(client) as Client;
    const methods = [
      'connect',
      'delete',
      'get',
      'head',
      'options',
      'patch',
      'post',
      'put',
      'trace',
    ] as const;
    for (const method of methods) {
      const dispatch = client[method] as (requestOptions?: unknown) => unknown;
      (wrapped as unknown as Record<string, unknown>)[method] = (
        requestOptions?: Record<string, unknown>
      ) => {
        if (requestOptions && 'client' in requestOptions) {
          const sanitized = { ...requestOptions };
          delete sanitized['client'];
          return dispatch(sanitized);
        }
        return dispatch(requestOptions);
      };
    }
    return wrapped;
  }

  /**
   * validate API
   */
  validate = {
    validatePostLength: this._bind(validatePostLength),
    validatePost: this._bind(validatePost),
    validateMedia: this._bind(validateMedia),
    validateSubreddit: this._bind(validateSubreddit),
  };

  /**
   * Analytics API - Get performance metrics
   */
  analytics = {
    getAnalytics: this._bind(getAnalytics),
    getAnalyticsDelta: this._bind(getAnalyticsDelta),
    getYouTubeChannelInsights: this._bind(getYouTubeChannelInsights),
    getLinkedInOrgAggregateAnalytics: this._bind(getLinkedInOrgAggregateAnalytics),
    getTikTokAccountInsights: this._bind(getTikTokAccountInsights),
    getYouTubeDailyViews: this._bind(getYouTubeDailyViews),
    getYouTubeVideoRetention: this._bind(getYouTubeVideoRetention),
    getFacebookPageInsights: this._bind(getFacebookPageInsights),
    getFacebookPostEarnings: this._bind(getFacebookPostEarnings),
    getInstagramAccountInsights: this._bind(getInstagramAccountInsights),
    getInstagramFollowerHistory: this._bind(getInstagramFollowerHistory),
    getInstagramDemographics: this._bind(getInstagramDemographics),
    getYouTubeDemographics: this._bind(getYouTubeDemographics),
    getDailyMetrics: this._bind(getDailyMetrics),
    getBestTimeToPost: this._bind(getBestTimeToPost),
    getContentDecay: this._bind(getContentDecay),
    getPostingFrequency: this._bind(getPostingFrequency),
    getPostTimeline: this._bind(getPostTimeline),
    getGoogleBusinessPerformance: this._bind(getGoogleBusinessPerformance),
    getGoogleBusinessSearchKeywords: this._bind(getGoogleBusinessSearchKeywords),
    syncExternalPosts: this._bind(syncExternalPosts),
    getLinkedInAggregateAnalytics: this._bind(getLinkedInAggregateAnalytics),
    getLinkedInPostAnalytics: this._bind(getLinkedInPostAnalytics),
    getLinkedInPostReactions: this._bind(getLinkedInPostReactions),
    getFacebookPostReactions: this._bind(getFacebookPostReactions),
  };

  /**
   * inboxanalytics API
   */
  inboxanalytics = {
    getInboxVolume: this._bind(getInboxVolume),
    getInboxHeatmap: this._bind(getInboxHeatmap),
    getInboxSourceBreakdown: this._bind(getInboxSourceBreakdown),
    getInboxResponseTime: this._bind(getInboxResponseTime),
    getInboxTopAccounts: this._bind(getInboxTopAccounts),
    listInboxConversationAnalytics: this._bind(listInboxConversationAnalytics),
    getInboxConversationAnalytics: this._bind(getInboxConversationAnalytics),
  };

  /**
   * Account Groups API - Organize accounts into groups
   */
  accountGroups = {
    listAccountGroups: this._bind(listAccountGroups),
    createAccountGroup: this._bind(createAccountGroup),
    updateAccountGroup: this._bind(updateAccountGroup),
    deleteAccountGroup: this._bind(deleteAccountGroup),
  };

  /**
   * Media API - Upload and manage media files
   */
  media = {
    getMediaPresignedUrl: this._bind(getMediaPresignedUrl),
  };

  /**
   * Reddit API - Search and feed
   */
  reddit = {
    searchReddit: this._bind(searchReddit),
    getRedditFeed: this._bind(getRedditFeed),
  };

  /**
   * Usage API - Get usage statistics
   */
  usage = {
    getBilling: this._bind(getBilling),
    getXApiPricing: this._bind(getXApiPricing),
    getUsage: this._bind(getUsage),
    getUsageStats: this._bind(getUsageStats),
    getCallsUsage: this._bind(getCallsUsage),
    getSmsUsage: this._bind(getSmsUsage),
  };

  /**
   * Posts API - Create, schedule, and manage social media posts
   */
  posts = {
    listPosts: this._bind(listPosts),
    createPost: this._bind(createPost),
    getPost: this._bind(getPost),
    updatePost: this._bind(updatePost),
    deletePost: this._bind(deletePost),
    bulkUploadPosts: this._bind(bulkUploadPosts),
    retryPost: this._bind(retryPost),
    unpublishPost: this._bind(unpublishPost),
    editPost: this._bind(editPost),
    updatePostMetadata: this._bind(updatePostMetadata),
  };

  /**
   * Users API - User management
   */
  users = {
    listUsers: this._bind(listUsers),
    getUser: this._bind(getUser),
  };

  /**
   * Profiles API - Manage workspace profiles
   */
  profiles = {
    listProfiles: this._bind(listProfiles),
    createProfile: this._bind(createProfile),
    getProfile: this._bind(getProfile),
    updateProfile: this._bind(updateProfile),
    deleteProfile: this._bind(deleteProfile),
  };

  /**
   * Accounts API - Manage connected social media accounts
   */
  accounts = {
    listAccounts: this._bind(listAccounts),
    getFollowerStats: this._bind(getFollowerStats),
    updateAccount: this._bind(updateAccount),
    moveAccountToProfile: this._bind(moveAccountToProfile),
    deleteAccount: this._bind(deleteAccount),
    getAllAccountsHealth: this._bind(getAllAccountsHealth),
    getAccountHealth: this._bind(getAccountHealth),
    getAccountPosts: this._bind(getAccountPosts),
    getInstagramFollowStatus: this._bind(getInstagramFollowStatus),
    getTikTokCreatorInfo: this._bind(getTikTokCreatorInfo),
    getGoogleBusinessReviews: this._bind(getGoogleBusinessReviews),
    batchGetGoogleBusinessReviews: this._bind(batchGetGoogleBusinessReviews),
    getGoogleBusinessReview: this._bind(getGoogleBusinessReview),
    replyToGoogleBusinessReview: this._bind(replyToGoogleBusinessReview),
    deleteGoogleBusinessReviewReply: this._bind(deleteGoogleBusinessReviewReply),
    getLinkedInMentions: this._bind(getLinkedInMentions),
    getSlackSettings: this._bind(getSlackSettings),
    updateSlackSettings: this._bind(updateSlackSettings),
    getBlueskySettings: this._bind(getBlueskySettings),
    updateBlueskySettings: this._bind(updateBlueskySettings),
  };

  /**
   * whatsapp API
   */
  whatsapp = {
    registerWhatsAppNumber: this._bind(registerWhatsAppNumber),
    requestWhatsAppVerificationCode: this._bind(requestWhatsAppVerificationCode),
    verifyWhatsAppNumber: this._bind(verifyWhatsAppNumber),
    getWhatsAppMedia: this._bind(getWhatsAppMedia),
    getWhatsAppTemplates: this._bind(getWhatsAppTemplates),
    createWhatsAppTemplate: this._bind(createWhatsAppTemplate),
    getWhatsAppTemplate: this._bind(getWhatsAppTemplate),
    updateWhatsAppTemplate: this._bind(updateWhatsAppTemplate),
    deleteWhatsAppTemplate: this._bind(deleteWhatsAppTemplate),
    getWhatsAppTemplateById: this._bind(getWhatsAppTemplateById),
    updateWhatsAppTemplateById: this._bind(updateWhatsAppTemplateById),
    deleteWhatsAppTemplateById: this._bind(deleteWhatsAppTemplateById),
    getWhatsAppBusinessProfile: this._bind(getWhatsAppBusinessProfile),
    updateWhatsAppBusinessProfile: this._bind(updateWhatsAppBusinessProfile),
    uploadWhatsAppProfilePhoto: this._bind(uploadWhatsAppProfilePhoto),
    getWhatsAppDisplayName: this._bind(getWhatsAppDisplayName),
    updateWhatsAppDisplayName: this._bind(updateWhatsAppDisplayName),
    getWhatsappBusinessUsername: this._bind(getWhatsappBusinessUsername),
    setWhatsappBusinessUsername: this._bind(setWhatsappBusinessUsername),
    deleteWhatsappBusinessUsername: this._bind(deleteWhatsappBusinessUsername),
    getWhatsappBusinessUsernameSuggestions: this._bind(getWhatsappBusinessUsernameSuggestions),
    getWhatsAppBlockStatus: this._bind(getWhatsAppBlockStatus),
    getWhatsAppBlockedUsers: this._bind(getWhatsAppBlockedUsers),
    blockWhatsAppUsers: this._bind(blockWhatsAppUsers),
    unblockWhatsAppUsers: this._bind(unblockWhatsAppUsers),
    listWhatsAppAccountEvents: this._bind(listWhatsAppAccountEvents),
    getWhatsAppDataset: this._bind(getWhatsAppDataset),
    createWhatsAppDataset: this._bind(createWhatsAppDataset),
    listWhatsAppGroupChats: this._bind(listWhatsAppGroupChats),
    createWhatsAppGroupChat: this._bind(createWhatsAppGroupChat),
    getWhatsAppGroupChat: this._bind(getWhatsAppGroupChat),
    updateWhatsAppGroupChat: this._bind(updateWhatsAppGroupChat),
    deleteWhatsAppGroupChat: this._bind(deleteWhatsAppGroupChat),
    addWhatsAppGroupParticipants: this._bind(addWhatsAppGroupParticipants),
    removeWhatsAppGroupParticipants: this._bind(removeWhatsAppGroupParticipants),
    createWhatsAppGroupInviteLink: this._bind(createWhatsAppGroupInviteLink),
    listWhatsAppGroupJoinRequests: this._bind(listWhatsAppGroupJoinRequests),
    approveWhatsAppGroupJoinRequests: this._bind(approveWhatsAppGroupJoinRequests),
    rejectWhatsAppGroupJoinRequests: this._bind(rejectWhatsAppGroupJoinRequests),
    listWhatsAppConversions: this._bind(listWhatsAppConversions),
    sendWhatsAppConversion: this._bind(sendWhatsAppConversion),
  };

  /**
   * API Keys API - Manage API keys
   */
  apiKeys = {
    verifyCredential: this._bind(verifyCredential),
    listApiKeys: this._bind(listApiKeys),
    createApiKey: this._bind(createApiKey),
    deleteApiKey: this._bind(deleteApiKey),
  };

  /**
   * connectedapps API
   */
  connectedapps = {
    listConnectedApps: this._bind(listConnectedApps),
    revokeConnectedApp: this._bind(revokeConnectedApp),
  };

  /**
   * Invites API - Team invitations
   */
  invites = {
    createInviteToken: this._bind(createInviteToken),
  };

  /**
   * Connect API - OAuth connection flows
   */
  connect = {
    getConnectUrl: this._bind(getConnectUrl),
    handleOAuthCallback: this._bind(handleOAuthCallback),
    connectAds: this._bind(connectAds),
    getShopifyConnectUrl: this._bind(getShopifyConnectUrl),
    connectShopifyWithToken: this._bind(connectShopifyWithToken),
    configureTikTokAdsBrandIdentity: this._bind(configureTikTokAdsBrandIdentity),
    listInstagramPages: this._bind(listInstagramPages),
    selectInstagramAccount: this._bind(selectInstagramAccount),
    getPendingOAuthData: this._bind(getPendingOAuthData),
    connectOpenAIAdsCredentials: this._bind(connectOpenAiAdsCredentials),
    connectWhatsAppCredentials: this._bind(connectWhatsAppCredentials),
    listWhatsAppPhoneNumbers: this._bind(listWhatsAppPhoneNumbers),
    completeWhatsAppPhoneSelection: this._bind(completeWhatsAppPhoneSelection),
    connectWhatsAppEmbeddedSignup: this._bind(connectWhatsAppEmbeddedSignup),
    getWhatsAppSdkConfig: this._bind(getWhatsAppSdkConfig),
    connectDiscordChannel: this._bind(connectDiscordChannel),
    listSlackChannels: this._bind(listSlackChannels),
    connectSlackChannel: this._bind(connectSlackChannel),
    getFacebookPages: this._bind(getFacebookPages),
    updateFacebookPage: this._bind(updateFacebookPage),
    getLinkedInOrganizations: this._bind(getLinkedInOrganizations),
    updateLinkedInOrganization: this._bind(updateLinkedInOrganization),
    getPinterestBoards: this._bind(getPinterestBoards),
    updatePinterestBoards: this._bind(updatePinterestBoards),
    createPinterestBoard: this._bind(createPinterestBoard),
    getYoutubeCaptions: this._bind(getYoutubeCaptions),
    getYoutubePlaylists: this._bind(getYoutubePlaylists),
    updateYoutubeDefaultPlaylist: this._bind(updateYoutubeDefaultPlaylist),
    getGmbLocations: this._bind(getGmbLocations),
    updateGmbLocation: this._bind(updateGmbLocation),
    assignGoogleBusinessLocation: this._bind(assignGoogleBusinessLocation),
    getRedditSubreddits: this._bind(getRedditSubreddits),
    updateRedditSubreddits: this._bind(updateRedditSubreddits),
    getSubredditRules: this._bind(getSubredditRules),
    voteRedditThing: this._bind(voteRedditThing),
    getRedditFlairs: this._bind(getRedditFlairs),
    setRedditPostFlair: this._bind(setRedditPostFlair),
    facebook: {
      listFacebookPages: this._bind(listFacebookPages),
      selectFacebookPage: this._bind(selectFacebookPage),
    },
    googleBusiness: {
      listGoogleBusinessLocations: this._bind(listGoogleBusinessLocations),
      selectGoogleBusinessLocation: this._bind(selectGoogleBusinessLocation),
    },
    linkedin: {
      listLinkedInOrganizations: this._bind(listLinkedInOrganizations),
      selectLinkedInOrganization: this._bind(selectLinkedInOrganization),
    },
    pinterest: {
      listPinterestBoardsForSelection: this._bind(listPinterestBoardsForSelection),
      selectPinterestBoard: this._bind(selectPinterestBoard),
    },
    snapchat: {
      listSnapchatProfiles: this._bind(listSnapchatProfiles),
      selectSnapchatProfile: this._bind(selectSnapchatProfile),
    },
    bluesky: {
      connectBlueskyCredentials: this._bind(connectBlueskyCredentials),
    },
    telegram: {
      getTelegramConnectStatus: this._bind(getTelegramConnectStatus),
      initiateTelegramConnect: this._bind(initiateTelegramConnect),
      completeTelegramConnect: this._bind(completeTelegramConnect),
    },
  };

  /**
   * gmbverifications API
   */
  gmbverifications = {
    getGoogleBusinessVerifications: this._bind(getGoogleBusinessVerifications),
    startGoogleBusinessVerification: this._bind(startGoogleBusinessVerification),
    fetchGoogleBusinessVerificationOptions: this._bind(fetchGoogleBusinessVerificationOptions),
    completeGoogleBusinessVerification: this._bind(completeGoogleBusinessVerification),
  };

  /**
   * gmbfoodmenus API
   */
  gmbfoodmenus = {
    getGoogleBusinessFoodMenus: this._bind(getGoogleBusinessFoodMenus),
    updateGoogleBusinessFoodMenus: this._bind(updateGoogleBusinessFoodMenus),
  };

  /**
   * gmblocationdetails API
   */
  gmblocationdetails = {
    getGoogleBusinessLocationDetails: this._bind(getGoogleBusinessLocationDetails),
    updateGoogleBusinessLocationDetails: this._bind(updateGoogleBusinessLocationDetails),
  };

  /**
   * gmbmedia API
   */
  gmbmedia = {
    listGoogleBusinessMedia: this._bind(listGoogleBusinessMedia),
    createGoogleBusinessMedia: this._bind(createGoogleBusinessMedia),
    deleteGoogleBusinessMedia: this._bind(deleteGoogleBusinessMedia),
  };

  /**
   * gmbattributes API
   */
  gmbattributes = {
    getGmbAttributeMetadata: this._bind(getGmbAttributeMetadata),
    getGoogleBusinessAttributes: this._bind(getGoogleBusinessAttributes),
    updateGoogleBusinessAttributes: this._bind(updateGoogleBusinessAttributes),
  };

  /**
   * gmbplaceactions API
   */
  gmbplaceactions = {
    listGoogleBusinessPlaceActions: this._bind(listGoogleBusinessPlaceActions),
    createGoogleBusinessPlaceAction: this._bind(createGoogleBusinessPlaceAction),
    deleteGoogleBusinessPlaceAction: this._bind(deleteGoogleBusinessPlaceAction),
    updateGoogleBusinessPlaceAction: this._bind(updateGoogleBusinessPlaceAction),
  };

  /**
   * gmbservices API
   */
  gmbservices = {
    getGoogleBusinessServices: this._bind(getGoogleBusinessServices),
    updateGoogleBusinessServices: this._bind(updateGoogleBusinessServices),
  };

  /**
   * instagram API
   */
  instagram = {
    listInstagramStories: this._bind(listInstagramStories),
    getInstagramPublishingLimit: this._bind(getInstagramPublishingLimit),
    searchInstagramAudio: this._bind(searchInstagramAudio),
    getInstagramAudio: this._bind(getInstagramAudio),
    getInstagramStoryInsights: this._bind(getInstagramStoryInsights),
  };

  /**
   * discord API
   */
  discord = {
    getDiscordSettings: this._bind(getDiscordSettings),
    updateDiscordSettings: this._bind(updateDiscordSettings),
    getDiscordChannels: this._bind(getDiscordChannels),
    sendDiscordDirectMessage: this._bind(sendDiscordDirectMessage),
    listDiscordGuildRoles: this._bind(listDiscordGuildRoles),
    createDiscordGuildRole: this._bind(createDiscordGuildRole),
    editDiscordGuildRole: this._bind(editDiscordGuildRole),
    deleteDiscordGuildRole: this._bind(deleteDiscordGuildRole),
    listDiscordGuildMembers: this._bind(listDiscordGuildMembers),
    searchDiscordGuildMembers: this._bind(searchDiscordGuildMembers),
    getDiscordGuildMember: this._bind(getDiscordGuildMember),
    addDiscordMemberRole: this._bind(addDiscordMemberRole),
    removeDiscordMemberRole: this._bind(removeDiscordMemberRole),
    deleteDiscordMessage: this._bind(deleteDiscordMessage),
    crosspostDiscordMessage: this._bind(crosspostDiscordMessage),
    createDiscordThread: this._bind(createDiscordThread),
    listDiscordPinnedMessages: this._bind(listDiscordPinnedMessages),
    pinDiscordMessage: this._bind(pinDiscordMessage),
    unpinDiscordMessage: this._bind(unpinDiscordMessage),
    listDiscordScheduledEvents: this._bind(listDiscordScheduledEvents),
    createDiscordScheduledEvent: this._bind(createDiscordScheduledEvent),
    getDiscordScheduledEvent: this._bind(getDiscordScheduledEvent),
    updateDiscordScheduledEvent: this._bind(updateDiscordScheduledEvent),
    deleteDiscordScheduledEvent: this._bind(deleteDiscordScheduledEvent),
  };

  /**
   * slack API
   */
  slack = {
    listSlackMembers: this._bind(listSlackMembers),
  };

  /**
   * Queue API - Manage posting queue
   */
  queue = {
    listQueueSlots: this._bind(listQueueSlots),
    createQueueSlot: this._bind(createQueueSlot),
    updateQueueSlot: this._bind(updateQueueSlot),
    deleteQueueSlot: this._bind(deleteQueueSlot),
    previewQueue: this._bind(previewQueue),
    getNextQueueSlot: this._bind(getNextQueueSlot),
  };

  /**
   * Webhooks API - Configure event webhooks
   */
  webhooks = {
    getWebhookSettings: this._bind(getWebhookSettings),
    createWebhookSettings: this._bind(createWebhookSettings),
    updateWebhookSettings: this._bind(updateWebhookSettings),
    deleteWebhookSettings: this._bind(deleteWebhookSettings),
    getWebhookLogs: this._bind(getWebhookLogs),
    redeliverWebhookEvent: this._bind(redeliverWebhookEvent),
    testWebhook: this._bind(testWebhook),
  };

  /**
   * Logs API - Publishing logs
   */
  logs = {
    listLogs: this._bind(listLogs),
  };

  /**
   * messages API
   */
  messages = {
    listInboxConversations: this._bind(listInboxConversations),
    createInboxConversation: this._bind(createInboxConversation),
    searchInboxConversations: this._bind(searchInboxConversations),
    getInboxConversation: this._bind(getInboxConversation),
    updateInboxConversation: this._bind(updateInboxConversation),
    getInboxConversationMessages: this._bind(getInboxConversationMessages),
    sendInboxMessage: this._bind(sendInboxMessage),
    editInboxMessage: this._bind(editInboxMessage),
    deleteInboxMessage: this._bind(deleteInboxMessage),
    sendTypingIndicator: this._bind(sendTypingIndicator),
    setConversationThreadControl: this._bind(setConversationThreadControl),
    markConversationRead: this._bind(markConversationRead),
    addMessageReaction: this._bind(addMessageReaction),
    removeMessageReaction: this._bind(removeMessageReaction),
    uploadMediaDirect: this._bind(uploadMediaDirect),
    getMessageAttachment: this._bind(getMessageAttachment),
  };

  /**
   * accountsettings API
   */
  accountsettings = {
    getMessengerMenu: this._bind(getMessengerMenu),
    setMessengerMenu: this._bind(setMessengerMenu),
    deleteMessengerMenu: this._bind(deleteMessengerMenu),
    getInstagramIceBreakers: this._bind(getInstagramIceBreakers),
    setInstagramIceBreakers: this._bind(setInstagramIceBreakers),
    deleteInstagramIceBreakers: this._bind(deleteInstagramIceBreakers),
    getTelegramCommands: this._bind(getTelegramCommands),
    setTelegramCommands: this._bind(setTelegramCommands),
    deleteTelegramCommands: this._bind(deleteTelegramCommands),
  };

  /**
   * comments API
   */
  comments = {
    listInboxComments: this._bind(listInboxComments),
    getInboxPostComments: this._bind(getInboxPostComments),
    replyToInboxPost: this._bind(replyToInboxPost),
    deleteInboxComment: this._bind(deleteInboxComment),
    editInboxComment: this._bind(editInboxComment),
    setCommentModeration: this._bind(setCommentModeration),
    hideInboxComment: this._bind(hideInboxComment),
    unhideInboxComment: this._bind(unhideInboxComment),
    likeInboxComment: this._bind(likeInboxComment),
    unlikeInboxComment: this._bind(unlikeInboxComment),
    likePost: this._bind(likePost),
    unlikePost: this._bind(unlikePost),
    sendPrivateReplyToComment: this._bind(sendPrivateReplyToComment),
  };

  /**
   * twitterengagement API
   */
  twitterengagement = {
    retweetPost: this._bind(retweetPost),
    undoRetweet: this._bind(undoRetweet),
    bookmarkPost: this._bind(bookmarkPost),
    removeBookmark: this._bind(removeBookmark),
    followUser: this._bind(followUser),
    unfollowUser: this._bind(unfollowUser),
    searchTweets: this._bind(searchTweets),
    getTweet: this._bind(getTweet),
  };

  /**
   * mentions API
   */
  mentions = {
    listInboxMentions: this._bind(listInboxMentions),
    replyToMention: this._bind(replyToMention),
  };

  /**
   * reviews API
   */
  reviews = {
    listInboxReviews: this._bind(listInboxReviews),
    replyToInboxReview: this._bind(replyToInboxReview),
    deleteInboxReviewReply: this._bind(deleteInboxReviewReply),
  };

  /**
   * whatsappcalling API
   */
  whatsappcalling = {
    getWhatsAppCallingConfig: this._bind(getWhatsAppCallingConfig),
    enableWhatsAppCallingLegacy: this._bind(enableWhatsAppCallingLegacy),
    updateWhatsAppCallingLegacy: this._bind(updateWhatsAppCallingLegacy),
    disableWhatsAppCallingLegacy: this._bind(disableWhatsAppCallingLegacy),
    getWhatsAppCallPermissions: this._bind(getWhatsAppCallPermissions),
    initiateWhatsAppCall: this._bind(initiateWhatsAppCall),
    listWhatsAppCalls: this._bind(listWhatsAppCalls),
    getWhatsAppCall: this._bind(getWhatsAppCall),
    getWhatsAppCallRecording: this._bind(getWhatsAppCallRecording),
    getWhatsAppCallEstimate: this._bind(getWhatsAppCallEstimate),
    getWhatsAppCalling: this._bind(getWhatsAppCalling),
    enableWhatsAppCalling: this._bind(enableWhatsAppCalling),
    updateWhatsAppCalling: this._bind(updateWhatsAppCalling),
    disableWhatsAppCalling: this._bind(disableWhatsAppCalling),
    startWhatsAppCallerIdVerification: this._bind(startWhatsAppCallerIdVerification),
    verifyWhatsAppCallerId: this._bind(verifyWhatsAppCallerId),
  };

  /**
   * calls API
   */
  calls = {
    listCalls: this._bind(listCalls),
    getCall: this._bind(getCall),
    getCallRecording: this._bind(getCallRecording),
  };

  /**
   * voice API
   */
  voice = {
    createVoiceCall: this._bind(createVoiceCall),
    listVoiceCalls: this._bind(listVoiceCalls),
    getVoiceCall: this._bind(getVoiceCall),
    endVoiceCall: this._bind(endVoiceCall),
    getVoiceCallRecording: this._bind(getVoiceCallRecording),
    transferVoiceCall: this._bind(transferVoiceCall),
    getVoiceCallEstimate: this._bind(getVoiceCallEstimate),
    createVoiceWebSession: this._bind(createVoiceWebSession),
    dialVoiceWebCall: this._bind(dialVoiceWebCall),
    enableVoiceOnNumber: this._bind(enableVoiceOnNumber),
    disableVoiceOnNumber: this._bind(disableVoiceOnNumber),
    createSipTrunk: this._bind(createSipTrunk),
    listSipTrunks: this._bind(listSipTrunks),
    getSipTrunk: this._bind(getSipTrunk),
    deleteSipTrunk: this._bind(deleteSipTrunk),
    rotateSipTrunkCredentials: this._bind(rotateSipTrunkCredentials),
    attachNumberToSipTrunk: this._bind(attachNumberToSipTrunk),
    detachNumberFromSipTrunk: this._bind(detachNumberFromSipTrunk),
  };

  /**
   * sms API
   */
  sms = {
    sendSms: this._bind(sendSms),
    lookupSmsNumber: this._bind(lookupSmsNumber),
    listSmsOptOuts: this._bind(listSmsOptOuts),
    createSmsSenderId: this._bind(createSmsSenderId),
    listSmsSenderIds: this._bind(listSmsSenderIds),
    requestSmsSenderIdLimitIncrease: this._bind(requestSmsSenderIdLimitIncrease),
    deleteSmsSenderId: this._bind(deleteSmsSenderId),
    startSmsRegistration: this._bind(startSmsRegistration),
    listSmsRegistrations: this._bind(listSmsRegistrations),
    preflightSmsRegistration: this._bind(preflightSmsRegistration),
    deactivateSmsRegistration: this._bind(deactivateSmsRegistration),
    getSmsRegistration: this._bind(getSmsRegistration),
    verifySmsRegistrationOtp: this._bind(verifySmsRegistrationOtp),
    resendSmsRegistrationOtp: this._bind(resendSmsRegistrationOtp),
    appealSmsRegistration: this._bind(appealSmsRegistration),
    respondToSmsRegistrationReview: this._bind(respondToSmsRegistrationReview),
    uploadSmsOptInProofFile: this._bind(uploadSmsOptInProofFile),
    uploadSmsOptInProof: this._bind(uploadSmsOptInProof),
    shareSmsRegistration: this._bind(shareSmsRegistration),
    enableSmsOnNumber: this._bind(enableSmsOnNumber),
    disableSmsOnNumber: this._bind(disableSmsOnNumber),
    reuseSmsRegistrationForNumber: this._bind(reuseSmsRegistrationForNumber),
  };

  /**
   * whatsapptemplates API
   */
  whatsapptemplates = {
    getWhatsAppLibraryTemplate: this._bind(getWhatsAppLibraryTemplate),
  };

  /**
   * whatsappphonenumbers API
   */
  whatsappphonenumbers = {
    getWhatsAppNumberInfo: this._bind(getWhatsAppNumberInfo),
    getWhatsAppPhoneNumbers: this._bind(getWhatsAppPhoneNumbers),
    purchaseWhatsAppPhoneNumber: this._bind(purchaseWhatsAppPhoneNumber),
    listWhatsAppNumberCountries: this._bind(listWhatsAppNumberCountries),
    searchAvailableWhatsAppNumbers: this._bind(searchAvailableWhatsAppNumbers),
    checkWhatsAppNumberAvailability: this._bind(checkWhatsAppNumberAvailability),
    getWhatsAppNumberKycForm: this._bind(getWhatsAppNumberKycForm),
    submitWhatsAppNumberKyc: this._bind(submitWhatsAppNumberKyc),
    uploadWhatsAppNumberKycDocument: this._bind(uploadWhatsAppNumberKycDocument),
    validateWhatsAppNumberKycAddress: this._bind(validateWhatsAppNumberKycAddress),
    createWhatsAppNumberKycLink: this._bind(createWhatsAppNumberKycLink),
    moveWhatsAppNumberToProfile: this._bind(moveWhatsAppNumberToProfile),
    getWhatsAppNumberRemediation: this._bind(getWhatsAppNumberRemediation),
    remediateWhatsAppNumber: this._bind(remediateWhatsAppNumber),
    getWhatsAppPhoneNumber: this._bind(getWhatsAppPhoneNumber),
    releaseWhatsAppPhoneNumber: this._bind(releaseWhatsAppPhoneNumber),
  };

  /**
   * phonenumbers API
   */
  phonenumbers = {
    listPhoneNumbers: this._bind(listPhoneNumbers),
    getPhoneNumber: this._bind(getPhoneNumber),
    releasePhoneNumber: this._bind(releasePhoneNumber),
    purchasePhoneNumber: this._bind(purchasePhoneNumber),
    listPhoneNumberCountries: this._bind(listPhoneNumberCountries),
    searchAvailablePhoneNumbers: this._bind(searchAvailablePhoneNumbers),
    checkPhoneNumberAvailability: this._bind(checkPhoneNumberAvailability),
    getPhoneNumberKycForm: this._bind(getPhoneNumberKycForm),
    submitPhoneNumberKyc: this._bind(submitPhoneNumberKyc),
    viewPhoneNumberKycDocument: this._bind(viewPhoneNumberKycDocument),
    uploadPhoneNumberKycDocument: this._bind(uploadPhoneNumberKycDocument),
    validatePhoneNumberKycAddress: this._bind(validatePhoneNumberKycAddress),
    createPhoneNumberKycLink: this._bind(createPhoneNumberKycLink),
    createPhoneNumberPortIn: this._bind(createPhoneNumberPortIn),
    listPhoneNumberPortIns: this._bind(listPhoneNumberPortIns),
    checkPhoneNumberPortability: this._bind(checkPhoneNumberPortability),
    uploadPhoneNumberPortInDocument: this._bind(uploadPhoneNumberPortInDocument),
    getPhoneNumberPortInRequirements: this._bind(getPhoneNumberPortInRequirements),
    getPhoneNumberPortInOrderRequirements: this._bind(getPhoneNumberPortInOrderRequirements),
    cancelPhoneNumberPortIn: this._bind(cancelPhoneNumberPortIn),
    reviewPhoneNumberKycPacket: this._bind(reviewPhoneNumberKycPacket),
    getPhoneNumberRemediation: this._bind(getPhoneNumberRemediation),
    remediatePhoneNumber: this._bind(remediatePhoneNumber),
    replyToPhoneNumberReviewer: this._bind(replyToPhoneNumberReviewer),
    respondToPhoneNumberReviewer: this._bind(respondToPhoneNumberReviewer),
    createPhoneNumberStockWatch: this._bind(createPhoneNumberStockWatch),
    listPhoneNumberStockWatches: this._bind(listPhoneNumberStockWatches),
    deletePhoneNumberStockWatch: this._bind(deletePhoneNumberStockWatch),
  };

  /**
   * whatsappsandbox API
   */
  whatsappsandbox = {
    listWhatsAppSandboxSessions: this._bind(listWhatsAppSandboxSessions),
    createWhatsAppSandboxSession: this._bind(createWhatsAppSandboxSession),
    deleteWhatsAppSandboxSession: this._bind(deleteWhatsAppSandboxSession),
  };

  /**
   * whatsappflows API
   */
  whatsappflows = {
    listWhatsAppFlows: this._bind(listWhatsAppFlows),
    createWhatsAppFlow: this._bind(createWhatsAppFlow),
    getWhatsAppFlow: this._bind(getWhatsAppFlow),
    updateWhatsAppFlow: this._bind(updateWhatsAppFlow),
    deleteWhatsAppFlow: this._bind(deleteWhatsAppFlow),
    getWhatsAppFlowJson: this._bind(getWhatsAppFlowJson),
    uploadWhatsAppFlowJson: this._bind(uploadWhatsAppFlowJson),
    getWhatsAppFlowPreview: this._bind(getWhatsAppFlowPreview),
    listWhatsAppFlowVersions: this._bind(listWhatsAppFlowVersions),
    publishWhatsAppFlow: this._bind(publishWhatsAppFlow),
    deprecateWhatsAppFlow: this._bind(deprecateWhatsAppFlow),
    getWhatsAppFlowsEncryptionKey: this._bind(getWhatsAppFlowsEncryptionKey),
    setWhatsAppFlowsEncryptionKey: this._bind(setWhatsAppFlowsEncryptionKey),
    sendWhatsAppFlowMessage: this._bind(sendWhatsAppFlowMessage),
    listWhatsAppFlowResponses: this._bind(listWhatsAppFlowResponses),
  };

  /**
   * contacts API
   */
  contacts = {
    listContacts: this._bind(listContacts),
    createContact: this._bind(createContact),
    getContact: this._bind(getContact),
    updateContact: this._bind(updateContact),
    deleteContact: this._bind(deleteContact),
    getContactChannels: this._bind(getContactChannels),
    bulkCreateContacts: this._bind(bulkCreateContacts),
  };

  /**
   * customfields API
   */
  customfields = {
    setContactFieldValue: this._bind(setContactFieldValue),
    clearContactFieldValue: this._bind(clearContactFieldValue),
    listCustomFields: this._bind(listCustomFields),
    createCustomField: this._bind(createCustomField),
    updateCustomField: this._bind(updateCustomField),
    deleteCustomField: this._bind(deleteCustomField),
  };

  /**
   * broadcasts API
   */
  broadcasts = {
    listBroadcasts: this._bind(listBroadcasts),
    createBroadcast: this._bind(createBroadcast),
    getBroadcast: this._bind(getBroadcast),
    updateBroadcast: this._bind(updateBroadcast),
    deleteBroadcast: this._bind(deleteBroadcast),
    sendBroadcast: this._bind(sendBroadcast),
    scheduleBroadcast: this._bind(scheduleBroadcast),
    cancelBroadcast: this._bind(cancelBroadcast),
    listBroadcastRecipients: this._bind(listBroadcastRecipients),
    addBroadcastRecipients: this._bind(addBroadcastRecipients),
  };

  /**
   * workflows API
   */
  workflows = {
    listWorkflows: this._bind(listWorkflows),
    createWorkflow: this._bind(createWorkflow),
    getWorkflow: this._bind(getWorkflow),
    updateWorkflow: this._bind(updateWorkflow),
    deleteWorkflow: this._bind(deleteWorkflow),
    activateWorkflow: this._bind(activateWorkflow),
    pauseWorkflow: this._bind(pauseWorkflow),
    listWorkflowExecutions: this._bind(listWorkflowExecutions),
    triggerWorkflow: this._bind(triggerWorkflow),
    listWorkflowExecutionEvents: this._bind(listWorkflowExecutionEvents),
    duplicateWorkflow: this._bind(duplicateWorkflow),
    listWorkflowVersions: this._bind(listWorkflowVersions),
    getWorkflowVersion: this._bind(getWorkflowVersion),
    restoreWorkflowVersion: this._bind(restoreWorkflowVersion),
  };

  /**
   * sequences API
   */
  sequences = {
    listSequences: this._bind(listSequences),
    createSequence: this._bind(createSequence),
    getSequence: this._bind(getSequence),
    updateSequence: this._bind(updateSequence),
    deleteSequence: this._bind(deleteSequence),
    activateSequence: this._bind(activateSequence),
    pauseSequence: this._bind(pauseSequence),
    enrollContacts: this._bind(enrollContacts),
    unenrollContact: this._bind(unenrollContact),
    listSequenceEnrollments: this._bind(listSequenceEnrollments),
  };

  /**
   * commentautomations API
   */
  commentautomations = {
    listCommentAutomations: this._bind(listCommentAutomations),
    createCommentAutomation: this._bind(createCommentAutomation),
    getCommentAutomation: this._bind(getCommentAutomation),
    updateCommentAutomation: this._bind(updateCommentAutomation),
    deleteCommentAutomation: this._bind(deleteCommentAutomation),
    listCommentAutomationLogs: this._bind(listCommentAutomationLogs),
  };

  /**
   * adcampaigns API
   */
  adcampaigns = {
    listAds: this._bind(listAds),
    listBidStrategies: this._bind(listBidStrategies),
    createBidStrategy: this._bind(createBidStrategy),
    updateBidStrategy: this._bind(updateBidStrategy),
    listAdKeywords: this._bind(listAdKeywords),
    addAdKeywords: this._bind(addAdKeywords),
    updateAdKeyword: this._bind(updateAdKeyword),
    removeAdKeyword: this._bind(removeAdKeyword),
    listAdCampaigns: this._bind(listAdCampaigns),
    createAdCampaign: this._bind(createAdCampaign),
    updateAdCampaignStatus: this._bind(updateAdCampaignStatus),
    getCampaignBidding: this._bind(getCampaignBidding),
    updateAdCampaign: this._bind(updateAdCampaign),
    deleteAdCampaign: this._bind(deleteAdCampaign),
    listCampaignNegativeKeywords: this._bind(listCampaignNegativeKeywords),
    replaceCampaignNegativeKeywords: this._bind(replaceCampaignNegativeKeywords),
    bulkUpdateAdCampaignStatus: this._bind(bulkUpdateAdCampaignStatus),
    duplicateAdCampaign: this._bind(duplicateAdCampaign),
    getCampaignTargeting: this._bind(getCampaignTargeting),
    updateCampaignTargeting: this._bind(updateCampaignTargeting),
    listAdSets: this._bind(listAdSets),
    createAdSet: this._bind(createAdSet),
    duplicateAdSet: this._bind(duplicateAdSet),
    duplicateAd: this._bind(duplicateAd),
    getAdSetDetails: this._bind(getAdSetDetails),
    updateAdSet: this._bind(updateAdSet),
    deleteAdSet: this._bind(deleteAdSet),
    updateAdSetStatus: this._bind(updateAdSetStatus),
    getAdTree: this._bind(getAdTree),
    getAdsTimeline: this._bind(getAdsTimeline),
    getAd: this._bind(getAd),
    updateAd: this._bind(updateAd),
    deleteAd: this._bind(deleteAd),
    updateAdStatus: this._bind(updateAdStatus),
    attachCampaignAssets: this._bind(attachCampaignAssets),
    boostPost: this._bind(boostPost),
    createStandaloneAd: this._bind(createStandaloneAd),
  };

  /**
   * adinsights API
   */
  adinsights = {
    getAdsSearchTerms: this._bind(getAdsSearchTerms),
    listLocalServicesLeads: this._bind(listLocalServicesLeads),
    listLocalServicesLeadConversations: this._bind(listLocalServicesLeadConversations),
    getCampaignAnalytics: this._bind(getCampaignAnalytics),
    generateKeywordIdeas: this._bind(generateKeywordIdeas),
    generateKeywordHistoricalMetrics: this._bind(generateKeywordHistoricalMetrics),
    queryAdInsights: this._bind(queryAdInsights),
    createAdInsightsReport: this._bind(createAdInsightsReport),
    getAdInsightsReport: this._bind(getAdInsightsReport),
    getAdAnalytics: this._bind(getAdAnalytics),
  };

  /**
   * adcreatives API
   */
  adcreatives = {
    generateAdPreviews: this._bind(generateAdPreviews),
    getAdPreviews: this._bind(getAdPreviews),
    getAdMedia: this._bind(getAdMedia),
    listAdCreatives: this._bind(listAdCreatives),
    createAdCreative: this._bind(createAdCreative),
    getAdCreative: this._bind(getAdCreative),
    updateAdCreative: this._bind(updateAdCreative),
    deleteAdCreative: this._bind(deleteAdCreative),
    uploadAdImage: this._bind(uploadAdImage),
    listAdImages: this._bind(listAdImages),
    uploadAdVideo: this._bind(uploadAdVideo),
    listAdVideos: this._bind(listAdVideos),
    deleteAdVideo: this._bind(deleteAdVideo),
    listAdCatalogs: this._bind(listAdCatalogs),
    listAdCatalogProductSets: this._bind(listAdCatalogProductSets),
  };

  /**
   * trackingtags API
   */
  trackingtags = {
    getAdTrackingTags: this._bind(getAdTrackingTags),
    updateAdTrackingTags: this._bind(updateAdTrackingTags),
    listTrackingTags: this._bind(listTrackingTags),
    createTrackingTag: this._bind(createTrackingTag),
    getTrackingTag: this._bind(getTrackingTag),
    updateTrackingTag: this._bind(updateTrackingTag),
    listTrackingTagSharedAccounts: this._bind(listTrackingTagSharedAccounts),
    addTrackingTagSharedAccount: this._bind(addTrackingTagSharedAccount),
    removeTrackingTagSharedAccount: this._bind(removeTrackingTagSharedAccount),
    getTrackingTagStats: this._bind(getTrackingTagStats),
  };

  /**
   * adaccounts API
   */
  adaccounts = {
    getAdComments: this._bind(getAdComments),
    listAdsBusinessCenters: this._bind(listAdsBusinessCenters),
    getAdsActivityLog: this._bind(getAdsActivityLog),
    listAdStudies: this._bind(listAdStudies),
    listMetaBusinesses: this._bind(listMetaBusinesses),
    listAdLabels: this._bind(listAdLabels),
    listHighDemandPeriods: this._bind(listHighDemandPeriods),
    createHighDemandPeriod: this._bind(createHighDemandPeriod),
    listValueRuleSets: this._bind(listValueRuleSets),
    createValueRuleSet: this._bind(createValueRuleSet),
    getValueRuleSet: this._bind(getValueRuleSet),
    updateValueRuleSet: this._bind(updateValueRuleSet),
    deleteValueRuleSet: this._bind(deleteValueRuleSet),
    listAccountCallouts: this._bind(listAccountCallouts),
    addAccountCallouts: this._bind(addAccountCallouts),
    removeAccountCallout: this._bind(removeAccountCallout),
    getAdAccountFinance: this._bind(getAdAccountFinance),
    listAdAccounts: this._bind(listAdAccounts),
    updateAdAccount: this._bind(updateAdAccount),
    getDsaDefaults: this._bind(getDsaDefaults),
    getDsaRecommendations: this._bind(getDsaRecommendations),
    listCustomConversions: this._bind(listCustomConversions),
    createCustomConversion: this._bind(createCustomConversion),
  };

  /**
   * reachandfrequency API
   */
  reachandfrequency = {
    createRfPrediction: this._bind(createRfPrediction),
    getRfPrediction: this._bind(getRfPrediction),
    cancelRfReservation: this._bind(cancelRfReservation),
    reserveRfPrediction: this._bind(reserveRfPrediction),
  };

  /**
   * leadgen API
   */
  leadgen = {
    listLeads: this._bind(listLeads),
    listLeadForms: this._bind(listLeadForms),
    createLeadForm: this._bind(createLeadForm),
    getLeadForm: this._bind(getLeadForm),
    archiveLeadForm: this._bind(archiveLeadForm),
    listFormLeads: this._bind(listFormLeads),
    createTestLead: this._bind(createTestLead),
  };

  /**
   * adtargeting API
   */
  adtargeting = {
    searchAdInterests: this._bind(searchAdInterests),
    searchAdTargeting: this._bind(searchAdTargeting),
    estimateAdReach: this._bind(estimateAdReach),
    getLinkedInBidPricing: this._bind(getLinkedInBidPricing),
    getLinkedInSupplyForecast: this._bind(getLinkedInSupplyForecast),
  };

  /**
   * adlibrary API
   */
  adlibrary = {
    searchAdLibrary: this._bind(searchAdLibrary),
  };

  /**
   * adaudiences API
   */
  adaudiences = {
    listAdAudiences: this._bind(listAdAudiences),
    createAdAudience: this._bind(createAdAudience),
    getAdAudience: this._bind(getAdAudience),
    updateAdAudience: this._bind(updateAdAudience),
    deleteAdAudience: this._bind(deleteAdAudience),
    addUsersToAdAudience: this._bind(addUsersToAdAudience),
    replaceAdAudienceCompanies: this._bind(replaceAdAudienceCompanies),
  };

  /**
   * conversions API
   */
  conversions = {
    getConversionsQuality: this._bind(getConversionsQuality),
    sendConversions: this._bind(sendConversions),
    adjustConversions: this._bind(adjustConversions),
    listConversionActions: this._bind(listConversionActions),
    createConversionAction: this._bind(createConversionAction),
    listConversionDestinations: this._bind(listConversionDestinations),
    createConversionDestination: this._bind(createConversionDestination),
    getConversionDestination: this._bind(getConversionDestination),
    updateConversionDestination: this._bind(updateConversionDestination),
    deleteConversionDestination: this._bind(deleteConversionDestination),
    listConversionAssociations: this._bind(listConversionAssociations),
    addConversionAssociations: this._bind(addConversionAssociations),
    removeConversionAssociations: this._bind(removeConversionAssociations),
    getConversionMetrics: this._bind(getConversionMetrics),
  };

  /**
   * messagingads API
   */
  messagingads = {
    createMessagingAd: this._bind(createMessagingAd),
    createCallAd: this._bind(createCallAd),
    createCtwaAd: this._bind(createCtwaAd),
  };

  /**
   * businessagent API
   */
  businessagent = {
    getBusinessAgentStatus: this._bind(getBusinessAgentStatus),
    onboardBusinessAgent: this._bind(onboardBusinessAgent),
    listBusinessAgentSettings: this._bind(listBusinessAgentSettings),
    updateBusinessAgentSettings: this._bind(updateBusinessAgentSettings),
    listBusinessAgentAllowlist: this._bind(listBusinessAgentAllowlist),
    addBusinessAgentAllowlistEntry: this._bind(addBusinessAgentAllowlistEntry),
    removeBusinessAgentAllowlistEntry: this._bind(removeBusinessAgentAllowlistEntry),
    getBusinessAgentBusinessInformation: this._bind(getBusinessAgentBusinessInformation),
    replaceBusinessAgentBusinessInformation: this._bind(replaceBusinessAgentBusinessInformation),
    resetBusinessAgentBusinessInformation: this._bind(resetBusinessAgentBusinessInformation),
    listBusinessAgentFaqs: this._bind(listBusinessAgentFaqs),
    createBusinessAgentFaq: this._bind(createBusinessAgentFaq),
    getBusinessAgentFaq: this._bind(getBusinessAgentFaq),
    updateBusinessAgentFaq: this._bind(updateBusinessAgentFaq),
    deleteBusinessAgentFaq: this._bind(deleteBusinessAgentFaq),
    listBusinessAgentWebsites: this._bind(listBusinessAgentWebsites),
    addBusinessAgentWebsite: this._bind(addBusinessAgentWebsite),
    getBusinessAgentWebsite: this._bind(getBusinessAgentWebsite),
    updateBusinessAgentWebsite: this._bind(updateBusinessAgentWebsite),
    deleteBusinessAgentWebsite: this._bind(deleteBusinessAgentWebsite),
    listBusinessAgentFiles: this._bind(listBusinessAgentFiles),
    uploadBusinessAgentFile: this._bind(uploadBusinessAgentFile),
    getBusinessAgentFile: this._bind(getBusinessAgentFile),
    deleteBusinessAgentFile: this._bind(deleteBusinessAgentFile),
    listBusinessAgentSkills: this._bind(listBusinessAgentSkills),
    createBusinessAgentSkill: this._bind(createBusinessAgentSkill),
    getBusinessAgentSkill: this._bind(getBusinessAgentSkill),
    updateBusinessAgentSkill: this._bind(updateBusinessAgentSkill),
    deleteBusinessAgentSkill: this._bind(deleteBusinessAgentSkill),
    listBusinessAgentUiSkills: this._bind(listBusinessAgentUiSkills),
    createBusinessAgentUiSkill: this._bind(createBusinessAgentUiSkill),
    getBusinessAgentUiSkill: this._bind(getBusinessAgentUiSkill),
    updateBusinessAgentUiSkill: this._bind(updateBusinessAgentUiSkill),
    deleteBusinessAgentUiSkill: this._bind(deleteBusinessAgentUiSkill),
    listBusinessAgentConnectors: this._bind(listBusinessAgentConnectors),
    createBusinessAgentConnector: this._bind(createBusinessAgentConnector),
    getBusinessAgentConnector: this._bind(getBusinessAgentConnector),
    updateBusinessAgentConnector: this._bind(updateBusinessAgentConnector),
    deleteBusinessAgentConnector: this._bind(deleteBusinessAgentConnector),
    setBusinessAgentConnectorCredentials: this._bind(setBusinessAgentConnectorCredentials),
    refreshBusinessAgentConnectorTools: this._bind(refreshBusinessAgentConnectorTools),
    getBusinessAgentConnectorLogs: this._bind(getBusinessAgentConnectorLogs),
    listBusinessAgentConnectorTools: this._bind(listBusinessAgentConnectorTools),
    createBusinessAgentConnectorTool: this._bind(createBusinessAgentConnectorTool),
    getBusinessAgentConnectorTool: this._bind(getBusinessAgentConnectorTool),
    updateBusinessAgentConnectorTool: this._bind(updateBusinessAgentConnectorTool),
    deleteBusinessAgentConnectorTool: this._bind(deleteBusinessAgentConnectorTool),
    runBusinessAgentConnectorTool: this._bind(runBusinessAgentConnectorTool),
    getBusinessAgentBudget: this._bind(getBusinessAgentBudget),
    replaceBusinessAgentBudget: this._bind(replaceBusinessAgentBudget),
    sendBusinessAgentTestMessage: this._bind(sendBusinessAgentTestMessage),
    sendBusinessAgentEvent: this._bind(sendBusinessAgentEvent),
    getBusinessAgentEvent: this._bind(getBusinessAgentEvent),
    readBusinessAgentEvals: this._bind(readBusinessAgentEvals),
    startBusinessAgentEvalRun: this._bind(startBusinessAgentEvalRun),
  };

  /**
   * blogs API
   */
  blogs = {
    listBlogs: this._bind(listBlogs),
    createBlog: this._bind(createBlog),
    getBlog: this._bind(getBlog),
    updateBlog: this._bind(updateBlog),
    deleteBlog: this._bind(deleteBlog),
    listBlogArticles: this._bind(listBlogArticles),
    createBlogArticle: this._bind(createBlogArticle),
    getBlogArticle: this._bind(getBlogArticle),
    updateBlogArticle: this._bind(updateBlogArticle),
    deleteBlogArticle: this._bind(deleteBlogArticle),
  };

  /**
   * verify API
   */
  verify = {
    createVerification: this._bind(createVerification),
    getVerification: this._bind(getVerification),
    checkVerification: this._bind(checkVerification),
  };

  /**
   * @deprecated The `ads` namespace has been split. Use one of these instead:
   * zernio.adcampaigns, zernio.adaccounts, zernio.adcreatives, zernio.adaudiences, zernio.adtargeting, zernio.adinsights, zernio.conversions, zernio.messagingads, zernio.reachandfrequency, zernio.leadgen, zernio.trackingtags.
   * This backward-compatibility alias will be removed in a future major version.
   */
  ads = {
    /** @deprecated Use `zernio.adcampaigns.listAds` instead. */
    listAds: this._bind(listAds),
    /** @deprecated Use `zernio.adcampaigns.listBidStrategies` instead. */
    listBidStrategies: this._bind(listBidStrategies),
    /** @deprecated Use `zernio.adcampaigns.createBidStrategy` instead. */
    createBidStrategy: this._bind(createBidStrategy),
    /** @deprecated Use `zernio.adcampaigns.updateBidStrategy` instead. */
    updateBidStrategy: this._bind(updateBidStrategy),
    /** @deprecated Use `zernio.adcampaigns.listAdKeywords` instead. */
    listAdKeywords: this._bind(listAdKeywords),
    /** @deprecated Use `zernio.adcampaigns.addAdKeywords` instead. */
    addAdKeywords: this._bind(addAdKeywords),
    /** @deprecated Use `zernio.adcampaigns.updateAdKeyword` instead. */
    updateAdKeyword: this._bind(updateAdKeyword),
    /** @deprecated Use `zernio.adcampaigns.removeAdKeyword` instead. */
    removeAdKeyword: this._bind(removeAdKeyword),
    /** @deprecated Use `zernio.adcampaigns.listAdCampaigns` instead. */
    listAdCampaigns: this._bind(listAdCampaigns),
    /** @deprecated Use `zernio.adcampaigns.createAdCampaign` instead. */
    createAdCampaign: this._bind(createAdCampaign),
    /** @deprecated Use `zernio.adcampaigns.updateAdCampaignStatus` instead. */
    updateAdCampaignStatus: this._bind(updateAdCampaignStatus),
    /** @deprecated Use `zernio.adcampaigns.getCampaignBidding` instead. */
    getCampaignBidding: this._bind(getCampaignBidding),
    /** @deprecated Use `zernio.adcampaigns.updateAdCampaign` instead. */
    updateAdCampaign: this._bind(updateAdCampaign),
    /** @deprecated Use `zernio.adcampaigns.deleteAdCampaign` instead. */
    deleteAdCampaign: this._bind(deleteAdCampaign),
    /** @deprecated Use `zernio.adcampaigns.listCampaignNegativeKeywords` instead. */
    listCampaignNegativeKeywords: this._bind(listCampaignNegativeKeywords),
    /** @deprecated Use `zernio.adcampaigns.replaceCampaignNegativeKeywords` instead. */
    replaceCampaignNegativeKeywords: this._bind(replaceCampaignNegativeKeywords),
    /** @deprecated Use `zernio.adcampaigns.bulkUpdateAdCampaignStatus` instead. */
    bulkUpdateAdCampaignStatus: this._bind(bulkUpdateAdCampaignStatus),
    /** @deprecated Use `zernio.adcampaigns.duplicateAdCampaign` instead. */
    duplicateAdCampaign: this._bind(duplicateAdCampaign),
    /** @deprecated Use `zernio.adcampaigns.getCampaignTargeting` instead. */
    getCampaignTargeting: this._bind(getCampaignTargeting),
    /** @deprecated Use `zernio.adcampaigns.updateCampaignTargeting` instead. */
    updateCampaignTargeting: this._bind(updateCampaignTargeting),
    /** @deprecated Use `zernio.adcampaigns.listAdSets` instead. */
    listAdSets: this._bind(listAdSets),
    /** @deprecated Use `zernio.adcampaigns.createAdSet` instead. */
    createAdSet: this._bind(createAdSet),
    /** @deprecated Use `zernio.adcampaigns.duplicateAdSet` instead. */
    duplicateAdSet: this._bind(duplicateAdSet),
    /** @deprecated Use `zernio.adcampaigns.duplicateAd` instead. */
    duplicateAd: this._bind(duplicateAd),
    /** @deprecated Use `zernio.adcampaigns.getAdSetDetails` instead. */
    getAdSetDetails: this._bind(getAdSetDetails),
    /** @deprecated Use `zernio.adcampaigns.updateAdSet` instead. */
    updateAdSet: this._bind(updateAdSet),
    /** @deprecated Use `zernio.adcampaigns.deleteAdSet` instead. */
    deleteAdSet: this._bind(deleteAdSet),
    /** @deprecated Use `zernio.adcampaigns.updateAdSetStatus` instead. */
    updateAdSetStatus: this._bind(updateAdSetStatus),
    /** @deprecated Use `zernio.adcampaigns.getAdTree` instead. */
    getAdTree: this._bind(getAdTree),
    /** @deprecated Use `zernio.adcampaigns.getAdsTimeline` instead. */
    getAdsTimeline: this._bind(getAdsTimeline),
    /** @deprecated Use `zernio.adcampaigns.getAd` instead. */
    getAd: this._bind(getAd),
    /** @deprecated Use `zernio.adcampaigns.updateAd` instead. */
    updateAd: this._bind(updateAd),
    /** @deprecated Use `zernio.adcampaigns.deleteAd` instead. */
    deleteAd: this._bind(deleteAd),
    /** @deprecated Use `zernio.adcampaigns.updateAdStatus` instead. */
    updateAdStatus: this._bind(updateAdStatus),
    /** @deprecated Use `zernio.adcampaigns.attachCampaignAssets` instead. */
    attachCampaignAssets: this._bind(attachCampaignAssets),
    /** @deprecated Use `zernio.adcampaigns.boostPost` instead. */
    boostPost: this._bind(boostPost),
    /** @deprecated Use `zernio.adcampaigns.createStandaloneAd` instead. */
    createStandaloneAd: this._bind(createStandaloneAd),
    /** @deprecated Use `zernio.adaccounts.getAdComments` instead. */
    getAdComments: this._bind(getAdComments),
    /** @deprecated Use `zernio.adaccounts.listAdsBusinessCenters` instead. */
    listAdsBusinessCenters: this._bind(listAdsBusinessCenters),
    /** @deprecated Use `zernio.adaccounts.getAdsActivityLog` instead. */
    getAdsActivityLog: this._bind(getAdsActivityLog),
    /** @deprecated Use `zernio.adaccounts.listAdStudies` instead. */
    listAdStudies: this._bind(listAdStudies),
    /** @deprecated Use `zernio.adaccounts.listMetaBusinesses` instead. */
    listMetaBusinesses: this._bind(listMetaBusinesses),
    /** @deprecated Use `zernio.adaccounts.listAdLabels` instead. */
    listAdLabels: this._bind(listAdLabels),
    /** @deprecated Use `zernio.adaccounts.listHighDemandPeriods` instead. */
    listHighDemandPeriods: this._bind(listHighDemandPeriods),
    /** @deprecated Use `zernio.adaccounts.createHighDemandPeriod` instead. */
    createHighDemandPeriod: this._bind(createHighDemandPeriod),
    /** @deprecated Use `zernio.adaccounts.listValueRuleSets` instead. */
    listValueRuleSets: this._bind(listValueRuleSets),
    /** @deprecated Use `zernio.adaccounts.createValueRuleSet` instead. */
    createValueRuleSet: this._bind(createValueRuleSet),
    /** @deprecated Use `zernio.adaccounts.getValueRuleSet` instead. */
    getValueRuleSet: this._bind(getValueRuleSet),
    /** @deprecated Use `zernio.adaccounts.updateValueRuleSet` instead. */
    updateValueRuleSet: this._bind(updateValueRuleSet),
    /** @deprecated Use `zernio.adaccounts.deleteValueRuleSet` instead. */
    deleteValueRuleSet: this._bind(deleteValueRuleSet),
    /** @deprecated Use `zernio.adaccounts.listAccountCallouts` instead. */
    listAccountCallouts: this._bind(listAccountCallouts),
    /** @deprecated Use `zernio.adaccounts.addAccountCallouts` instead. */
    addAccountCallouts: this._bind(addAccountCallouts),
    /** @deprecated Use `zernio.adaccounts.removeAccountCallout` instead. */
    removeAccountCallout: this._bind(removeAccountCallout),
    /** @deprecated Use `zernio.adaccounts.getAdAccountFinance` instead. */
    getAdAccountFinance: this._bind(getAdAccountFinance),
    /** @deprecated Use `zernio.adaccounts.listAdAccounts` instead. */
    listAdAccounts: this._bind(listAdAccounts),
    /** @deprecated Use `zernio.adaccounts.updateAdAccount` instead. */
    updateAdAccount: this._bind(updateAdAccount),
    /** @deprecated Use `zernio.adaccounts.getDsaDefaults` instead. */
    getDsaDefaults: this._bind(getDsaDefaults),
    /** @deprecated Use `zernio.adaccounts.getDsaRecommendations` instead. */
    getDsaRecommendations: this._bind(getDsaRecommendations),
    /** @deprecated Use `zernio.adaccounts.listCustomConversions` instead. */
    listCustomConversions: this._bind(listCustomConversions),
    /** @deprecated Use `zernio.adaccounts.createCustomConversion` instead. */
    createCustomConversion: this._bind(createCustomConversion),
    /** @deprecated Use `zernio.adcreatives.generateAdPreviews` instead. */
    generateAdPreviews: this._bind(generateAdPreviews),
    /** @deprecated Use `zernio.adcreatives.getAdPreviews` instead. */
    getAdPreviews: this._bind(getAdPreviews),
    /** @deprecated Use `zernio.adcreatives.getAdMedia` instead. */
    getAdMedia: this._bind(getAdMedia),
    /** @deprecated Use `zernio.adcreatives.listAdCreatives` instead. */
    listAdCreatives: this._bind(listAdCreatives),
    /** @deprecated Use `zernio.adcreatives.createAdCreative` instead. */
    createAdCreative: this._bind(createAdCreative),
    /** @deprecated Use `zernio.adcreatives.getAdCreative` instead. */
    getAdCreative: this._bind(getAdCreative),
    /** @deprecated Use `zernio.adcreatives.updateAdCreative` instead. */
    updateAdCreative: this._bind(updateAdCreative),
    /** @deprecated Use `zernio.adcreatives.deleteAdCreative` instead. */
    deleteAdCreative: this._bind(deleteAdCreative),
    /** @deprecated Use `zernio.adcreatives.uploadAdImage` instead. */
    uploadAdImage: this._bind(uploadAdImage),
    /** @deprecated Use `zernio.adcreatives.listAdImages` instead. */
    listAdImages: this._bind(listAdImages),
    /** @deprecated Use `zernio.adcreatives.uploadAdVideo` instead. */
    uploadAdVideo: this._bind(uploadAdVideo),
    /** @deprecated Use `zernio.adcreatives.listAdVideos` instead. */
    listAdVideos: this._bind(listAdVideos),
    /** @deprecated Use `zernio.adcreatives.deleteAdVideo` instead. */
    deleteAdVideo: this._bind(deleteAdVideo),
    /** @deprecated Use `zernio.adcreatives.listAdCatalogs` instead. */
    listAdCatalogs: this._bind(listAdCatalogs),
    /** @deprecated Use `zernio.adcreatives.listAdCatalogProductSets` instead. */
    listAdCatalogProductSets: this._bind(listAdCatalogProductSets),
    /** @deprecated Use `zernio.adaudiences.listAdAudiences` instead. */
    listAdAudiences: this._bind(listAdAudiences),
    /** @deprecated Use `zernio.adaudiences.createAdAudience` instead. */
    createAdAudience: this._bind(createAdAudience),
    /** @deprecated Use `zernio.adaudiences.getAdAudience` instead. */
    getAdAudience: this._bind(getAdAudience),
    /** @deprecated Use `zernio.adaudiences.updateAdAudience` instead. */
    updateAdAudience: this._bind(updateAdAudience),
    /** @deprecated Use `zernio.adaudiences.deleteAdAudience` instead. */
    deleteAdAudience: this._bind(deleteAdAudience),
    /** @deprecated Use `zernio.adaudiences.addUsersToAdAudience` instead. */
    addUsersToAdAudience: this._bind(addUsersToAdAudience),
    /** @deprecated Use `zernio.adaudiences.replaceAdAudienceCompanies` instead. */
    replaceAdAudienceCompanies: this._bind(replaceAdAudienceCompanies),
    /** @deprecated Use `zernio.adtargeting.searchAdInterests` instead. */
    searchAdInterests: this._bind(searchAdInterests),
    /** @deprecated Use `zernio.adtargeting.searchAdTargeting` instead. */
    searchAdTargeting: this._bind(searchAdTargeting),
    /** @deprecated Use `zernio.adtargeting.estimateAdReach` instead. */
    estimateAdReach: this._bind(estimateAdReach),
    /** @deprecated Use `zernio.adtargeting.getLinkedInBidPricing` instead. */
    getLinkedInBidPricing: this._bind(getLinkedInBidPricing),
    /** @deprecated Use `zernio.adtargeting.getLinkedInSupplyForecast` instead. */
    getLinkedInSupplyForecast: this._bind(getLinkedInSupplyForecast),
    /** @deprecated Use `zernio.adinsights.getAdsSearchTerms` instead. */
    getAdsSearchTerms: this._bind(getAdsSearchTerms),
    /** @deprecated Use `zernio.adinsights.listLocalServicesLeads` instead. */
    listLocalServicesLeads: this._bind(listLocalServicesLeads),
    /** @deprecated Use `zernio.adinsights.listLocalServicesLeadConversations` instead. */
    listLocalServicesLeadConversations: this._bind(listLocalServicesLeadConversations),
    /** @deprecated Use `zernio.adinsights.getCampaignAnalytics` instead. */
    getCampaignAnalytics: this._bind(getCampaignAnalytics),
    /** @deprecated Use `zernio.adinsights.generateKeywordIdeas` instead. */
    generateKeywordIdeas: this._bind(generateKeywordIdeas),
    /** @deprecated Use `zernio.adinsights.generateKeywordHistoricalMetrics` instead. */
    generateKeywordHistoricalMetrics: this._bind(generateKeywordHistoricalMetrics),
    /** @deprecated Use `zernio.adinsights.queryAdInsights` instead. */
    queryAdInsights: this._bind(queryAdInsights),
    /** @deprecated Use `zernio.adinsights.createAdInsightsReport` instead. */
    createAdInsightsReport: this._bind(createAdInsightsReport),
    /** @deprecated Use `zernio.adinsights.getAdInsightsReport` instead. */
    getAdInsightsReport: this._bind(getAdInsightsReport),
    /** @deprecated Use `zernio.adinsights.getAdAnalytics` instead. */
    getAdAnalytics: this._bind(getAdAnalytics),
    /** @deprecated Use `zernio.conversions.getConversionsQuality` instead. */
    getConversionsQuality: this._bind(getConversionsQuality),
    /** @deprecated Use `zernio.conversions.sendConversions` instead. */
    sendConversions: this._bind(sendConversions),
    /** @deprecated Use `zernio.conversions.adjustConversions` instead. */
    adjustConversions: this._bind(adjustConversions),
    /** @deprecated Use `zernio.conversions.listConversionActions` instead. */
    listConversionActions: this._bind(listConversionActions),
    /** @deprecated Use `zernio.conversions.createConversionAction` instead. */
    createConversionAction: this._bind(createConversionAction),
    /** @deprecated Use `zernio.conversions.listConversionDestinations` instead. */
    listConversionDestinations: this._bind(listConversionDestinations),
    /** @deprecated Use `zernio.conversions.createConversionDestination` instead. */
    createConversionDestination: this._bind(createConversionDestination),
    /** @deprecated Use `zernio.conversions.getConversionDestination` instead. */
    getConversionDestination: this._bind(getConversionDestination),
    /** @deprecated Use `zernio.conversions.updateConversionDestination` instead. */
    updateConversionDestination: this._bind(updateConversionDestination),
    /** @deprecated Use `zernio.conversions.deleteConversionDestination` instead. */
    deleteConversionDestination: this._bind(deleteConversionDestination),
    /** @deprecated Use `zernio.conversions.listConversionAssociations` instead. */
    listConversionAssociations: this._bind(listConversionAssociations),
    /** @deprecated Use `zernio.conversions.addConversionAssociations` instead. */
    addConversionAssociations: this._bind(addConversionAssociations),
    /** @deprecated Use `zernio.conversions.removeConversionAssociations` instead. */
    removeConversionAssociations: this._bind(removeConversionAssociations),
    /** @deprecated Use `zernio.conversions.getConversionMetrics` instead. */
    getConversionMetrics: this._bind(getConversionMetrics),
    /** @deprecated Use `zernio.messagingads.createMessagingAd` instead. */
    createMessagingAd: this._bind(createMessagingAd),
    /** @deprecated Use `zernio.messagingads.createCallAd` instead. */
    createCallAd: this._bind(createCallAd),
    /** @deprecated Use `zernio.messagingads.createCtwaAd` instead. */
    createCtwaAd: this._bind(createCtwaAd),
    /** @deprecated Use `zernio.reachandfrequency.createRfPrediction` instead. */
    createRfPrediction: this._bind(createRfPrediction),
    /** @deprecated Use `zernio.reachandfrequency.getRfPrediction` instead. */
    getRfPrediction: this._bind(getRfPrediction),
    /** @deprecated Use `zernio.reachandfrequency.cancelRfReservation` instead. */
    cancelRfReservation: this._bind(cancelRfReservation),
    /** @deprecated Use `zernio.reachandfrequency.reserveRfPrediction` instead. */
    reserveRfPrediction: this._bind(reserveRfPrediction),
    /** @deprecated Use `zernio.leadgen.listLeads` instead. */
    listLeads: this._bind(listLeads),
    /** @deprecated Use `zernio.leadgen.listLeadForms` instead. */
    listLeadForms: this._bind(listLeadForms),
    /** @deprecated Use `zernio.leadgen.createLeadForm` instead. */
    createLeadForm: this._bind(createLeadForm),
    /** @deprecated Use `zernio.leadgen.getLeadForm` instead. */
    getLeadForm: this._bind(getLeadForm),
    /** @deprecated Use `zernio.leadgen.archiveLeadForm` instead. */
    archiveLeadForm: this._bind(archiveLeadForm),
    /** @deprecated Use `zernio.leadgen.listFormLeads` instead. */
    listFormLeads: this._bind(listFormLeads),
    /** @deprecated Use `zernio.leadgen.createTestLead` instead. */
    createTestLead: this._bind(createTestLead),
    /** @deprecated Use `zernio.trackingtags.getAdTrackingTags` instead. */
    getAdTrackingTags: this._bind(getAdTrackingTags),
    /** @deprecated Use `zernio.trackingtags.updateAdTrackingTags` instead. */
    updateAdTrackingTags: this._bind(updateAdTrackingTags),
    /** @deprecated Use `zernio.trackingtags.listTrackingTags` instead. */
    listTrackingTags: this._bind(listTrackingTags),
    /** @deprecated Use `zernio.trackingtags.createTrackingTag` instead. */
    createTrackingTag: this._bind(createTrackingTag),
    /** @deprecated Use `zernio.trackingtags.getTrackingTag` instead. */
    getTrackingTag: this._bind(getTrackingTag),
    /** @deprecated Use `zernio.trackingtags.updateTrackingTag` instead. */
    updateTrackingTag: this._bind(updateTrackingTag),
    /** @deprecated Use `zernio.trackingtags.listTrackingTagSharedAccounts` instead. */
    listTrackingTagSharedAccounts: this._bind(listTrackingTagSharedAccounts),
    /** @deprecated Use `zernio.trackingtags.addTrackingTagSharedAccount` instead. */
    addTrackingTagSharedAccount: this._bind(addTrackingTagSharedAccount),
    /** @deprecated Use `zernio.trackingtags.removeTrackingTagSharedAccount` instead. */
    removeTrackingTagSharedAccount: this._bind(removeTrackingTagSharedAccount),
    /** @deprecated Use `zernio.trackingtags.getTrackingTagStats` instead. */
    getTrackingTagStats: this._bind(getTrackingTagStats),
  };

  /**
   * Create a new Zernio API client.
   *
   * @param options - Configuration options for the client
   */
  constructor(options: ClientOptions = {}) {
    // Check ZERNIO_API_KEY first, fall back to LATE_API_KEY for backwards compatibility
    const apiKey = options.apiKey ?? process.env['ZERNIO_API_KEY'] ?? process.env['LATE_API_KEY'];

    if (!apiKey) {
      throw new ZernioApiError(
        "The ZERNIO_API_KEY environment variable is missing or empty; either provide it, or instantiate the Zernio client with an apiKey option, like new Zernio({ apiKey: 'sk_...' }). LATE_API_KEY is also supported for backwards compatibility.",
        401,
        'missing_api_key'
      );
    }

    this.apiKey = apiKey;
    this.baseURL = options.baseURL ?? 'https://zernio.com/api';
    this._options = options;

    // One client per instance. Interceptors used to be registered on the
    // module-global client, so every `new Zernio()` stacked another auth
    // interceptor on the same shared client and the last-constructed key won
    // for ALL in-flight requests — one tenant's call could carry another
    // tenant's token. User-Agent and defaultHeaders are applied at config time
    // (not via the interceptor) because Node 20's undici treats User-Agent as a
    // forbidden header on already-constructed Request objects, silently
    // dropping `headers.set('User-Agent', …)`.
    this._client = createClient(
      createConfig({
        baseUrl: this.baseURL,
        headers: {
          'User-Agent': `zernio-node/${packageJson.version}`,
          ...(options.defaultHeaders ?? {}),
        },
      })
    );

    // Deno / WinterCG compatibility: operations dispatch through a wrapper
    // that strips the `client` selector from request options (see
    // `_stripClientSelector`).
    this._dispatchClient = Zernio._stripClientSelector(this._client);

    // Add auth interceptor
    this._client.interceptors.request.use((request) => {
      request.headers.set('Authorization', `Bearer ${this.apiKey}`);
      return request;
    });

    // Add error handling interceptor
    this._client.interceptors.response.use(async (response) => {
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

/** @deprecated Use Zernio instead */
export const Late = Zernio;

// Default export for convenient usage
export default Zernio;
