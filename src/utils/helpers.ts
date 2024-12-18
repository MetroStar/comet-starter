// Utility function to format string
export const lowercaseHyphenateString = function (dirtyString: string) {
  const cleanString = dirtyString.trim().replace(/\s/g, '-').toLowerCase();

  return cleanString;
};
