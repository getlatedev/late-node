<p align="center">
  <a href="https://zernio.com">
    <img src="https://zernio.com/brand/icon-primary.png" alt="Zernio" width="60">
  </a>
</p>

<h1 align="center">Zernio Node.js SDK</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@zernio/node"><img src="https://img.shields.io/npm/v/@zernio/node.svg" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-blue.svg" alt="License"></a>
</p>

<p align="center">
  <strong>One API to post everywhere. 16 platforms, zero headaches.</strong>
</p>

The official Node.js SDK for the [Zernio API](https://zernio.com) — schedule and publish social media posts across Instagram, TikTok, YouTube, LinkedIn, X/Twitter, Facebook, Pinterest, Threads, Bluesky, Reddit, Snapchat, Telegram, WhatsApp, and Google Business Profile with a single integration.

## Installation

```bash
npm install @zernio/node
```

## Quick Start

```typescript
import Zernio from '@zernio/node';

const zernio = new Zernio(); // Uses ZERNIO_API_KEY env var

// Publish to multiple platforms with one call
const { data: post } = await zernio.posts.createPost({
  body: {
    content: 'Hello world from Zernio!',
    platforms: [
      { platform: 'twitter', accountId: 'acc_xxx' },
      { platform: 'linkedin', accountId: 'acc_yyy' },
      { platform: 'instagram', accountId: 'acc_zzz' },
    ],
    publishNow: true,
  },
});

console.log(`Published to ${post.platforms.length} platforms!`);
```

## Configuration

```typescript
const zernio = new Zernio({
  apiKey: 'your-api-key', // Defaults to process.env['ZERNIO_API_KEY']
  baseURL: 'https://zernio.com/api',
  timeout: 60000,
});
```

## Examples

### Schedule a Post

```typescript
const { data: post } = await zernio.posts.createPost({
  body: {
    content: 'This post will go live tomorrow at 10am',
    platforms: [{ platform: 'instagram', accountId: 'acc_xxx' }],
    scheduledFor: '2025-02-01T10:00:00Z',
  },
});
```

### Platform-Specific Content

Customize content per platform while posting to all at once:

```typescript
const { data: post } = await zernio.posts.createPost({
  body: {
    content: 'Default content',
    platforms: [
      {
        platform: 'twitter',
        accountId: 'acc_twitter',
        platformSpecificContent: 'Short & punchy for X',
      },
      {
        platform: 'linkedin',
        accountId: 'acc_linkedin',
        platformSpecificContent: 'Professional tone for LinkedIn with more detail.',
      },
    ],
    publishNow: true,
  },
});
```

### Upload Media

```typescript
// 1. Get presigned upload URL
const { data: presign } = await zernio.media.getMediaPresignedUrl({
  body: { filename: 'video.mp4', contentType: 'video/mp4' },
});

// 2. Upload your file
await fetch(presign.uploadUrl, {
  method: 'PUT',
  body: videoBuffer,
  headers: { 'Content-Type': 'video/mp4' },
});

// 3. Create post with media
const { data: post } = await zernio.posts.createPost({
  body: {
    content: 'Check out this video!',
    mediaUrls: [presign.publicUrl],
    platforms: [
      { platform: 'tiktok', accountId: 'acc_xxx' },
      { platform: 'youtube', accountId: 'acc_yyy', youtubeTitle: 'My Video' },
    ],
    publishNow: true,
  },
});
```

### Get Analytics

```typescript
const { data } = await zernio.analytics.getAnalytics({
  query: { postId: 'post_xxx' },
});

console.log('Views:', data.analytics.views);
console.log('Likes:', data.analytics.likes);
console.log('Engagement Rate:', data.analytics.engagementRate);
```

### List Connected Accounts

```typescript
const { data } = await zernio.accounts.listAccounts();

for (const account of data.accounts) {
  console.log(`${account.platform}: @${account.username}`);
}
```

## Error Handling

```typescript
import Zernio, { ZernioApiError, RateLimitError, ValidationError } from '@zernio/node';

try {
  await zernio.posts.createPost({ body: { /* ... */ } });
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry in ${error.getSecondsUntilReset()}s`);
  } else if (error instanceof ValidationError) {
    console.log('Invalid request:', error.fields);
  } else if (error instanceof ZernioApiError) {
    console.log(`Error ${error.statusCode}: ${error.message}`);
  }
}
```

## SDK Reference

### Posts
| Method | Description |
|--------|-------------|
| `posts.listPosts()` | List posts |
| `posts.bulkUploadPosts()` | Bulk upload from CSV |
| `posts.createPost()` | Create post |
| `posts.getPost()` | Get post |
| `posts.updatePost()` | Update post |
| `posts.updatePostMetadata()` | Update post metadata |
| `posts.deletePost()` | Delete post |
| `posts.editPost()` | Edit published post |
| `posts.retryPost()` | Retry failed post |
| `posts.unpublishPost()` | Unpublish post |

### Accounts
| Method | Description |
|--------|-------------|
| `accounts.getAllAccountsHealth()` | Check accounts health |
| `accounts.listAccounts()` | List accounts |
| `accounts.getAccountHealth()` | Check account health |
| `accounts.getAccountPosts()` | List posts published on the platform |
| `accounts.getBlueskySettings()` | Get Bluesky account settings |
| `accounts.getFollowerStats()` | Get follower stats |
| `accounts.getGoogleBusinessReview()` | Get a review |
| `accounts.getGoogleBusinessReviews()` | Get reviews |
| `accounts.getInstagramFollowStatus()` | Check whether an Instagram user follows the account |
| `accounts.getLinkedInMentions()` | Resolve LinkedIn mention |
| `accounts.getSlackSettings()` | Get Slack account settings |
| `accounts.getTikTokCreatorInfo()` | Get TikTok creator info |
| `accounts.updateAccount()` | Update account |
| `accounts.updateBlueskySettings()` | Update Bluesky account settings |
| `accounts.updateSlackSettings()` | Update Slack account settings |
| `accounts.deleteAccount()` | Disconnect account |
| `accounts.deleteGoogleBusinessReviewReply()` | Delete a review reply |
| `accounts.batchGetGoogleBusinessReviews()` | Batch get reviews |
| `accounts.moveAccountToProfile()` | Move account to another profile |
| `accounts.replyToGoogleBusinessReview()` | Reply to a review |

### Profiles
| Method | Description |
|--------|-------------|
| `profiles.listProfiles()` | List profiles |
| `profiles.createProfile()` | Create profile |
| `profiles.getProfile()` | Get profile |
| `profiles.updateProfile()` | Update profile |
| `profiles.deleteProfile()` | Delete profile |

### Analytics
| Method | Description |
|--------|-------------|
| `analytics.getAnalytics()` | Get post analytics |
| `analytics.getAnalyticsDelta()` | Analytics changed since a cursor |
| `analytics.getBestTimeToPost()` | Get best times to post |
| `analytics.getContentDecay()` | Get content performance decay |
| `analytics.getDailyMetrics()` | Get daily aggregated metrics |
| `analytics.getFacebookPageInsights()` | Get Facebook Page insights |
| `analytics.getFacebookPostEarnings()` | Get Facebook post monetization earnings |
| `analytics.getFacebookPostReactions()` | Get Facebook post reactions |
| `analytics.getGoogleBusinessPerformance()` | Get Google Business Profile performance metrics |
| `analytics.getGoogleBusinessSearchKeywords()` | Get Google Business Profile search keywords |
| `analytics.getInstagramAccountInsights()` | Get Instagram insights |
| `analytics.getInstagramDemographics()` | Get Instagram demographics |
| `analytics.getInstagramFollowerHistory()` | Get Instagram follower history |
| `analytics.getLinkedInAggregateAnalytics()` | Get LinkedIn aggregate stats |
| `analytics.getLinkedInOrgAggregateAnalytics()` | Get LinkedIn org analytics |
| `analytics.getLinkedInPostAnalytics()` | Get LinkedIn post stats |
| `analytics.getLinkedInPostReactions()` | Get LinkedIn post reactions |
| `analytics.getPostingFrequency()` | Get frequency vs engagement |
| `analytics.getPostTimeline()` | Get post analytics timeline |
| `analytics.getTikTokAccountInsights()` | Get TikTok account-level insights |
| `analytics.getYouTubeChannelInsights()` | Get YouTube channel insights |
| `analytics.getYouTubeDailyViews()` | Get YouTube daily views |
| `analytics.getYouTubeDemographics()` | Get YouTube demographics |
| `analytics.getYouTubeVideoRetention()` | Get YouTube video retention curve |
| `analytics.syncExternalPosts()` | Sync an external post |

### Account Groups
| Method | Description |
|--------|-------------|
| `accountGroups.listAccountGroups()` | List groups |
| `accountGroups.createAccountGroup()` | Create group |
| `accountGroups.updateAccountGroup()` | Update group |
| `accountGroups.deleteAccountGroup()` | Delete group |

### Queue
| Method | Description |
|--------|-------------|
| `queue.listQueueSlots()` | List schedules |
| `queue.createQueueSlot()` | Create schedule |
| `queue.getNextQueueSlot()` | Get next available slot |
| `queue.updateQueueSlot()` | Update schedule |
| `queue.deleteQueueSlot()` | Delete schedule |
| `queue.previewQueue()` | Preview upcoming slots |

### Webhooks
| Method | Description |
|--------|-------------|
| `webhooks.createWebhookSettings()` | Create webhook |
| `webhooks.getWebhookLogs()` | List webhook delivery logs |
| `webhooks.getWebhookSettings()` | List webhooks |
| `webhooks.updateWebhookSettings()` | Update webhook |
| `webhooks.deleteWebhookSettings()` | Delete webhook |
| `webhooks.redeliverWebhookEvent()` | Redeliver a webhook event |
| `webhooks.testWebhook()` | Send test webhook |

### API Keys
| Method | Description |
|--------|-------------|
| `apiKeys.listApiKeys()` | List keys |
| `apiKeys.createApiKey()` | Create key |
| `apiKeys.deleteApiKey()` | Delete key |
| `apiKeys.verifyCredential()` | Verify credential |

### Media
| Method | Description |
|--------|-------------|
| `media.getMediaPresignedUrl()` | Get upload URL |

### Users
| Method | Description |
|--------|-------------|
| `users.listUsers()` | List users |
| `users.getUser()` | Get user |

### Usage
| Method | Description |
|--------|-------------|
| `usage.getBilling()` | Account billing snapshot (plan, cycle, balance, caps, status) |
| `usage.getCallsUsage()` | Calling usage and cost |
| `usage.getSmsUsage()` | SMS usage (volumes) |
| `usage.getUsage()` | Usage snapshot (default) or billed-spend metering (with params) |
| `usage.getUsageStats()` | Get plan and usage snapshot (plan, limits, payment status) |
| `usage.getXApiPricing()` | Get X API pricing table |

### Logs
| Method | Description |
|--------|-------------|
| `logs.listLogs()` | List activity logs |

### Connect (OAuth)
| Method | Description |
|--------|-------------|
| `connect.listFacebookPages()` | List Facebook pages |
| `connect.listGoogleBusinessLocations()` | List Google Business Profile locations |
| `connect.listInstagramPages()` | List Pages with a linked Instagram account |
| `connect.listLinkedInOrganizations()` | List LinkedIn orgs |
| `connect.listPinterestBoardsForSelection()` | List Pinterest boards |
| `connect.listSlackChannels()` | List Slack channels for the channel picker |
| `connect.listSnapchatProfiles()` | List Snapchat profiles |
| `connect.listWhatsAppPhoneNumbers()` | List numbers for selection |
| `connect.createPinterestBoard()` | Create Pinterest board |
| `connect.getConnectUrl()` | Get OAuth connect URL |
| `connect.getFacebookPages()` | List Facebook pages |
| `connect.getGmbLocations()` | List Google Business Profile locations |
| `connect.getLinkedInOrganizations()` | List LinkedIn orgs |
| `connect.getPendingOAuthData()` | Get pending OAuth data |
| `connect.getPinterestBoards()` | List Pinterest boards |
| `connect.getRedditFlairs()` | List subreddit flairs |
| `connect.getRedditSubreddits()` | List Reddit subreddits |
| `connect.getShopifyConnectUrl()` | Get Shopify OAuth connect URL |
| `connect.getSubredditRules()` | Get subreddit rules |
| `connect.getTelegramConnectStatus()` | Generate Telegram code |
| `connect.getWhatsAppSdkConfig()` | Get Embedded Signup SDK config |
| `connect.getYoutubeCaptions()` | Get a YouTube video transcript |
| `connect.getYoutubePlaylists()` | List YouTube playlists |
| `connect.updateFacebookPage()` | Update Facebook page |
| `connect.updateGmbLocation()` | Update Google Business Profile location |
| `connect.updateLinkedInOrganization()` | Switch LinkedIn account type |
| `connect.updatePinterestBoards()` | Set default Pinterest board |
| `connect.updateRedditSubreddits()` | Set default subreddit |
| `connect.updateYoutubeDefaultPlaylist()` | Set default YouTube playlist |
| `connect.assignGoogleBusinessLocation()` | Assign Google Business Profile location to another profile |
| `connect.completeTelegramConnect()` | Check Telegram status |
| `connect.completeWhatsAppPhoneSelection()` | Complete number selection |
| `connect.configureTikTokAdsBrandIdentity()` | Set TikTok brand identity |
| `connect.connectAds()` | Connect ads for a platform |
| `connect.connectBlueskyCredentials()` | Connect Bluesky account |
| `connect.connectDiscordChannel()` | Connect a Discord channel |
| `connect.connectOpenAIAdsCredentials()` | Connect an OpenAI Ads account |
| `connect.connectShopifyWithToken()` | Connect a Shopify store with a custom-app Admin token |
| `connect.connectSlackChannel()` | Connect a Slack channel |
| `connect.connectWhatsAppCredentials()` | Connect WhatsApp via credentials |
| `connect.connectWhatsAppEmbeddedSignup()` | Connect WhatsApp from Embedded Signup |
| `connect.handleOAuthCallback()` | Complete OAuth callback |
| `connect.initiateTelegramConnect()` | Connect Telegram directly |
| `connect.selectFacebookPage()` | Select Facebook page |
| `connect.selectGoogleBusinessLocation()` | Select Google Business Profile location |
| `connect.selectInstagramAccount()` | Select the Page whose Instagram account to connect |
| `connect.selectLinkedInOrganization()` | Select LinkedIn org |
| `connect.selectPinterestBoard()` | Select Pinterest board |
| `connect.selectSnapchatProfile()` | Select Snapchat profile |
| `connect.setRedditPostFlair()` | Set Reddit post flair |
| `connect.voteRedditThing()` | Vote on a Reddit post or comment |

### Reddit
| Method | Description |
|--------|-------------|
| `reddit.getRedditFeed()` | Get subreddit feed |
| `reddit.searchReddit()` | Search posts |

### Account Settings
| Method | Description |
|--------|-------------|
| `accountSettings.getInstagramIceBreakers()` | Get IG ice breakers |
| `accountSettings.getMessengerMenu()` | Get FB persistent menu |
| `accountSettings.getTelegramCommands()` | Get TG bot commands |
| `accountSettings.deleteInstagramIceBreakers()` | Delete IG ice breakers |
| `accountSettings.deleteMessengerMenu()` | Delete FB persistent menu |
| `accountSettings.deleteTelegramCommands()` | Delete TG bot commands |
| `accountSettings.setInstagramIceBreakers()` | Set IG ice breakers |
| `accountSettings.setMessengerMenu()` | Set FB persistent menu |
| `accountSettings.setTelegramCommands()` | Set TG bot commands |

### Ad Accounts
| Method | Description |
|--------|-------------|
| `adAccounts.listAccountCallouts()` | List account callouts |
| `adAccounts.listAccountSitelinks()` | List account sitelinks |
| `adAccounts.listAccountStructuredSnippets()` | List account snippets |
| `adAccounts.listAdAccounts()` | List ad accounts |
| `adAccounts.listAdLabels()` | Ad labels |
| `adAccounts.listAdNegativeKeywordLists()` | List negative keyword lists |
| `adAccounts.listAdsBusinessCenters()` | List TikTok Business Centers |
| `adAccounts.listAdsInstagramAccounts()` | List Instagram ad identities |
| `adAccounts.listAdStudies()` | A/B tests and lift studies |
| `adAccounts.listAdvertisableApplications()` | List advertisable apps |
| `adAccounts.listCustomConversions()` | List custom conversions |
| `adAccounts.listHighDemandPeriods()` | High demand periods / budget schedules |
| `adAccounts.listMetaBusinesses()` | Businesses list |
| `adAccounts.listValueRuleSets()` | List value rule sets |
| `adAccounts.createAdAccount()` | Create Meta ad account |
| `adAccounts.createAdNegativeKeywordList()` | Create a negative keyword list |
| `adAccounts.createCustomConversion()` | Create or reuse a custom conversion |
| `adAccounts.createHighDemandPeriod()` | Schedule a budget increase |
| `adAccounts.createValueRuleSet()` | Create a value rule set |
| `adAccounts.getAdAccountFinance()` | Ad account finances |
| `adAccounts.getAdComments()` | List comments on an ad |
| `adAccounts.getAdNegativeKeywordList()` | Get a negative keyword list |
| `adAccounts.getAdsActivityLog()` | Ad account change / audit log |
| `adAccounts.getDsaDefaults()` | Get ad account DSA defaults |
| `adAccounts.getDsaRecommendations()` | List DSA beneficiary/payor suggestions |
| `adAccounts.getIosFourteenCampaignLimits()` | Get iOS 14 campaign limits |
| `adAccounts.getValueRuleSet()` | Read a value rule set |
| `adAccounts.updateAccountCallouts()` | Update account callouts |
| `adAccounts.updateAccountSitelinks()` | Update account sitelinks |
| `adAccounts.updateAccountStructuredSnippets()` | Update account snippets |
| `adAccounts.updateAdAccount()` | Update ad account settings |
| `adAccounts.updateAdNegativeKeywordList()` | Rename a negative keyword list |
| `adAccounts.updateValueRuleSet()` | Replace a value rule set |
| `adAccounts.deleteAdComment()` | Delete an ad comment |
| `adAccounts.deleteAdNegativeKeywordList()` | Delete a negative keyword list |
| `adAccounts.deleteValueRuleSet()` | Delete a value rule set |
| `adAccounts.addAccountCallouts()` | Add account callouts |
| `adAccounts.addAccountSitelinks()` | Add account sitelinks |
| `adAccounts.addAccountStructuredSnippets()` | Add account snippets |
| `adAccounts.hideAdComment()` | Hide or unhide an ad comment |
| `adAccounts.removeAccountCallout()` | Remove account callout |
| `adAccounts.removeAccountSitelink()` | Remove account sitelink |
| `adAccounts.removeAccountStructuredSnippet()` | Remove account snippet |
| `adAccounts.replaceAdNegativeKeywordListKeywords()` | Replace negative list keywords |
| `adAccounts.replyToAdComment()` | Reply to an ad comment |

### Ad Audiences
| Method | Description |
|--------|-------------|
| `adAudiences.listAdAudiences()` | List custom audiences |
| `adAudiences.createAdAudience()` | Create custom audience |
| `adAudiences.getAdAudience()` | Get audience details |
| `adAudiences.updateAdAudience()` | Update an audience |
| `adAudiences.deleteAdAudience()` | Delete custom audience |
| `adAudiences.addUsersToAdAudience()` | Add users to audience |
| `adAudiences.replaceAdAudienceCompanies()` | Replace audience companies |

### Ad Campaigns
| Method | Description |
|--------|-------------|
| `adCampaigns.listAdCampaigns()` | List campaigns |
| `adCampaigns.listAdGroupAssets()` | List ad-group assets |
| `adCampaigns.listAdKeywords()` | List Search keywords |
| `adCampaigns.listAds()` | List ads |
| `adCampaigns.listAdSets()` | List ad sets |
| `adCampaigns.listBidStrategies()` | List Google Ads portfolio bid strategies |
| `adCampaigns.listCampaignAssets()` | List campaign assets |
| `adCampaigns.listCampaignNegativeKeywordLists()` | List campaign negative lists |
| `adCampaigns.listCampaignNegativeKeywords()` | List campaign-level negative keywords |
| `adCampaigns.listGoogleAssetGroups()` | List Performance Max asset groups |
| `adCampaigns.bulkUpdateAdCampaignStatus()` | Pause or resume many campaigns |
| `adCampaigns.createAdCampaign()` | Create a standalone campaign |
| `adCampaigns.createAdSet()` | Create a standalone ad group |
| `adCampaigns.createBidStrategy()` | Create a Google Ads portfolio bid strategy |
| `adCampaigns.createStandaloneAd()` | Create standalone ad |
| `adCampaigns.getAd()` | Get ad details |
| `adCampaigns.getAdSetDetails()` | Live ad-set details incl. learning phase |
| `adCampaigns.getAdsTimeline()` | Get daily account metrics |
| `adCampaigns.getAdTree()` | Get campaign tree |
| `adCampaigns.getCampaignBidding()` | Read a campaign's current bidding |
| `adCampaigns.getCampaignTargeting()` | Read a Google campaign's device, location, and language targeting |
| `adCampaigns.updateAd()` | Update ad |
| `adCampaigns.updateAdCampaign()` | Update a campaign |
| `adCampaigns.updateAdCampaignStatus()` | Pause or resume a campaign |
| `adCampaigns.updateAdGroupAssets()` | Update ad-group assets |
| `adCampaigns.updateAdKeyword()` | Pause or enable a Search keyword |
| `adCampaigns.updateAdSet()` | Update an ad set |
| `adCampaigns.updateAdSetStatus()` | Pause or resume a single ad set |
| `adCampaigns.updateAdStatus()` | Pause or resume a single ad |
| `adCampaigns.updateBidStrategy()` | Update a Google Ads portfolio bid strategy |
| `adCampaigns.updateCampaignAssets()` | Update campaign assets |
| `adCampaigns.updateCampaignTargeting()` | Edit a Google campaign's device, location, or language targeting |
| `adCampaigns.deleteAd()` | Cancel an ad |
| `adCampaigns.deleteAdCampaign()` | Delete a campaign |
| `adCampaigns.deleteAdSet()` | Delete an ad set |
| `adCampaigns.addAdKeywords()` | Add Search keywords to an ad group |
| `adCampaigns.attachAdGroupAssets()` | Attach ad-group assets |
| `adCampaigns.attachCampaignAssets()` | Attach campaign assets |
| `adCampaigns.boostPost()` | Boost post as ad |
| `adCampaigns.duplicateAd()` | Duplicate an ad |
| `adCampaigns.duplicateAdCampaign()` | Duplicate a campaign |
| `adCampaigns.duplicateAdSet()` | Duplicate an ad set |
| `adCampaigns.removeAdGroupAssets()` | Remove ad-group assets |
| `adCampaigns.removeAdKeyword()` | Remove a Search keyword |
| `adCampaigns.removeCampaignAssets()` | Remove campaign assets |
| `adCampaigns.replaceCampaignNegativeKeywordLists()` | Replace campaign negative lists |
| `adCampaigns.replaceCampaignNegativeKeywords()` | Replace campaign-level negative keywords |

### Ad Creatives
| Method | Description |
|--------|-------------|
| `adCreatives.listAdCatalogProductSets()` | List a catalog's product sets |
| `adCreatives.listAdCatalogs()` | List Meta product catalogs |
| `adCreatives.listAdCreatives()` | Creative library |
| `adCreatives.listAdImages()` | Ad image library |
| `adCreatives.listAdVideos()` | Ad video library |
| `adCreatives.createAdCreative()` | Create a standalone creative |
| `adCreatives.getAdCreative()` | Creative details |
| `adCreatives.getAdMedia()` | Direct video and image URLs for an ad |
| `adCreatives.getAdPreviews()` | Render previews of an existing ad |
| `adCreatives.updateAdCreative()` | Rename a creative |
| `adCreatives.deleteAdCreative()` | Delete a creative |
| `adCreatives.deleteAdVideo()` | Delete an ad video |
| `adCreatives.generateAdPreviews()` | Render pre-create ad previews |
| `adCreatives.uploadAdImage()` | Upload an ad image from base64 |
| `adCreatives.uploadAdVideo()` | Upload an ad video |

### Ad Insights
| Method | Description |
|--------|-------------|
| `adInsights.listLocalServicesLeadConversations()` | Conversations of a Local Services lead |
| `adInsights.listLocalServicesLeads()` | Google Local Services Ads leads |
| `adInsights.createAdInsightsReport()` | Submit an async insights report run |
| `adInsights.getAdAnalytics()` | Get ad analytics |
| `adInsights.getAdInsightsReport()` | Poll an async insights report run |
| `adInsights.getAdsSearchTerms()` | Google Ads search terms report |
| `adInsights.getCampaignAnalytics()` | Get campaign analytics |
| `adInsights.generateKeywordHistoricalMetrics()` | Historical keyword metrics (Google Keyword Planner) |
| `adInsights.generateKeywordIdeas()` | Generate keyword ideas (Google Keyword Planner) |
| `adInsights.queryAdInsights()` | Flexible live insights query |

### Ad Library
| Method | Description |
|--------|-------------|
| `adLibrary.searchAdLibrary()` | Search the public Ad Library |

### Ad Targeting
| Method | Description |
|--------|-------------|
| `adTargeting.getLinkedInBidPricing()` | Suggested bid and budget bounds |
| `adTargeting.getLinkedInSupplyForecast()` | Impressions, clicks and spend forecast |
| `adTargeting.estimateAdReach()` | Estimate audience reach |
| `adTargeting.searchAdInterests()` | Search targeting interests |
| `adTargeting.searchAdTargeting()` | Search targeting options |

### Blogs
| Method | Description |
|--------|-------------|
| `blogs.listBlogArticles()` | List blog articles |
| `blogs.listBlogs()` | List blogs |
| `blogs.createBlog()` | Create a blog |
| `blogs.createBlogArticle()` | Create a blog article |
| `blogs.getBlog()` | Get a blog |
| `blogs.getBlogArticle()` | Get a blog article |
| `blogs.updateBlog()` | Update a blog |
| `blogs.updateBlogArticle()` | Update a blog article |
| `blogs.deleteBlog()` | Delete a blog |
| `blogs.deleteBlogArticle()` | Delete a blog article |

### Broadcasts
| Method | Description |
|--------|-------------|
| `broadcasts.listBroadcastRecipients()` | List broadcast recipients |
| `broadcasts.listBroadcasts()` | List broadcasts |
| `broadcasts.createBroadcast()` | Create broadcast draft |
| `broadcasts.getBroadcast()` | Get broadcast details |
| `broadcasts.updateBroadcast()` | Update broadcast |
| `broadcasts.deleteBroadcast()` | Delete broadcast |
| `broadcasts.addBroadcastRecipients()` | Add recipients to a broadcast |
| `broadcasts.cancelBroadcast()` | Cancel broadcast |
| `broadcasts.scheduleBroadcast()` | Schedule broadcast for later |
| `broadcasts.sendBroadcast()` | Send broadcast now |

### Business Agent
| Method | Description |
|--------|-------------|
| `businessAgent.listBusinessAgentAllowlist()` | List allowlisted consumers |
| `businessAgent.listBusinessAgentConnectors()` | List connectors |
| `businessAgent.listBusinessAgentConnectorTools()` | List connector tools |
| `businessAgent.listBusinessAgentFaqs()` | List FAQs |
| `businessAgent.listBusinessAgentFiles()` | List knowledge files |
| `businessAgent.listBusinessAgentSettings()` | List agent settings |
| `businessAgent.listBusinessAgentSkills()` | List skills |
| `businessAgent.listBusinessAgentUiSkills()` | List UI skills |
| `businessAgent.listBusinessAgentWebsites()` | List crawled websites |
| `businessAgent.createBusinessAgentConnector()` | Create a connector |
| `businessAgent.createBusinessAgentConnectorTool()` | Create a connector tool |
| `businessAgent.createBusinessAgentFaq()` | Create a FAQ |
| `businessAgent.createBusinessAgentSkill()` | Create a skill |
| `businessAgent.createBusinessAgentUiSkill()` | Create a UI skill |
| `businessAgent.getBusinessAgentBudget()` | Get usage budgets |
| `businessAgent.getBusinessAgentBusinessInformation()` | Get business information |
| `businessAgent.getBusinessAgentConnector()` | Get a connector |
| `businessAgent.getBusinessAgentConnectorLogs()` | Get connector failure logs |
| `businessAgent.getBusinessAgentConnectorTool()` | Get a connector tool |
| `businessAgent.getBusinessAgentEvent()` | Get a business event status |
| `businessAgent.getBusinessAgentFaq()` | Get a FAQ |
| `businessAgent.getBusinessAgentFile()` | Get a knowledge file |
| `businessAgent.getBusinessAgentSkill()` | Get a skill |
| `businessAgent.getBusinessAgentStatus()` | Get agent setup status |
| `businessAgent.getBusinessAgentUiSkill()` | Get a UI skill |
| `businessAgent.getBusinessAgentWebsite()` | Get a crawled website |
| `businessAgent.updateBusinessAgentConnector()` | Update a connector |
| `businessAgent.updateBusinessAgentConnectorTool()` | Update a connector tool |
| `businessAgent.updateBusinessAgentFaq()` | Update a FAQ |
| `businessAgent.updateBusinessAgentSettings()` | Update agent settings |
| `businessAgent.updateBusinessAgentSkill()` | Update a skill |
| `businessAgent.updateBusinessAgentUiSkill()` | Update a UI skill |
| `businessAgent.updateBusinessAgentWebsite()` | Update a crawled website |
| `businessAgent.deleteBusinessAgentConnector()` | Delete a connector |
| `businessAgent.deleteBusinessAgentConnectorTool()` | Delete a connector tool |
| `businessAgent.deleteBusinessAgentFaq()` | Delete a FAQ |
| `businessAgent.deleteBusinessAgentFile()` | Delete a knowledge file |
| `businessAgent.deleteBusinessAgentSkill()` | Delete a skill |
| `businessAgent.deleteBusinessAgentUiSkill()` | Delete a UI skill |
| `businessAgent.deleteBusinessAgentWebsite()` | Remove a crawled website |
| `businessAgent.addBusinessAgentAllowlistEntry()` | Allowlist a consumer |
| `businessAgent.addBusinessAgentWebsite()` | Add a website to crawl |
| `businessAgent.onboardBusinessAgent()` | Create the agent |
| `businessAgent.readBusinessAgentEvals()` | Read evaluation data |
| `businessAgent.refreshBusinessAgentConnectorTools()` | Refresh MCP connector tools |
| `businessAgent.removeBusinessAgentAllowlistEntry()` | Remove an allowlisted consumer |
| `businessAgent.replaceBusinessAgentBudget()` | Replace usage budgets |
| `businessAgent.replaceBusinessAgentBusinessInformation()` | Replace business information |
| `businessAgent.resetBusinessAgentBusinessInformation()` | Reset business information |
| `businessAgent.runBusinessAgentConnectorTool()` | Run a connector tool once |
| `businessAgent.sendBusinessAgentEvent()` | Send a business event |
| `businessAgent.sendBusinessAgentTestMessage()` | Send a test message |
| `businessAgent.setBusinessAgentConnectorCredentials()` | Set connector credentials |
| `businessAgent.startBusinessAgentEvalRun()` | Start an evaluation run |
| `businessAgent.uploadBusinessAgentFile()` | Upload a knowledge file |

### Calls
| Method | Description |
|--------|-------------|
| `calls.listCalls()` | List all calls (unified history) |
| `calls.getCall()` | Get a call (any channel) |
| `calls.getCallRecording()` | Get a call recording |

### Comment Automations
| Method | Description |
|--------|-------------|
| `commentAutomations.listCommentAutomationLogs()` | List automation logs |
| `commentAutomations.listCommentAutomations()` | List comment-to-DM automations |
| `commentAutomations.createCommentAutomation()` | Create comment-to-DM automation |
| `commentAutomations.getCommentAutomation()` | Get automation details |
| `commentAutomations.updateCommentAutomation()` | Update automation settings |
| `commentAutomations.deleteCommentAutomation()` | Delete automation |

### Comments (Inbox)
| Method | Description |
|--------|-------------|
| `comments.listInboxComments()` | List commented posts |
| `comments.getInboxPostComments()` | Get post comments |
| `comments.deleteInboxComment()` | Delete comment |
| `comments.editInboxComment()` | Edit comment |
| `comments.hideInboxComment()` | Hide comment |
| `comments.likeInboxComment()` | Like comment |
| `comments.likePost()` | Like post |
| `comments.replyToInboxPost()` | Reply to comment |
| `comments.sendPrivateReplyToComment()` | Send private reply |
| `comments.setCommentModeration()` | Set comment moderation status |
| `comments.unhideInboxComment()` | Unhide comment |
| `comments.unlikeInboxComment()` | Unlike comment |
| `comments.unlikePost()` | Unlike post |

### Connected Apps
| Method | Description |
|--------|-------------|
| `connectedApps.listConnectedApps()` | List connected apps |
| `connectedApps.revokeConnectedApp()` | Revoke connected app |

### Contacts
| Method | Description |
|--------|-------------|
| `contacts.listContacts()` | List contacts |
| `contacts.bulkCreateContacts()` | Bulk create contacts |
| `contacts.createContact()` | Create contact |
| `contacts.getContact()` | Get contact |
| `contacts.getContactChannels()` | List channels for a contact |
| `contacts.updateContact()` | Update contact |
| `contacts.deleteContact()` | Delete contact |

### Conversions
| Method | Description |
|--------|-------------|
| `conversions.listConversionActions()` | List conversion actions and their tag snippets |
| `conversions.listConversionAssociations()` | List associated campaigns |
| `conversions.listConversionDestinations()` | List conversion destinations |
| `conversions.createConversionAction()` | Create a website conversion action |
| `conversions.createConversionDestination()` | Create a conversion destination |
| `conversions.getConversionDestination()` | Get a conversion destination |
| `conversions.getConversionMetrics()` | Get attribution metrics |
| `conversions.getConversionsQuality()` | Get Event Match Quality |
| `conversions.updateConversionDestination()` | Update a conversion destination |
| `conversions.deleteConversionDestination()` | Delete a conversion destination |
| `conversions.addConversionAssociations()` | Associate campaigns |
| `conversions.adjustConversions()` | Adjust uploaded conversions |
| `conversions.removeConversionAssociations()` | Remove associated campaigns |
| `conversions.sendConversions()` | Send conversion events |

### Custom Fields
| Method | Description |
|--------|-------------|
| `customFields.listCustomFields()` | List custom field definitions |
| `customFields.createCustomField()` | Create custom field |
| `customFields.updateCustomField()` | Update custom field |
| `customFields.deleteCustomField()` | Delete custom field |
| `customFields.clearContactFieldValue()` | Clear custom field value |
| `customFields.setContactFieldValue()` | Set custom field value |

### Discord
| Method | Description |
|--------|-------------|
| `discord.listDiscordGuildMembers()` | List Discord guild members |
| `discord.listDiscordGuildRoles()` | List Discord guild roles |
| `discord.listDiscordPinnedMessages()` | List pinned messages |
| `discord.listDiscordScheduledEvents()` | List Discord scheduled events |
| `discord.createDiscordGuildRole()` | Create a Discord guild role |
| `discord.createDiscordScheduledEvent()` | Create a Discord scheduled event |
| `discord.createDiscordThread()` | Create a Discord public thread |
| `discord.getDiscordChannels()` | List Discord guild channels |
| `discord.getDiscordGuildMember()` | Get a Discord guild member |
| `discord.getDiscordScheduledEvent()` | Get a Discord scheduled event |
| `discord.getDiscordSettings()` | Get Discord account settings |
| `discord.updateDiscordScheduledEvent()` | Update a Discord scheduled event |
| `discord.updateDiscordSettings()` | Update Discord settings |
| `discord.deleteDiscordGuildRole()` | Delete a Discord guild role |
| `discord.deleteDiscordMessage()` | Delete a Discord channel message |
| `discord.deleteDiscordScheduledEvent()` | Delete a Discord scheduled event |
| `discord.addDiscordMemberRole()` | Assign a role to a guild member |
| `discord.crosspostDiscordMessage()` | Crosspost Discord message |
| `discord.editDiscordGuildRole()` | Edit a Discord guild role |
| `discord.pinDiscordMessage()` | Pin a Discord message |
| `discord.removeDiscordMemberRole()` | Remove a role from a guild member |
| `discord.searchDiscordGuildMembers()` | Search Discord guild members |
| `discord.sendDiscordDirectMessage()` | Send a Discord Direct Message |
| `discord.unpinDiscordMessage()` | Unpin a Discord message |

### GMB Attributes
| Method | Description |
|--------|-------------|
| `gmbAttributes.getGmbAttributeMetadata()` | Get attribute metadata |
| `gmbAttributes.getGoogleBusinessAttributes()` | Get attributes |
| `gmbAttributes.updateGoogleBusinessAttributes()` | Update attributes |

### GMB Food Menus
| Method | Description |
|--------|-------------|
| `gmbFoodMenus.getGoogleBusinessFoodMenus()` | Get food menus |
| `gmbFoodMenus.updateGoogleBusinessFoodMenus()` | Update food menus |

### GMB Location Details
| Method | Description |
|--------|-------------|
| `gmbLocationDetails.getGoogleBusinessLocationDetails()` | Get location details |
| `gmbLocationDetails.updateGoogleBusinessLocationDetails()` | Update location details |

### GMB Media
| Method | Description |
|--------|-------------|
| `gmbMedia.listGoogleBusinessMedia()` | List media |
| `gmbMedia.createGoogleBusinessMedia()` | Upload photo |
| `gmbMedia.deleteGoogleBusinessMedia()` | Delete photo |

### GMB Place Actions
| Method | Description |
|--------|-------------|
| `gmbPlaceActions.listGoogleBusinessPlaceActions()` | List action links |
| `gmbPlaceActions.createGoogleBusinessPlaceAction()` | Create action link |
| `gmbPlaceActions.updateGoogleBusinessPlaceAction()` | Update action link |
| `gmbPlaceActions.deleteGoogleBusinessPlaceAction()` | Delete action link |

### GMB Services
| Method | Description |
|--------|-------------|
| `gmbServices.getGoogleBusinessServices()` | Get services |
| `gmbServices.updateGoogleBusinessServices()` | Replace services |

### GMB Verifications
| Method | Description |
|--------|-------------|
| `gmbVerifications.getGoogleBusinessVerifications()` | Get verification state |
| `gmbVerifications.completeGoogleBusinessVerification()` | Complete a verification |
| `gmbVerifications.fetchGoogleBusinessVerificationOptions()` | Fetch verification options |
| `gmbVerifications.startGoogleBusinessVerification()` | Start a verification |

### Inbox Analytics
| Method | Description |
|--------|-------------|
| `inboxAnalytics.listInboxConversationAnalytics()` | List conversation analytics |
| `inboxAnalytics.getInboxConversationAnalytics()` | Get conversation analytics |
| `inboxAnalytics.getInboxHeatmap()` | Get day × hour heatmap |
| `inboxAnalytics.getInboxResponseTime()` | Get inbox response-time stats |
| `inboxAnalytics.getInboxSourceBreakdown()` | Get inbox source breakdown |
| `inboxAnalytics.getInboxTopAccounts()` | Get top accounts by inbox volume |
| `inboxAnalytics.getInboxVolume()` | Get inbox messaging volume |

### Instagram
| Method | Description |
|--------|-------------|
| `instagram.listInstagramStories()` | List active Instagram stories |
| `instagram.getInstagramAudio()` | Get Instagram audio metadata |
| `instagram.getInstagramPublishingLimit()` | Get Instagram publishing limit |
| `instagram.getInstagramStoryInsights()` | Get Instagram story insights |
| `instagram.searchInstagramAudio()` | Search Instagram audio |

### Lead Gen
| Method | Description |
|--------|-------------|
| `leadGen.listFormLeads()` | List leads for a single form |
| `leadGen.listLeadForms()` | List lead forms |
| `leadGen.listLeads()` | List submitted leads |
| `leadGen.createLeadForm()` | Create a lead form |
| `leadGen.createTestLead()` | Create a test lead |
| `leadGen.getLeadForm()` | Get a lead form |
| `leadGen.archiveLeadForm()` | Archive a lead form |

### Mentions
| Method | Description |
|--------|-------------|
| `mentions.listInboxMentions()` | List mentions |
| `mentions.replyToMention()` | Reply to a mention |

### Messages (Inbox)
| Method | Description |
|--------|-------------|
| `messages.listInboxConversations()` | List conversations |
| `messages.createInboxConversation()` | Create conversation |
| `messages.getInboxConversation()` | Get conversation |
| `messages.getInboxConversationMessages()` | List messages |
| `messages.getMessageAttachment()` | Resolve message attachment |
| `messages.updateInboxConversation()` | Update conversation status |
| `messages.deleteInboxMessage()` | Delete message |
| `messages.addMessageReaction()` | Add reaction |
| `messages.editInboxMessage()` | Edit message |
| `messages.markConversationRead()` | Mark a conversation as read |
| `messages.removeMessageReaction()` | Remove reaction |
| `messages.searchInboxConversations()` | Search conversations |
| `messages.sendInboxMessage()` | Send message |
| `messages.sendTypingIndicator()` | Send typing indicator |
| `messages.setConversationThreadControl()` | Hand a conversation to or from Meta Business Agent |
| `messages.uploadMediaDirect()` | Upload media file |

### Messaging Ads
| Method | Description |
|--------|-------------|
| `messagingAds.createCallAd()` | Create Click-to-Call ad |
| `messagingAds.createCtwaAd()` | Create CTWA ad (deprecated) |
| `messagingAds.createMessagingAd()` | Create messaging ad |

### Phone Numbers
| Method | Description |
|--------|-------------|
| `phoneNumbers.listPhoneNumberCountries()` | List offerable number countries |
| `phoneNumbers.listPhoneNumberPortIns()` | List port-in orders |
| `phoneNumbers.listPhoneNumbers()` | List phone numbers |
| `phoneNumbers.listPhoneNumberStockWatches()` | List stock watches |
| `phoneNumbers.createPhoneNumberKycLink()` | Create a hosted KYC link |
| `phoneNumbers.createPhoneNumberPortIn()` | Port numbers in |
| `phoneNumbers.createPhoneNumberStockWatch()` | Watch an out-of-stock country |
| `phoneNumbers.getPhoneNumber()` | Get phone number |
| `phoneNumbers.getPhoneNumberKycForm()` | Get KYC form spec |
| `phoneNumbers.getPhoneNumberPortInOrderRequirements()` | A port-in order's pending requirements |
| `phoneNumbers.getPhoneNumberPortInRequirements()` | Country porting requirements |
| `phoneNumbers.getPhoneNumberRemediation()` | Get declined requirements |
| `phoneNumbers.deletePhoneNumberStockWatch()` | Stop watching a country |
| `phoneNumbers.cancelPhoneNumberPortIn()` | Cancel a port-in |
| `phoneNumbers.checkPhoneNumberAvailability()` | Check country availability |
| `phoneNumbers.checkPhoneNumberPortability()` | Check portability |
| `phoneNumbers.purchasePhoneNumber()` | Purchase phone number |
| `phoneNumbers.releasePhoneNumber()` | Release phone number |
| `phoneNumbers.remediatePhoneNumber()` | Resubmit a declined number |
| `phoneNumbers.replyToPhoneNumberReviewer()` | Reply to the regulatory reviewer |
| `phoneNumbers.respondToPhoneNumberReviewer()` | Respond to the regulatory reviewer (message + corrections) |
| `phoneNumbers.reviewPhoneNumberKycPacket()` | Pre-review a KYC packet |
| `phoneNumbers.searchAvailablePhoneNumbers()` | Search available numbers |
| `phoneNumbers.submitPhoneNumberKyc()` | Submit KYC |
| `phoneNumbers.uploadPhoneNumberKycDocument()` | Upload a KYC document |
| `phoneNumbers.uploadPhoneNumberPortInDocument()` | Upload a porting document |
| `phoneNumbers.validatePhoneNumberKycAddress()` | Pre-validate KYC address |
| `phoneNumbers.viewPhoneNumberKycDocument()` | View a KYC document on file |

### Reach and Frequency
| Method | Description |
|--------|-------------|
| `reachAndFrequency.createRfPrediction()` | Create a Reach & Frequency prediction |
| `reachAndFrequency.getRfPrediction()` | Read a Reach & Frequency prediction |
| `reachAndFrequency.cancelRfReservation()` | Cancel a Reach & Frequency reservation |
| `reachAndFrequency.reserveRfPrediction()` | Reserve a Reach & Frequency prediction |

### Reviews (Inbox)
| Method | Description |
|--------|-------------|
| `reviews.listInboxReviews()` | List reviews |
| `reviews.deleteInboxReviewReply()` | Delete review reply |
| `reviews.replyToInboxReview()` | Reply to review |

### Sequences
| Method | Description |
|--------|-------------|
| `sequences.listSequenceEnrollments()` | List enrollments for a sequence |
| `sequences.listSequences()` | List sequences |
| `sequences.createSequence()` | Create sequence |
| `sequences.getSequence()` | Get sequence with steps |
| `sequences.updateSequence()` | Update sequence |
| `sequences.deleteSequence()` | Delete sequence |
| `sequences.activateSequence()` | Activate sequence |
| `sequences.enrollContacts()` | Enroll contacts in a sequence |
| `sequences.pauseSequence()` | Pause sequence |
| `sequences.unenrollContact()` | Unenroll contact |

### Slack
| Method | Description |
|--------|-------------|
| `slack.listSlackMembers()` | List Slack workspace members |

### SMS
| Method | Description |
|--------|-------------|
| `sms.listSmsOptOuts()` | List SMS opt-outs |
| `sms.listSmsRegistrations()` | List carrier registrations |
| `sms.listSmsSenderIds()` | List alphanumeric sender IDs |
| `sms.createSmsSenderId()` | Create an alphanumeric sender ID |
| `sms.getSmsRegistration()` | Get a carrier registration |
| `sms.deleteSmsSenderId()` | Delete an alphanumeric sender ID |
| `sms.appealSmsRegistration()` | Appeal a rejected campaign |
| `sms.deactivateSmsRegistration()` | Deactivate a brand/campaign registration |
| `sms.disableSmsOnNumber()` | Disable SMS on a number |
| `sms.enableSmsOnNumber()` | Enable SMS on a number |
| `sms.lookupSmsNumber()` | Look up carrier + line type |
| `sms.preflightSmsRegistration()` | Pre-check a carrier registration |
| `sms.requestSmsSenderIdLimitIncrease()` | Request a higher sender ID daily limit |
| `sms.resendSmsRegistrationOtp()` | Re-send the sole-prop OTP |
| `sms.respondToSmsRegistrationReview()` | Reply to a change request |
| `sms.reuseSmsRegistrationForNumber()` | Add number to SMS registration |
| `sms.sendSms()` | Send an SMS/MMS |
| `sms.shareSmsRegistration()` | Create a registration share link |
| `sms.startSmsRegistration()` | Start a carrier registration |
| `sms.uploadSmsOptInProof()` | Upload opt-in form proof for an appeal |
| `sms.uploadSmsOptInProofFile()` | Upload opt-in form proof |
| `sms.verifySmsRegistrationOtp()` | Submit the sole-prop OTP |

### Tracking Tags
| Method | Description |
|--------|-------------|
| `trackingTags.listTrackingTags()` | List tracking tags |
| `trackingTags.listTrackingTagSharedAccounts()` | List accounts it is shared with |
| `trackingTags.createTrackingTag()` | Create a tracking tag |
| `trackingTags.getAdTrackingTags()` | Get ad tracking tags |
| `trackingTags.getTrackingTag()` | Get a tracking tag |
| `trackingTags.getTrackingTagStats()` | Get aggregated event stats |
| `trackingTags.updateAdTrackingTags()` | Set ad tracking tags |
| `trackingTags.updateTrackingTag()` | Update a tracking tag |
| `trackingTags.addTrackingTagSharedAccount()` | Share with an ad account |
| `trackingTags.removeTrackingTagSharedAccount()` | Stop sharing with an account |

### Twitter Engagement
| Method | Description |
|--------|-------------|
| `twitterEngagement.getTweet()` | Look up a tweet |
| `twitterEngagement.bookmarkPost()` | Bookmark a tweet |
| `twitterEngagement.followUser()` | Follow a user |
| `twitterEngagement.removeBookmark()` | Remove bookmark |
| `twitterEngagement.retweetPost()` | Retweet a post |
| `twitterEngagement.searchTweets()` | Search recent tweets |
| `twitterEngagement.undoRetweet()` | Undo retweet |
| `twitterEngagement.unfollowUser()` | Unfollow a user |

### Validate
| Method | Description |
|--------|-------------|
| `validate.validateMedia()` | Validate media URL |
| `validate.validatePost()` | Validate post content |
| `validate.validatePostLength()` | Validate character count |
| `validate.validateSubreddit()` | Check subreddit existence |

### Verify
| Method | Description |
|--------|-------------|
| `verify.createVerification()` | Send a verification code |
| `verify.getVerification()` | Get a verification |
| `verify.checkVerification()` | Check a verification code |

### Voice
| Method | Description |
|--------|-------------|
| `voice.listSipTrunks()` | List SIP trunks |
| `voice.listVoiceCalls()` | List phone calls |
| `voice.createSipTrunk()` | Create a SIP trunk |
| `voice.createVoiceCall()` | Place an outbound phone call |
| `voice.createVoiceWebSession()` | Mint a browser softphone session |
| `voice.getSipTrunk()` | Get a SIP trunk |
| `voice.getVoiceCall()` | Get a phone call |
| `voice.getVoiceCallEstimate()` | Estimate call cost |
| `voice.getVoiceCallRecording()` | Get a call recording |
| `voice.deleteSipTrunk()` | Delete a SIP trunk |
| `voice.attachNumberToSipTrunk()` | Attach a number to a SIP trunk |
| `voice.detachNumberFromSipTrunk()` | Detach a number from its SIP trunk |
| `voice.dialVoiceWebCall()` | Dial from the browser softphone |
| `voice.disableVoiceOnNumber()` | Disable phone calling on a number |
| `voice.enableVoiceOnNumber()` | Enable phone calling on a number |
| `voice.endVoiceCall()` | Hang up a live call |
| `voice.rotateSipTrunkCredentials()` | Rotate a SIP trunk's password |
| `voice.transferVoiceCall()` | Blind-transfer a live call |

### WhatsApp
| Method | Description |
|--------|-------------|
| `whatsapp.listWhatsAppAccountEvents()` | List account notifications |
| `whatsapp.listWhatsAppConversions()` | List conversion events |
| `whatsapp.listWhatsAppGroupChats()` | List active groups |
| `whatsapp.listWhatsAppGroupJoinRequests()` | List join requests |
| `whatsapp.createWhatsAppDataset()` | Provision CTWA dataset |
| `whatsapp.createWhatsAppGroupChat()` | Create group |
| `whatsapp.createWhatsAppGroupInviteLink()` | Create invite link |
| `whatsapp.createWhatsAppTemplate()` | Create template |
| `whatsapp.getWhatsAppBlockedUsers()` | List blocked users |
| `whatsapp.getWhatsAppBlockStatus()` | Check if a user is blocked |
| `whatsapp.getWhatsAppBusinessProfile()` | Get business profile |
| `whatsapp.getWhatsappBusinessUsername()` | Get business username |
| `whatsapp.getWhatsappBusinessUsernameSuggestions()` | Get username suggestions |
| `whatsapp.getWhatsAppDataset()` | Get CTWA conversions dataset |
| `whatsapp.getWhatsAppDisplayName()` | Get display name status |
| `whatsapp.getWhatsAppGroupChat()` | Get group info |
| `whatsapp.getWhatsAppMedia()` | Download WhatsApp media |
| `whatsapp.getWhatsAppTemplate()` | Get template |
| `whatsapp.getWhatsAppTemplateById()` | Get template by id |
| `whatsapp.getWhatsAppTemplates()` | List templates |
| `whatsapp.updateWhatsAppBusinessProfile()` | Update business profile |
| `whatsapp.updateWhatsAppDisplayName()` | Request display name change |
| `whatsapp.updateWhatsAppGroupChat()` | Update group settings |
| `whatsapp.updateWhatsAppTemplate()` | Update template |
| `whatsapp.updateWhatsAppTemplateById()` | Update template by id |
| `whatsapp.deleteWhatsappBusinessUsername()` | Delete business username |
| `whatsapp.deleteWhatsAppGroupChat()` | Delete group |
| `whatsapp.deleteWhatsAppTemplate()` | Delete template |
| `whatsapp.deleteWhatsAppTemplateById()` | Delete template by id |
| `whatsapp.addWhatsAppGroupParticipants()` | Add participants |
| `whatsapp.approveWhatsAppGroupJoinRequests()` | Approve join requests |
| `whatsapp.blockWhatsAppUsers()` | Block users |
| `whatsapp.registerWhatsAppNumber()` | Register a connected WhatsApp number on the Cloud API |
| `whatsapp.rejectWhatsAppGroupJoinRequests()` | Reject join requests |
| `whatsapp.removeWhatsAppGroupParticipants()` | Remove participants |
| `whatsapp.requestWhatsAppVerificationCode()` | Request a Meta re-verification code for a BYO WhatsApp number |
| `whatsapp.sendWhatsAppConversion()` | Send WhatsApp conversion event |
| `whatsapp.setWhatsappBusinessUsername()` | Set business username |
| `whatsapp.unblockWhatsAppUsers()` | Unblock users |
| `whatsapp.uploadWhatsAppProfilePhoto()` | Upload profile picture |
| `whatsapp.verifyWhatsAppNumber()` | Verify the Meta re-verification code for a BYO WhatsApp number |

### WhatsApp Calling
| Method | Description |
|--------|-------------|
| `whatsappCalling.listWhatsAppCalls()` | List call history for an account |
| `whatsappCalling.getWhatsAppCall()` | Get a single call |
| `whatsappCalling.getWhatsAppCallEstimate()` | Estimate per-minute cost |
| `whatsappCalling.getWhatsAppCalling()` | Get calling config for a number |
| `whatsappCalling.getWhatsAppCallingConfig()` | Get calling config for an account |
| `whatsappCalling.getWhatsAppCallPermissions()` | Check call permission |
| `whatsappCalling.getWhatsAppCallRecording()` | Get a call recording |
| `whatsappCalling.updateWhatsAppCalling()` | Update calling config |
| `whatsappCalling.updateWhatsAppCallingLegacy()` | Update calling config |
| `whatsappCalling.disableWhatsAppCalling()` | Disable calling on a number |
| `whatsappCalling.disableWhatsAppCallingLegacy()` | Disable calling on a number |
| `whatsappCalling.enableWhatsAppCalling()` | Enable calling on a number |
| `whatsappCalling.enableWhatsAppCallingLegacy()` | Enable calling on a number |
| `whatsappCalling.initiateWhatsAppCall()` | Initiate outbound call |
| `whatsappCalling.startWhatsAppCallerIdVerification()` | Start caller-ID verification for a customer-brought number |
| `whatsappCalling.verifyWhatsAppCallerId()` | Confirm the caller-ID verification code |

### WhatsApp Flows
| Method | Description |
|--------|-------------|
| `whatsappFlows.listWhatsAppFlowResponses()` | List flow responses |
| `whatsappFlows.listWhatsAppFlows()` | List flows |
| `whatsappFlows.listWhatsAppFlowVersions()` | List flow versions |
| `whatsappFlows.createWhatsAppFlow()` | Create flow |
| `whatsappFlows.getWhatsAppFlow()` | Get flow |
| `whatsappFlows.getWhatsAppFlowJson()` | Get flow JSON asset |
| `whatsappFlows.getWhatsAppFlowPreview()` | Get flow preview URL |
| `whatsappFlows.getWhatsAppFlowsEncryptionKey()` | Get Flows encryption key status |
| `whatsappFlows.updateWhatsAppFlow()` | Update flow |
| `whatsappFlows.deleteWhatsAppFlow()` | Delete flow |
| `whatsappFlows.deprecateWhatsAppFlow()` | Deprecate flow |
| `whatsappFlows.publishWhatsAppFlow()` | Publish flow |
| `whatsappFlows.sendWhatsAppFlowMessage()` | Send flow message |
| `whatsappFlows.setWhatsAppFlowsEncryptionKey()` | Register a Flows encryption key |
| `whatsappFlows.uploadWhatsAppFlowJson()` | Upload flow JSON |

### WhatsApp Phone Numbers
| Method | Description |
|--------|-------------|
| `whatsappPhoneNumbers.listWhatsAppNumberCountries()` | List offerable number countries |
| `whatsappPhoneNumbers.createWhatsAppNumberKycLink()` | Create a hosted KYC link |
| `whatsappPhoneNumbers.getWhatsAppNumberInfo()` | Get number status |
| `whatsappPhoneNumbers.getWhatsAppNumberKycForm()` | Get KYC form spec |
| `whatsappPhoneNumbers.getWhatsAppNumberRemediation()` | Get declined requirements |
| `whatsappPhoneNumbers.getWhatsAppPhoneNumber()` | Get phone number |
| `whatsappPhoneNumbers.getWhatsAppPhoneNumbers()` | List phone numbers |
| `whatsappPhoneNumbers.checkWhatsAppNumberAvailability()` | Check country availability |
| `whatsappPhoneNumbers.moveWhatsAppNumberToProfile()` | Move a number to another profile |
| `whatsappPhoneNumbers.purchaseWhatsAppPhoneNumber()` | Purchase phone number |
| `whatsappPhoneNumbers.releaseWhatsAppPhoneNumber()` | Release phone number |
| `whatsappPhoneNumbers.remediateWhatsAppNumber()` | Resubmit a declined number |
| `whatsappPhoneNumbers.searchAvailableWhatsAppNumbers()` | Search available numbers |
| `whatsappPhoneNumbers.submitWhatsAppNumberKyc()` | Submit KYC |
| `whatsappPhoneNumbers.uploadWhatsAppNumberKycDocument()` | Upload a KYC document |
| `whatsappPhoneNumbers.validateWhatsAppNumberKycAddress()` | Pre-validate KYC address |

### WhatsApp Sandbox
| Method | Description |
|--------|-------------|
| `whatsappSandbox.listWhatsAppSandboxSessions()` | List your sandbox sessions |
| `whatsappSandbox.createWhatsAppSandboxSession()` | Start a sandbox activation |
| `whatsappSandbox.deleteWhatsAppSandboxSession()` | Revoke a sandbox session |

### WhatsApp Templates
| Method | Description |
|--------|-------------|
| `whatsappTemplates.getWhatsAppLibraryTemplate()` | Look up a library template |

### Workflows
| Method | Description |
|--------|-------------|
| `workflows.listWorkflowExecutionEvents()` | Get an execution's timeline |
| `workflows.listWorkflowExecutions()` | List workflow runs |
| `workflows.listWorkflows()` | List workflows |
| `workflows.listWorkflowVersions()` | List a workflow's version history |
| `workflows.createWorkflow()` | Create workflow |
| `workflows.getWorkflow()` | Get workflow with graph |
| `workflows.getWorkflowVersion()` | Get a specific workflow version |
| `workflows.updateWorkflow()` | Update workflow |
| `workflows.deleteWorkflow()` | Delete workflow |
| `workflows.activateWorkflow()` | Activate workflow |
| `workflows.duplicateWorkflow()` | Duplicate a workflow |
| `workflows.pauseWorkflow()` | Pause workflow |
| `workflows.restoreWorkflowVersion()` | Restore a workflow version |
| `workflows.triggerWorkflow()` | Manually start a workflow run |

### Invites
| Method | Description |
|--------|-------------|
| `invites.createInviteToken()` | Create invite token |

## Requirements

- Node.js 18+
- [Zernio API key](https://zernio.com) (free tier available)

## Links

- [Documentation](https://docs.zernio.com)
- [Dashboard](https://zernio.com/dashboard)
- [Changelog](https://docs.zernio.com/changelog)

## License

Apache-2.0
