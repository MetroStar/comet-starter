/**
 * Utility function to format form field errors for display
 */
export const formatFieldError = (error: unknown): string | undefined => {
  if (!error) return undefined;

  // If it's already a string, return it
  if (typeof error === 'string') {
    return error;
  }

  // Handle Zod error objects
  if (typeof error === 'object' && error !== null) {
    // Check if it has a message property
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }

    // Handle arrays of errors (take the first one)
    if (Array.isArray(error) && error.length > 0) {
      return formatFieldError(error[0]);
    }

    // Handle Zod-style error with issues array
    if (
      'issues' in error &&
      Array.isArray((error as { issues: unknown[] }).issues)
    ) {
      const issues = (error as { issues: { message?: string }[] }).issues;
      if (issues.length > 0 && issues[0].message) {
        return issues[0].message;
      }
    }
  }

  // Fallback to string conversion
  return String(error);
};
