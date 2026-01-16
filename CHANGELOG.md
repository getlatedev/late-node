# Changelog

All notable changes to the Late Node.js SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-01-16

### Added
- Initial public release
- Full coverage of Late API endpoints
- TypeScript support with full type definitions
- Support for all 13 social media platforms: Instagram, TikTok, YouTube, LinkedIn, X/Twitter, Facebook, Pinterest, Threads, Bluesky, Reddit, Snapchat, Telegram, and Google Business Profile
- Error handling with specialized error classes (`LateApiError`, `RateLimitError`, `ValidationError`)
- Rate limit information in error responses
- ESLint configuration for code quality
- Comprehensive test suite

### API Coverage
- Posts: create, list, get, update, delete, retry, bulk upload
- Accounts: list, health check, follower stats, Google Business reviews, LinkedIn mentions
- Profiles: create, list, get, update, delete
- Analytics: post metrics, LinkedIn analytics, YouTube daily views
- Account Groups: create, list, update, delete
- Queue: slots management, preview
- Webhooks: settings management, logs, testing
- API Keys: create, list, delete
- Media: presigned URL generation
- Tools: downloads, hashtag checking, transcripts
- Users: list, get
- Usage: stats
- Logs: list, get
- Connect: OAuth flows for all platforms
- Reddit: feed, search
- Invites: platform invites management
