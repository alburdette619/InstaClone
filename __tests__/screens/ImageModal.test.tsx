import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ImageModal from '../../src/screens/ImageModal';
import * as mocks from '../__mocks__/mocks';

it('renders without crashing', () => {
  const nav = { ...mocks.nav, state: { params: { source: mocks.source } } };

  const rendered = renderer.create(<ImageModal navigation={nav} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
