import { describe, it, expect, vi } from 'vitest';
import {
  LateApiError,
  RateLimitError,
  ValidationError,
  parseApiError,
} from '../src/errors';

describe('LateApiError', () => {
  it('should create error with all properties', () => {
    const error = new LateApiError('Test error', 400, 'test_code', {
      foo: 'bar',
    });
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('test_code');
    expect(error.details).toEqual({ foo: 'bar' });
    expect(error.name).toBe('LateApiError');
  });

  it('should check rate limited status', () => {
    const rateLimited = new LateApiError('Rate limited', 429);
    const notRateLimited = new LateApiError('Bad request', 400);

    expect(rateLimited.isRateLimited()).toBe(true);
    expect(notRateLimited.isRateLimited()).toBe(false);
  });

  it('should check auth error status', () => {
    const authError = new LateApiError('Unauthorized', 401);
    const notAuthError = new LateApiError('Bad request', 400);

    expect(authError.isAuthError()).toBe(true);
    expect(notAuthError.isAuthError()).toBe(false);
  });

  it('should check forbidden status', () => {
    const forbidden = new LateApiError('Forbidden', 403);
    const notForbidden = new LateApiError('Bad request', 400);

    expect(forbidden.isForbidden()).toBe(true);
    expect(notForbidden.isForbidden()).toBe(false);
  });

  it('should check not found status', () => {
    const notFound = new LateApiError('Not found', 404);
    const found = new LateApiError('Bad request', 400);

    expect(notFound.isNotFound()).toBe(true);
    expect(found.isNotFound()).toBe(false);
  });

  it('should check validation error status', () => {
    const validationError = new LateApiError('Bad request', 400);
    const serverError = new LateApiError('Server error', 500);

    expect(validationError.isValidationError()).toBe(true);
    expect(serverError.isValidationError()).toBe(false);
  });

  it('should check payment required status', () => {
    const paymentRequired = new LateApiError('Payment required', 402);
    const notPaymentRequired = new LateApiError('Bad request', 400);

    expect(paymentRequired.isPaymentRequired()).toBe(true);
    expect(notPaymentRequired.isPaymentRequired()).toBe(false);
  });

  it('should be instanceof Error', () => {
    const error = new LateApiError('Test', 400);
    expect(error instanceof Error).toBe(true);
    expect(error instanceof LateApiError).toBe(true);
  });
});

describe('RateLimitError', () => {
  it('should create error with rate limit info', () => {
    const resetAt = new Date('2025-01-01T00:00:00Z');
    const error = new RateLimitError('Rate limited', 100, 0, resetAt);

    expect(error.message).toBe('Rate limited');
    expect(error.statusCode).toBe(429);
    expect(error.code).toBe('rate_limit_exceeded');
    expect(error.name).toBe('RateLimitError');
    expect(error.limit).toBe(100);
    expect(error.remaining).toBe(0);
    expect(error.resetAt).toBe(resetAt);
  });

  it('should calculate seconds until reset', () => {
    const now = Date.now();
    const resetAt = new Date(now + 60000); // 60 seconds from now
    const error = new RateLimitError('Rate limited', 100, 0, resetAt);

    const seconds = error.getSecondsUntilReset();
    expect(seconds).toBeGreaterThanOrEqual(59);
    expect(seconds).toBeLessThanOrEqual(61);
  });

  it('should return 0 if reset time is in past', () => {
    const resetAt = new Date(Date.now() - 1000); // 1 second ago
    const error = new RateLimitError('Rate limited', 100, 0, resetAt);

    expect(error.getSecondsUntilReset()).toBe(0);
  });

  it('should return undefined if no reset time', () => {
    const error = new RateLimitError('Rate limited');
    expect(error.getSecondsUntilReset()).toBeUndefined();
  });

  it('should be instanceof LateApiError', () => {
    const error = new RateLimitError('Rate limited');
    expect(error instanceof LateApiError).toBe(true);
    expect(error instanceof RateLimitError).toBe(true);
  });
});

describe('ValidationError', () => {
  it('should create error with field errors', () => {
    const fields = {
      content: ['Content is required'],
      platforms: ['At least one platform is required'],
    };
    const error = new ValidationError('Validation failed', fields);

    expect(error.message).toBe('Validation failed');
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('validation_error');
    expect(error.name).toBe('ValidationError');
    expect(error.fields).toEqual(fields);
  });

  it('should be instanceof LateApiError', () => {
    const error = new ValidationError('Validation failed');
    expect(error instanceof LateApiError).toBe(true);
    expect(error instanceof ValidationError).toBe(true);
  });
});

describe('parseApiError', () => {
  function createMockResponse(
    status: number,
    statusText: string,
    headers: Record<string, string> = {}
  ): Response {
    return {
      status,
      statusText,
      headers: {
        get: (name: string) => headers[name] || null,
      },
    } as Response;
  }

  it('should parse basic error response', () => {
    const response = createMockResponse(400, 'Bad Request');
    const body = { error: 'Invalid request', code: 'invalid_request' };

    const error = parseApiError(response, body);

    expect(error.message).toBe('Invalid request');
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('invalid_request');
  });

  it('should use message field if error is not present', () => {
    const response = createMockResponse(400, 'Bad Request');
    const body = { message: 'Error message' };

    const error = parseApiError(response, body);

    expect(error.message).toBe('Error message');
  });

  it('should use statusText as fallback', () => {
    const response = createMockResponse(400, 'Bad Request');

    const error = parseApiError(response, {});

    expect(error.message).toBe('Bad Request');
  });

  it('should parse rate limit error with headers', () => {
    const response = createMockResponse(429, 'Too Many Requests', {
      'X-RateLimit-Limit': '100',
      'X-RateLimit-Remaining': '0',
      'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 60),
    });
    const body = { error: 'Rate limit exceeded' };

    const error = parseApiError(response, body);

    expect(error instanceof RateLimitError).toBe(true);
    expect(error.message).toBe('Rate limit exceeded');
    if (error instanceof RateLimitError) {
      expect(error.limit).toBe(100);
      expect(error.remaining).toBe(0);
      expect(error.resetAt).toBeInstanceOf(Date);
    }
  });

  it('should parse validation error with fields', () => {
    const response = createMockResponse(400, 'Bad Request');
    const body = {
      error: 'Validation failed',
      details: {
        fields: {
          content: ['Content is required'],
        },
      },
    };

    const error = parseApiError(response, body);

    expect(error instanceof ValidationError).toBe(true);
    if (error instanceof ValidationError) {
      expect(error.fields).toEqual({ content: ['Content is required'] });
    }
  });

  it('should handle missing body', () => {
    const response = createMockResponse(500, 'Internal Server Error');

    const error = parseApiError(response);

    expect(error.message).toBe('Internal Server Error');
    expect(error.statusCode).toBe(500);
  });
});
