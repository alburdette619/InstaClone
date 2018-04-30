import { NavigationScreenProp } from 'react-navigation';
import { ImageURISource } from 'react-native';

export const nav: NavigationScreenProp<any, any> = {
  navigate: jest.fn(),
  state: {},
  dispatch: jest.fn(),
  goBack: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
};

export const source: ImageURISource = {
  uri: 'https://picsum.photos/200/300/?random',
};
