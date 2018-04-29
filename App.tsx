import * as React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as screens from './src/screens';

export default class App extends React.Component<{}> {
  render() {
    return <RootStack />;
  }
}

const RootStack = TabNavigator(
  {
    UserImages: {
      screen: screens.UserImages,
    },
    AddImage: {
      screen: screens.AddImage,
    },
    UserAccount: {
      screen: screens.UserAccount,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor}) => {
        const { routeName } = navigation.state;
        let iconName = '';
        if (routeName === 'UserImages') {
          iconName = 'image-multiple';
        } else if (routeName === 'AddImage') {
          iconName = 'plus-box';
        } else if (routeName === 'UserAccount') {
          iconName = 'account-box';
        }

        return (
          <MaterialCommunityIcons name={iconName} size={25} color={tintColor || ''} />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: '#19a0d4',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
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
