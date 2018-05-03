import * as React from 'react';
import * as renderer from 'react-test-renderer';
import LightboxImage from '../../src/components/LightboxImage';
import * as mocks from '../__mocks__/mocks';

it('renders without crashing', () => {
  const rendered = renderer
    .create(<LightboxImage source={mocks.source} navigation={mocks.nav} />)
    .toJSON();
  expect(rendered).toMatchSnapshot();
});
