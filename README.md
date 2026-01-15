# Late Node.js Library

[![npm version](https://img.shields.io/npm/v/late.svg)](https://www.npmjs.com/package/late)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

The official Node.js library for the [Late API](https://getlate.dev) - schedule social media posts across Instagram, TikTok, YouTube, LinkedIn, X/Twitter, Facebook, Pinterest, Threads, and more.

## Installation

```bash
npm install late
```

## Usage

```typescript
import Late from 'late';

const late = new Late({
  apiKey: process.env['LATE_API_KEY'], // This is the default and can be omitted
});

async function main() {
  // Create and publish a post
  const post = await late.posts.create({
    body: {
      content: 'Hello from the Late SDK! 🚀',
      platforms: [
        { platform: 'twitter', accountId: 'acc_xxx' },
        { platform: 'linkedin', accountId: 'acc_yyy' },
      ],
      publishNow: true,
    },
  });

  console.log(post.data);
}

main();
```

## Configuration

The client can be configured with the following options:

```typescript
const late = new Late({
  apiKey: 'sk_...', // Defaults to process.env['LATE_API_KEY']
  baseURL: 'https://getlate.dev/api', // Default
  timeout: 60000, // Request timeout in ms
  defaultHeaders: {
    'X-Custom-Header': 'value',
  },
});
```

## Examples

### Schedule a Post

```typescript
const post = await late.posts.create({
  body: {
    content: 'Scheduled post from the SDK',
    platforms: [{ platform: 'instagram', accountId: 'acc_xxx' }],
    scheduledFor: new Date('2025-02-01T10:00:00Z').toISOString(),
  },
});
```

### Multi-Platform with Platform-Specific Content

```typescript
const post = await late.posts.create({
  body: {
    content: 'Default content for all platforms',
    platforms: [
      {
        platform: 'twitter',
        accountId: 'acc_twitter',
        platformSpecificContent: 'Shorter content for X #hashtags',
      },
      {
        platform: 'linkedin',
        accountId: 'acc_linkedin',
        platformSpecificContent: 'Professional content for LinkedIn',
      },
    ],
    publishNow: true,
  },
});
```

### List Posts

```typescript
const { data } = await late.posts.list({
  query: {
    status: 'scheduled',
    limit: 20,
  },
});

for (const post of data.posts) {
  console.log(post.content, post.scheduledFor);
}
```

### Upload Media

```typescript
// 1. Get presigned URL
const { data: presign } = await late.media.getPresignedUrl({
  body: {
    filename: 'image.jpg',
    contentType: 'image/jpeg',
  },
});

// 2. Upload file
await fetch(presign.uploadUrl, {
  method: 'PUT',
  body: imageBuffer,
  headers: { 'Content-Type': 'image/jpeg' },
});

// 3. Create post with media
await late.posts.create({
  body: {
    content: 'Post with image',
    mediaUrls: [presign.publicUrl],
    platforms: [{ platform: 'instagram', accountId: 'acc_xxx' }],
    publishNow: true,
  },
});
```

### Get Analytics

```typescript
const { data: analytics } = await late.analytics.get({
  query: { postId: 'post_xxx' },
});

console.log('Impressions:', analytics.analytics.impressions);
console.log('Engagement:', analytics.analytics.engagementRate);
```

### List Connected Accounts

```typescript
const { data } = await late.accounts.list();

for (const account of data.accounts) {
  console.log(`${account.platform}: @${account.username}`);
}
```

### Configure Webhooks

```typescript
await late.webhooks.updateSettings({
  body: {
    url: 'https://your-app.com/webhooks/late',
    events: ['post.published', 'post.failed', 'account.disconnected'],
    secret: 'your-webhook-secret',
  },
});
```

## Error Handling

```typescript
import Late, { LateApiError, RateLimitError, ValidationError } from 'late';

const late = new Late();

try {
  await late.posts.create({ body: { ... } });
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry in ${error.getSecondsUntilReset()} seconds`);
  } else if (error instanceof ValidationError) {
    console.log('Validation errors:', error.fields);
  } else if (error instanceof LateApiError) {
    console.log(`API error ${error.statusCode}: ${error.message}`);
  }
}
```

## API Reference

### Posts

| Method | Description |
|--------|-------------|
| `posts.list(params)` | List posts |
| `posts.create(params)` | Create a post |
| `posts.get(params)` | Get a post |
| `posts.update(params)` | Update a post |
| `posts.delete(params)` | Delete a post |
| `posts.retry(params)` | Retry a failed post |
| `posts.bulkUpload(params)` | Upload multiple posts |

### Accounts

| Method | Description |
|--------|-------------|
| `accounts.list()` | List connected accounts |
| `accounts.update(params)` | Update an account |
| `accounts.delete(params)` | Disconnect an account |
| `accounts.getFollowerStats()` | Get follower statistics |
| `accounts.getAllHealth()` | Get health for all accounts |

### Analytics

| Method | Description |
|--------|-------------|
| `analytics.get(params)` | Get post analytics |
| `analytics.getYouTubeDailyViews(params)` | Get YouTube daily views |
| `analytics.getLinkedInAggregate(params)` | Get LinkedIn org analytics |

See the [API documentation](https://getlate.dev/docs/api) for all available methods.

## Requirements

- Node.js 18 or later
- An API key from [Late](https://getlate.dev)

## License

Apache-2.0
