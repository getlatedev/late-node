/**
 * Base error class for Late API errors
 */
export class LateApiError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number,
    code?: string,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'LateApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LateApiError);
    }
  }

  /**
   * Check if this is a rate limit error
   */
  isRateLimited(): boolean {
    return this.statusCode === 429;
  }

  /**
   * Check if this is an authentication error
   */
  isAuthError(): boolean {
    return this.statusCode === 401;
  }

  /**
   * Check if this is a permission/access error
   */
  isForbidden(): boolean {
    return this.statusCode === 403;
  }

  /**
   * Check if this is a not found error
   */
  isNotFound(): boolean {
    return this.statusCode === 404;
  }

  /**
   * Check if this is a validation error
   */
  isValidationError(): boolean {
    return this.statusCode === 400;
  }

  /**
   * Check if this is a payment required error
   */
  isPaymentRequired(): boolean {
    return this.statusCode === 402;
  }
}

/**
 * Rate limit error with additional rate limit info
 */
export class RateLimitError extends LateApiError {
  public readonly limit?: number;
  public readonly remaining?: number;
  public readonly resetAt?: Date;

  constructor(
    message: string,
    limit?: number,
    remaining?: number,
    resetAt?: Date
  ) {
    super(message, 429, 'rate_limit_exceeded');
    this.name = 'RateLimitError';
    this.limit = limit;
    this.remaining = remaining;
    this.resetAt = resetAt;
  }

  /**
   * Get seconds until rate limit resets
   */
  getSecondsUntilReset(): number | undefined {
    if (!this.resetAt) return undefined;
    return Math.max(0, Math.ceil((this.resetAt.getTime() - Date.now()) / 1000));
  }
}

/**
 * Validation error with field-specific details
 */
export class ValidationError extends LateApiError {
  public readonly fields?: Record<string, string[]>;

  constructor(message: string, fields?: Record<string, string[]>) {
    super(message, 400, 'validation_error', { fields });
    this.name = 'ValidationError';
    this.fields = fields;
  }
}

/**
 * Parse an error response from the API
 */
export function parseApiError(
  response: Response,
  body?: { error?: string; message?: string; code?: string; details?: Record<string, unknown> }
): LateApiError {
  const message = body?.error || body?.message || response.statusText || 'Unknown error';
  const code = body?.code;
  const details = body?.details;

  // Handle rate limit errors
  if (response.status === 429) {
    const limit = response.headers.get('X-RateLimit-Limit');
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const reset = response.headers.get('X-RateLimit-Reset');

    return new RateLimitError(
      message,
      limit ? parseInt(limit, 10) : undefined,
      remaining ? parseInt(remaining, 10) : undefined,
      reset ? new Date(parseInt(reset, 10) * 1000) : undefined
    );
  }

  // Handle validation errors
  if (response.status === 400 && details?.fields) {
    return new ValidationError(message, details.fields as Record<string, string[]>);
  }

  return new LateApiError(message, response.status, code, details);
}
