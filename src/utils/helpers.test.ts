import { lowercaseHyphenateString } from './helpers';

describe('Generic Helper Functions', () => {
  test('should use lowercaseHyphenateString to format a string to be lowercase and hyphenated', () => {
    const testText = lowercaseHyphenateString('A link wiTh strANge Spaces ');

    expect(testText).toEqual('a-link-with-strange-spaces');
  });
});
