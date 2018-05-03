import * as React from 'react';
import * as renderer from 'react-test-renderer';
import UserAccount from '../../src/screens/UserAccount';
import * as mocks from '../__mocks__/mocks';

describe('Tests the states of UserAccount', () => {
  it('renders without crashing with an image source', () => {
    const nav = {
      ...mocks.nav,
      state: {
        params: { source: mocks.source, username: 'TEST', reload: jest.fn() },
      },
    };

    const rendered = renderer.create(<UserAccount navigation={nav} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders without crashing with the default icon source', () => {
    const nav = {
      ...mocks.nav,
      state: {
        params: {
          source: 'account-outline',
          username: 'TEST',
          reload: jest.fn(),
        },
      },
    };
    const rendered = renderer.create(<UserAccount navigation={nav} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
