import getAvatarSourceProp from '../../src/utils/getAvatarSource';
import { source } from '../__mocks__/mocks';

describe('Test the cases for getAvatarSourceProp util', () => {
  it('should return a source prop using an ImageURISource', () => {
    expect(getAvatarSourceProp(source)).toEqual({ source });
  });

  it('should return a source prop using a string', () => {
    const sourceName = 'account-outlint';
    expect(getAvatarSourceProp(sourceName)).toEqual({
      source: { uri: sourceName },
    });
  });
});
