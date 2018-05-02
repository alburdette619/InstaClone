import * as React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import * as screens from './src/screens';

export default class App extends React.Component<{}> {
  render() {
    return <RootStack />;
  }
}

const MainStack = StackNavigator(
  {
    UserImages: {
      screen: screens.UserImages,
    },
    UserAccount: {
      screen: screens.UserAccount,
    },
  },
  {
    initialRouteName: 'UserImages',
    headerMode: 'float',
    headerTransitionPreset: 'fade-in-place',
  }
);

const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    ImageModal: {
      screen: screens.ImageModal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
