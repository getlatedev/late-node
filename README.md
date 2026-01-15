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
const { data: post } = await late.posts.create({
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
const { data: post } = await late.posts.create({
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
const { data: post } = await late.posts.create({
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
const { data: presign } = await late.media.getPresignedUrl({
  body: { filename: 'video.mp4', contentType: 'video/mp4' },
});

// 2. Upload your file
await fetch(presign.uploadUrl, {
  method: 'PUT',
  body: videoBuffer,
  headers: { 'Content-Type': 'video/mp4' },
});

// 3. Create post with media
const { data: post } = await late.posts.create({
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
const { data } = await late.analytics.get({
  query: { postId: 'post_xxx' },
});

console.log('Views:', data.analytics.views);
console.log('Likes:', data.analytics.likes);
console.log('Engagement Rate:', data.analytics.engagementRate);
```

### List Connected Accounts

```typescript
const { data } = await late.accounts.list();

for (const account of data.accounts) {
  console.log(`${account.platform}: @${account.username}`);
}
```

## Error Handling

```typescript
import Late, { LateApiError, RateLimitError, ValidationError } from '@getlatedev/node';

try {
  await late.posts.create({ body: { /* ... */ } });
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
| `posts.list()` | List all posts |
| `posts.create()` | Create and schedule a post |
| `posts.get()` | Get a specific post |
| `posts.update()` | Update a scheduled post |
| `posts.delete()` | Delete a post |
| `posts.retry()` | Retry a failed post |
| `posts.bulkUpload()` | Upload multiple posts at once |
| `posts.getLogs()` | Get publishing logs for a post |

### Accounts
| Method | Description |
|--------|-------------|
| `accounts.list()` | List connected social accounts |
| `accounts.update()` | Update account settings |
| `accounts.delete()` | Disconnect an account |
| `accounts.getFollowerStats()` | Get follower growth data |
| `accounts.getAllHealth()` | Check health of all accounts |
| `accounts.getHealth()` | Check health of a specific account |

### Profiles
| Method | Description |
|--------|-------------|
| `profiles.list()` | List workspace profiles |
| `profiles.create()` | Create a new profile |
| `profiles.get()` | Get a specific profile |
| `profiles.update()` | Update a profile |
| `profiles.delete()` | Delete a profile |

### Analytics
| Method | Description |
|--------|-------------|
| `analytics.get()` | Get post performance metrics |
| `analytics.getYouTubeDailyViews()` | Get YouTube daily view breakdown |
| `analytics.getLinkedInAggregate()` | Get LinkedIn organization analytics |
| `analytics.getLinkedInPostAnalytics()` | Get LinkedIn post-level analytics |

### Account Groups
| Method | Description |
|--------|-------------|
| `accountGroups.list()` | List account groups |
| `accountGroups.create()` | Create an account group |
| `accountGroups.update()` | Update an account group |
| `accountGroups.delete()` | Delete an account group |

### Queue
| Method | Description |
|--------|-------------|
| `queue.listSlots()` | List queue time slots |
| `queue.createSlot()` | Create a queue slot |
| `queue.updateSlot()` | Update a queue slot |
| `queue.deleteSlot()` | Delete a queue slot |
| `queue.preview()` | Preview upcoming queued posts |
| `queue.getNextSlot()` | Get next available slot |

### Webhooks
| Method | Description |
|--------|-------------|
| `webhooks.getSettings()` | Get webhook configuration |
| `webhooks.createSettings()` | Create webhook settings |
| `webhooks.updateSettings()` | Update webhook settings |
| `webhooks.deleteSettings()` | Delete webhook settings |
| `webhooks.test()` | Send a test webhook |
| `webhooks.getLogs()` | Get webhook delivery logs |

### API Keys
| Method | Description |
|--------|-------------|
| `apiKeys.list()` | List API keys |
| `apiKeys.create()` | Create a new API key |
| `apiKeys.delete()` | Delete an API key |

### Media
| Method | Description |
|--------|-------------|
| `media.getPresignedUrl()` | Get presigned URL for file upload |

### Tools
| Method | Description |
|--------|-------------|
| `tools.downloadYouTube()` | Download YouTube video |
| `tools.getYouTubeTranscript()` | Get YouTube video transcript |
| `tools.downloadInstagram()` | Download Instagram media |
| `tools.checkInstagramHashtags()` | Check if hashtags are banned |
| `tools.downloadTikTok()` | Download TikTok video |
| `tools.downloadTwitter()` | Download Twitter/X media |
| `tools.downloadFacebook()` | Download Facebook video |
| `tools.downloadLinkedIn()` | Download LinkedIn video |
| `tools.downloadBluesky()` | Download Bluesky media |

### Users
| Method | Description |
|--------|-------------|
| `users.list()` | List team users |
| `users.get()` | Get a specific user |

### Usage
| Method | Description |
|--------|-------------|
| `usage.getStats()` | Get API usage statistics |

### Logs
| Method | Description |
|--------|-------------|
| `logs.list()` | List publishing logs |
| `logs.get()` | Get a specific log entry |

### Connect (OAuth)
| Method | Description |
|--------|-------------|
| `connect.getUrl()` | Get OAuth URL for a platform |
| `connect.handleCallback()` | Handle OAuth callback |
| `connect.facebook.listPages()` | List Facebook pages to connect |
| `connect.facebook.selectPage()` | Select a Facebook page |
| `connect.googleBusiness.listLocations()` | List Google Business locations |
| `connect.googleBusiness.selectLocation()` | Select a location |
| `connect.linkedIn.listOrganizations()` | List LinkedIn organizations |
| `connect.linkedIn.selectOrganization()` | Select an organization |
| `connect.pinterest.listBoards()` | List Pinterest boards |
| `connect.pinterest.selectBoard()` | Select a board |
| `connect.snapchat.listProfiles()` | List Snapchat profiles |
| `connect.snapchat.selectProfile()` | Select a profile |
| `connect.bluesky.connectCredentials()` | Connect with Bluesky credentials |
| `connect.telegram.getStatus()` | Get Telegram connection status |
| `connect.telegram.initiate()` | Start Telegram connection |
| `connect.telegram.complete()` | Complete Telegram connection |

### Reddit
| Method | Description |
|--------|-------------|
| `reddit.search()` | Search Reddit |
| `reddit.getFeed()` | Get Reddit feed |

### Invites
| Method | Description |
|--------|-------------|
| `invites.createToken()` | Create an invite token |
| `invites.list()` | List platform invites |
| `invites.create()` | Create a platform invite |
| `invites.delete()` | Delete a platform invite |

## Requirements

- Node.js 18+
- [Late API key](https://getlate.dev) (free tier available)

## Links

- [Documentation](https://docs.getlate.dev)
- [Dashboard](https://getlate.dev/dashboard)
- [Changelog](https://docs.getlate.dev/changelog)

## License

Apache-2.0
