// Utility function to format string
export const lowercaseHyphenateString = (dirtyString: string) => {
  const cleanString = dirtyString.trim().replace(/\s/g, '-').toLowerCase();

  return cleanString;
};
