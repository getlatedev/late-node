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
| `posts.listPosts()` | List posts visible to the authenticated user |
| `posts.bulkUploadPosts()` | Validate and schedule multiple posts from CSV |
| `posts.createPost()` | Create a draft, scheduled, or immediate post |
| `posts.getPost()` | Get a single post |
| `posts.updatePost()` | Update a post |
| `posts.deletePost()` | Delete a post |
| `posts.retryPost()` | Retry publishing a failed or partial post |

### Accounts
| Method | Description |
|--------|-------------|
| `accounts.getAllAccountsHealth()` | Check health of all connected accounts |
| `accounts.listAccounts()` | List connected social accounts |
| `accounts.getAccountHealth()` | Check health of a specific account |
| `accounts.getFollowerStats()` | Get follower stats and growth metrics |
| `accounts.getGoogleBusinessReviews()` | Get Google Business Profile reviews |
| `accounts.getLinkedInMentions()` | Resolve a LinkedIn profile or company URL to a URN for @mentions |
| `accounts.updateAccount()` | Update a social account |
| `accounts.deleteAccount()` | Disconnect a social account |

### Profiles
| Method | Description |
|--------|-------------|
| `profiles.listProfiles()` | List profiles visible to the authenticated user |
| `profiles.createProfile()` | Create a new profile |
| `profiles.getProfile()` | Get a profile by id |
| `profiles.updateProfile()` | Update a profile |
| `profiles.deleteProfile()` | Delete a profile (must have no connected accounts) |

### Analytics
| Method | Description |
|--------|-------------|
| `analytics.getAnalytics()` | Unified analytics for posts |
| `analytics.getLinkedInAggregateAnalytics()` | Get aggregate analytics for a LinkedIn personal account |
| `analytics.getLinkedInPostAnalytics()` | Get analytics for a specific LinkedIn post by URN |
| `analytics.getYouTubeDailyViews()` | YouTube daily views breakdown |

### Account Groups
| Method | Description |
|--------|-------------|
| `accountGroups.listAccountGroups()` | List account groups for the authenticated user |
| `accountGroups.createAccountGroup()` | Create a new account group |
| `accountGroups.updateAccountGroup()` | Update an account group |
| `accountGroups.deleteAccountGroup()` | Delete an account group |

### Queue
| Method | Description |
|--------|-------------|
| `queue.listQueueSlots()` | Get queue schedules for a profile |
| `queue.createQueueSlot()` | Create a new queue for a profile |
| `queue.getNextQueueSlot()` | Preview the next available queue slot (informational only) |
| `queue.updateQueueSlot()` | Create or update a queue schedule |
| `queue.deleteQueueSlot()` | Delete a queue schedule |
| `queue.previewQueue()` | Preview upcoming queue slots for a profile |

### Webhooks
| Method | Description |
|--------|-------------|
| `webhooks.createWebhookSettings()` | Create a new webhook |
| `webhooks.getWebhookLogs()` | Get webhook delivery logs |
| `webhooks.getWebhookSettings()` | List all webhooks |
| `webhooks.updateWebhookSettings()` | Update a webhook |
| `webhooks.deleteWebhookSettings()` | Delete a webhook |
| `webhooks.testWebhook()` | Send test webhook |

### API Keys
| Method | Description |
|--------|-------------|
| `apiKeys.listApiKeys()` | List API keys for the current user |
| `apiKeys.createApiKey()` | Create a new API key |
| `apiKeys.deleteApiKey()` | Delete an API key |

### Media
| Method | Description |
|--------|-------------|
| `media.getMediaPresignedUrl()` | Get a presigned URL for direct file upload (up to 5GB) |

### Tools
| Method | Description |
|--------|-------------|
| `tools.getYouTubeTranscript()` | Get YouTube video transcript |
| `tools.checkInstagramHashtags()` | Check Instagram hashtags for bans |
| `tools.downloadBlueskyMedia()` | Download Bluesky video |
| `tools.downloadFacebookVideo()` | Download Facebook video |
| `tools.downloadInstagramMedia()` | Download Instagram reel or post |
| `tools.downloadLinkedInVideo()` | Download LinkedIn video |
| `tools.downloadTikTokVideo()` | Download TikTok video |
| `tools.downloadTwitterMedia()` | Download Twitter/X video |
| `tools.downloadYouTubeVideo()` | Download YouTube video or audio |

### Users
| Method | Description |
|--------|-------------|
| `users.listUsers()` | List team users (root + invited) |
| `users.getUser()` | Get user by id (self or invited) |

### Usage
| Method | Description |
|--------|-------------|
| `usage.getUsageStats()` | Get plan and usage stats for current account |

### Logs
| Method | Description |
|--------|-------------|
| `logs.listLogs()` | Get publishing logs |
| `logs.getLog()` | Get a single log entry |
| `logs.getPostLogs()` | Get logs for a specific post |

