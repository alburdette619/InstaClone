import * as React from 'react';
import { ImageURISource } from 'react-native';
import * as renderer from 'react-test-renderer';
import ImageList from '../../src/components/ImageList';
import * as mocks from '../__mocks__/mocks';

it('renders without crashing', () => {
  const sources: [ImageURISource, ImageURISource, ImageURISource] = [
    mocks.source,
    mocks.source,
    mocks.source,
  ];

  const rendered = renderer
    .create(<ImageList sources={sources} navigation={mocks.nav} />)
    .toJSON();
  expect(rendered).toMatchSnapshot();
});
