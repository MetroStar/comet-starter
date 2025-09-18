import { describe, expect, test } from 'vitest';
import { formatFieldError } from './form-utils';

describe('formatFieldError', () => {
  test('should return undefined for falsy values', () => {
    expect(formatFieldError(null)).toBeUndefined();
    expect(formatFieldError(undefined)).toBeUndefined();
    expect(formatFieldError('')).toBeUndefined();
    expect(formatFieldError(0)).toBeUndefined();
    expect(formatFieldError(false)).toBeUndefined();
  });

  test('should return string as-is when error is already a string', () => {
    const errorMessage = 'This field is required';
    expect(formatFieldError(errorMessage)).toBe(errorMessage);
  });

  test('should handle objects with message property', () => {
    const errorObj = { message: 'Invalid email format' };
    expect(formatFieldError(errorObj)).toBe('Invalid email format');
  });

  test('should handle objects with non-string message property', () => {
    const errorObj = { message: 123 };
    expect(formatFieldError(errorObj)).toBe('[object Object]');
  });

  test('should handle arrays of errors and return first error', () => {
    const errors = ['First error', 'Second error', 'Third error'];
    expect(formatFieldError(errors)).toBe('First error');
  });

  test('should handle nested arrays of errors', () => {
    const nestedErrors = [['Nested first error', 'Nested second error']];
    expect(formatFieldError(nestedErrors)).toBe('Nested first error');
  });

  test('should handle empty arrays', () => {
    expect(formatFieldError([])).toBe('');
  });

  test('should handle Zod-style error objects with issues array', () => {
    const zodError = {
      issues: [
        { message: 'String must contain at least 1 character(s)' },
        { message: 'Second issue' },
      ],
    };
    expect(formatFieldError(zodError)).toBe(
      'String must contain at least 1 character(s)',
    );
  });

  test('should handle Zod-style error objects with empty issues array', () => {
    const zodError = { issues: [] };
    expect(formatFieldError(zodError)).toBe('[object Object]');
  });

  test('should handle Zod-style error objects with issues without message', () => {
    const zodError = {
      issues: [{ code: 'too_small', path: ['field'] }],
    };
    expect(formatFieldError(zodError)).toBe('[object Object]');
  });

  test('should handle complex error objects without message or issues', () => {
    const complexError = {
      type: 'validation',
      field: 'email',
      code: 'INVALID_FORMAT',
    };
    expect(formatFieldError(complexError)).toBe('[object Object]');
  });

  test('should handle numbers as fallback', () => {
    expect(formatFieldError(404)).toBe('404');
    expect(formatFieldError(0)).toBeUndefined(); // 0 is falsy
  });

  test('should handle boolean values as fallback', () => {
    expect(formatFieldError(true)).toBe('true');
    expect(formatFieldError(false)).toBeUndefined(); // false is falsy
  });

  test('should handle arrays with mixed error types', () => {
    const mixedErrors = [
      { message: 'Object with message' },
      'String error',
      { issues: [{ message: 'Zod-style error' }] },
    ];
    expect(formatFieldError(mixedErrors)).toBe('Object with message');
  });

  test('should handle arrays with non-error objects', () => {
    const invalidErrors = [{ notAnError: 'value' }, 123, 'actual error'];
    expect(formatFieldError(invalidErrors)).toBe('[object Object]');
  });

  test('should handle real Zod validation error structure', () => {
    // This mimics what Zod actually returns
    const realZodError = {
      _def: {},
      issues: [
        {
          code: 'too_small',
          minimum: 1,
          type: 'string',
          inclusive: true,
          exact: false,
          message: 'String must contain at least 1 character(s)',
          path: ['email'],
        },
      ],
      name: 'ZodError',
    };
    expect(formatFieldError(realZodError)).toBe(
      'String must contain at least 1 character(s)',
    );
  });

  test('should handle StandardSchemaV1Issue-like objects', () => {
    // This mimics the structure that might come from TanStack Form
    const standardSchemaError = {
      message: 'Please enter a valid email address.',
      path: ['email'],
    };
    expect(formatFieldError(standardSchemaError)).toBe(
      'Please enter a valid email address.',
    );
  });

  test('should handle null in arrays', () => {
    const errorsWithNull = [null, undefined, 'Valid error'];
    expect(formatFieldError(errorsWithNull)).toBeUndefined();
  });

  test('should handle deeply nested error structures', () => {
    const deepError = {
      validation: {
        errors: {
          field: {
            message: 'Deep nested error',
          },
        },
      },
    };
    expect(formatFieldError(deepError)).toBe('[object Object]');
  });
});
