<p align="center">
  <a href="https://getlate.dev">
    <img src="https://getlate.dev/images/icon_light.svg" alt="Late" width="60">
  </a>
</p>

<h1 align="center">Late Node.js SDK</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@getlatedev/node"><img src="https://img.shields.io/npm/v/@getlatedev/node.svg" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-blue.svg" alt="License"></a>
</p>

<p align="center">
  <strong>One API to post everywhere. 13 platforms, zero headaches.</strong>
</p>

The official Node.js SDK for the [Late API](https://getlate.dev) — schedule and publish social media posts across Instagram, TikTok, YouTube, LinkedIn, X/Twitter, Facebook, Pinterest, Threads, Bluesky, Reddit, Snapchat, Telegram, and Google Business Profile with a single integration.

## Installation

```bash
npm install @getlatedev/node
```

## Quick Start

```typescript
import Late from '@getlatedev/node';

const late = new Late(); // Uses LATE_API_KEY env var

// Publish to multiple platforms with one call
const { data: post } = await late.posts.createPost({
  body: {
    content: 'Hello world from Late!',
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
const late = new Late({
  apiKey: 'your-api-key', // Defaults to process.env['LATE_API_KEY']
  baseURL: 'https://getlate.dev/api',
  timeout: 60000,
});
```

## Examples

### Schedule a Post

```typescript
const { data: post } = await late.posts.createPost({
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
const { data: post } = await late.posts.createPost({
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
const { data: presign } = await late.media.getMediaPresignedUrl({
  body: { filename: 'video.mp4', contentType: 'video/mp4' },
});

// 2. Upload your file
await fetch(presign.uploadUrl, {
  method: 'PUT',
  body: videoBuffer,
  headers: { 'Content-Type': 'video/mp4' },
});

// 3. Create post with media
const { data: post } = await late.posts.createPost({
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
const { data } = await late.analytics.getAnalytics({
  query: { postId: 'post_xxx' },
});

console.log('Views:', data.analytics.views);
console.log('Likes:', data.analytics.likes);
console.log('Engagement Rate:', data.analytics.engagementRate);
```

### List Connected Accounts

```typescript
const { data } = await late.accounts.listAccounts();

for (const account of data.accounts) {
  console.log(`${account.platform}: @${account.username}`);
}
```

## Error Handling

```typescript
import Late, { LateApiError, RateLimitError, ValidationError } from '@getlatedev/node';

try {
  await late.posts.createPost({ body: { /* ... */ } });
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry in ${error.getSecondsUntilReset()}s`);
  } else if (error instanceof ValidationError) {
    console.log('Invalid request:', error.fields);
  } else if (error instanceof LateApiError) {
    console.log(`Error ${error.statusCode}: ${error.message}`);
  }
}
```

## SDK Reference

### Posts
| Method | Description |
|--------|-------------|
| `posts.listPosts()` | List all posts |
| `posts.createPost()` | Create and schedule a post |
| `posts.getPost()` | Get a specific post |
| `posts.updatePost()` | Update a scheduled post |
| `posts.deletePost()` | Delete a post |
| `posts.bulkUploadPosts()` | Upload multiple posts at once |
| `posts.retryPost()` | Retry a failed post |

### Accounts
| Method | Description |
|--------|-------------|
| `accounts.listAccounts()` | List connected social accounts |
| `accounts.getFollowerStats()` | Get follower growth data |
| `accounts.updateAccount()` | Update account settings |
| `accounts.deleteAccount()` | Disconnect an account |
| `accounts.getAllAccountsHealth()` | Check health of all accounts |
| `accounts.getAccountHealth()` | Check health of a specific account |
| `accounts.getGoogleBusinessReviews()` | Get Google Business reviews |
| `accounts.getLinkedInMentions()` | Get LinkedIn mentions |

### Profiles
| Method | Description |
|--------|-------------|
| `profiles.listProfiles()` | List workspace profiles |
| `profiles.createProfile()` | Create a new profile |
| `profiles.getProfile()` | Get a specific profile |
| `profiles.updateProfile()` | Update a profile |
| `profiles.deleteProfile()` | Delete a profile |

### Analytics
| Method | Description |
|--------|-------------|
| `analytics.getAnalytics()` | Get post performance metrics |
| `analytics.getYouTubeDailyViews()` | Get YouTube daily view breakdown |
| `analytics.getLinkedInAggregateAnalytics()` | Get LinkedIn organization analytics |
| `analytics.getLinkedInPostAnalytics()` | Get LinkedIn post-level analytics |

### Account Groups
| Method | Description |
|--------|-------------|
| `accountGroups.listAccountGroups()` | List account groups |
| `accountGroups.createAccountGroup()` | Create an account group |
| `accountGroups.updateAccountGroup()` | Update an account group |
| `accountGroups.deleteAccountGroup()` | Delete an account group |

### Queue
| Method | Description |
|--------|-------------|
| `queue.listQueueSlots()` | List queue time slots |
| `queue.createQueueSlot()` | Create a queue slot |
| `queue.updateQueueSlot()` | Update a queue slot |
| `queue.deleteQueueSlot()` | Delete a queue slot |
| `queue.previewQueue()` | Preview upcoming queued posts |
| `queue.getNextQueueSlot()` | Get next available slot |

### Webhooks
| Method | Description |
|--------|-------------|
| `webhooks.getWebhookSettings()` | Get webhook configuration |
| `webhooks.createWebhookSettings()` | Create webhook settings |
| `webhooks.updateWebhookSettings()` | Update webhook settings |
| `webhooks.deleteWebhookSettings()` | Delete webhook settings |
| `webhooks.testWebhook()` | Send a test webhook |
| `webhooks.getWebhookLogs()` | Get webhook delivery logs |

### API Keys
| Method | Description |
|--------|-------------|
| `apiKeys.listApiKeys()` | List API keys |
| `apiKeys.createApiKey()` | Create a new API key |
| `apiKeys.deleteApiKey()` | Delete an API key |

### Media
| Method | Description |
|--------|-------------|
| `media.getMediaPresignedUrl()` | Get presigned URL for file upload |

### Tools
| Method | Description |
|--------|-------------|
| `tools.downloadYouTubeVideo()` | Download YouTube video |
| `tools.getYouTubeTranscript()` | Get YouTube video transcript |
| `tools.downloadInstagramMedia()` | Download Instagram media |
| `tools.checkInstagramHashtags()` | Check if hashtags are banned |
| `tools.downloadTikTokVideo()` | Download TikTok video |
| `tools.downloadTwitterMedia()` | Download Twitter/X media |
| `tools.downloadFacebookVideo()` | Download Facebook video |
| `tools.downloadLinkedInVideo()` | Download LinkedIn video |
| `tools.downloadBlueskyMedia()` | Download Bluesky media |

### Users
| Method | Description |
|--------|-------------|
| `users.listUsers()` | List team users |
| `users.getUser()` | Get a specific user |

### Usage
| Method | Description |
|--------|-------------|
| `usage.getUsageStats()` | Get API usage statistics |

### Logs
| Method | Description |
|--------|-------------|
| `logs.listLogs()` | List publishing logs |
| `logs.getLog()` | Get a specific log entry |
| `logs.getPostLogs()` | Get logs for a specific post |

### Connect (OAuth)
| Method | Description |
|--------|-------------|
| `connect.getConnectUrl()` | Get OAuth URL for a platform |
| `connect.handleOAuthCallback()` | Handle OAuth callback |
| `connect.updateFacebookPage()` | Update Facebook page settings |
| `connect.getLinkedInOrganizations()` | Get LinkedIn organizations |
| `connect.updateLinkedInOrganization()` | Update LinkedIn organization |
| `connect.getPinterestBoards()` | Get Pinterest boards |
| `connect.updatePinterestBoards()` | Update Pinterest boards |
| `connect.getRedditSubreddits()` | Get Reddit subreddits |
| `connect.updateRedditSubreddits()` | Update Reddit subreddits |
| `connect.listFacebookPages()` | List Facebook Pages |
| `connect.selectFacebookPage()` | Select Facebook Page |
| `connect.listGoogleBusinessLocations()` | List Google Business Locations |
| `connect.selectGoogleBusinessLocation()` | Select Google Business Location |
| `connect.listLinkedInOrganizations()` | List Linked In Organizations |
| `connect.selectLinkedInOrganization()` | Select Linked In Organization |
| `connect.listPinterestBoardsForSelection()` | List Pinterest Boards For Selection |
| `connect.selectPinterestBoard()` | Select Pinterest Board |
| `connect.listSnapchatProfiles()` | List Snapchat Profiles |
| `connect.selectSnapchatProfile()` | Select Snapchat Profile |
| `connect.connectBlueskyCredentials()` | Connect Bluesky Credentials |
| `connect.getTelegramConnectStatus()` | Get Telegram Connect Status |
| `connect.initiateTelegramConnect()` | Initiate Telegram Connect |
| `connect.completeTelegramConnect()` | Complete Telegram Connect |
| `connect.facebook.listFacebookPages()` | List Facebook pages to connect |
| `connect.facebook.selectFacebookPage()` | Select a Facebook page |
| `connect.googleBusiness.listGoogleBusinessLocations()` | List Google Business locations |
| `connect.googleBusiness.selectGoogleBusinessLocation()` | Select a location |
| `connect.linkedin.listLinkedInOrganizations()` | List LinkedIn organizations |
| `connect.linkedin.selectLinkedInOrganization()` | Select an organization |
| `connect.pinterest.listPinterestBoardsForSelection()` | List Pinterest boards |
| `connect.pinterest.selectPinterestBoard()` | Select a board |
| `connect.snapchat.listSnapchatProfiles()` | List Snapchat profiles |
| `connect.snapchat.selectSnapchatProfile()` | Select a profile |
| `connect.bluesky.connectBlueskyCredentials()` | Connect with Bluesky credentials |
| `connect.telegram.getTelegramConnectStatus()` | Get Telegram connection status |
| `connect.telegram.initiateTelegramConnect()` | Start Telegram connection |
| `connect.telegram.completeTelegramConnect()` | Complete Telegram connection |

### Reddit
| Method | Description |
|--------|-------------|
| `reddit.searchReddit()` | Search Reddit |
| `reddit.getRedditFeed()` | Get Reddit feed |

### Invites
| Method | Description |
|--------|-------------|
| `invites.createInviteToken()` | Create an invite token |
| `invites.listPlatformInvites()` | List platform invites |
| `invites.createPlatformInvite()` | Create a platform invite |
| `invites.deletePlatformInvite()` | Delete a platform invite |

## Requirements

- Node.js 18+
- [Late API key](https://getlate.dev) (free tier available)

## Links

- [Documentation](https://docs.getlate.dev)
- [Dashboard](https://getlate.dev/dashboard)
- [Changelog](https://docs.getlate.dev/changelog)

## License

Apache-2.0
