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
  if (typeof error === 'object') {
    // Check if it has a message property
    const errorWithMessage = error as { message?: unknown };
    if ('message' in error && typeof errorWithMessage.message === 'string') {
      return errorWithMessage.message;
    }

    // Handle arrays of errors (take the first one)
    if (Array.isArray(error) && error.length > 0) {
      return formatFieldError(error[0]);
    }

    // Handle Zod-style error with issues array
    if (
      'issues' in error
    ) {
      const zodError = error as { issues: { message?: string }[] };
      const issues = zodError.issues;
      if (Array.isArray(issues) && issues.length > 0 && issues[0].message) {
        return issues[0].message;
      }
    }
  }

  // Fallback to string conversion
  return String(error);
};