### Connect (OAuth)
| Method | Description |
|--------|-------------|
| `connect.listFacebookPages()` | List Facebook Pages after OAuth (Headless Mode) |
| `connect.listGoogleBusinessLocations()` | List Google Business Locations after OAuth (Headless Mode) |
| `connect.listLinkedInOrganizations()` | Fetch full LinkedIn organization details (Headless Mode) |
| `connect.listPinterestBoardsForSelection()` | List Pinterest Boards after OAuth (Headless Mode) |
| `connect.listSnapchatProfiles()` | List Snapchat Public Profiles after OAuth (Headless Mode) |
| `connect.getConnectUrl()` | Start OAuth connection for a platform |
| `connect.getFacebookPages()` | List available Facebook pages for a connected account |
| `connect.getGmbLocations()` | List available Google Business Profile locations for a connected account |
| `connect.getLinkedInOrganizations()` | Get available LinkedIn organizations for a connected account |
| `connect.getPendingOAuthData()` | Fetch pending OAuth selection data (Headless Mode) |
| `connect.getPinterestBoards()` | List Pinterest boards for a connected account |
| `connect.getRedditSubreddits()` | List Reddit subreddits for a connected account |
| `connect.getTelegramConnectStatus()` | Generate Telegram access code |
| `connect.updateFacebookPage()` | Update selected Facebook page for a connected account |
| `connect.updateGmbLocation()` | Update selected Google Business Profile location for a connected account |
| `connect.updateLinkedInOrganization()` | Switch LinkedIn account type (personal/organization) |
| `connect.updatePinterestBoards()` | Set default Pinterest board on the connection |
| `connect.updateRedditSubreddits()` | Set default subreddit on the connection |
| `connect.completeTelegramConnect()` | Check Telegram connection status |
| `connect.connectBlueskyCredentials()` | Connect Bluesky using app password |
| `connect.handleOAuthCallback()` | Complete OAuth token exchange manually (for server-side flows) |
| `connect.initiateTelegramConnect()` | Direct Telegram connection (power users) |
| `connect.selectFacebookPage()` | Select a Facebook Page to complete the connection (Headless Mode) |
| `connect.selectGoogleBusinessLocation()` | Select a Google Business location to complete the connection (Headless Mode) |
| `connect.selectLinkedInOrganization()` | Select LinkedIn organization or personal account after OAuth |
| `connect.selectPinterestBoard()` | Select a Pinterest Board to complete the connection (Headless Mode) |
| `connect.selectSnapchatProfile()` | Select a Snapchat Public Profile to complete the connection (Headless Mode) |

### Reddit
| Method | Description |
|--------|-------------|
| `reddit.getRedditFeed()` | Fetch subreddit feed via a connected account |
| `reddit.searchReddit()` | Search Reddit posts via a connected account |

### Comments (Inbox)
| Method | Description |
|--------|-------------|
| `comments.listInboxComments()` | List posts with comments across all accounts |
| `comments.getInboxPostComments()` | Get comments for a post |
| `comments.deleteInboxComment()` | Delete a comment |
| `comments.hideInboxComment()` | Hide a comment |
| `comments.likeInboxComment()` | Like a comment |
| `comments.replyToInboxPost()` | Reply to a post or comment |
| `comments.sendPrivateReplyToComment()` | Send private reply to comment author |
| `comments.unhideInboxComment()` | Unhide a comment |
| `comments.unlikeInboxComment()` | Unlike a comment |

### GMB Food Menus
| Method | Description |
|--------|-------------|
| `gmbFoodMenus.getGoogleBusinessFoodMenus()` | Get Google Business Profile food menus |
| `gmbFoodMenus.updateGoogleBusinessFoodMenus()` | Update Google Business Profile food menus |

### Messages (Inbox)
| Method | Description |
|--------|-------------|
| `messages.listInboxConversations()` | List conversations across all accounts |
| `messages.getInboxConversation()` | Get conversation details |
| `messages.getInboxConversationMessages()` | Get messages in a conversation |
| `messages.updateInboxConversation()` | Update conversation status |
| `messages.sendInboxMessage()` | Send a message |

### Reviews (Inbox)
| Method | Description |
|--------|-------------|
| `reviews.listInboxReviews()` | List reviews across all accounts |
| `reviews.deleteInboxReviewReply()` | Delete a review reply |
| `reviews.replyToInboxReview()` | Reply to a review |

### Invites
| Method | Description |
|--------|-------------|
| `invites.createInviteToken()` | Create a team member invite token |

## Requirements

- Node.js 18+
- [Late API key](https://getlate.dev) (free tier available)

## Links

- [Documentation](https://docs.getlate.dev)
- [Dashboard](https://getlate.dev/dashboard)
- [Changelog](https://docs.getlate.dev/changelog)

## License

Apache-2.0
