/**
 * Late - Official Node.js library for the Late API
 *
 * @example
 * ```typescript
 * import Late from 'late';
 *
 * const late = new Late();
 *
 * const post = await late.posts.create({
 *   body: {
 *     content: 'Hello world!',
 *     platforms: [{ platform: 'twitter', accountId: 'acc_123' }],
 *     publishNow: true,
 *   },
 * });
 * ```
 *
 * @packageDocumentation
 */

// Main client export
export { Late, Late as default, type ClientOptions } from './client';

// Error exports
export {
  LateApiError,
  RateLimitError,
  ValidationError,
  parseApiError,
} from './errors';

// Re-export generated types for advanced usage
export * from './generated/types.gen';
