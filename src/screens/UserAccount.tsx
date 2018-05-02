import React, { Component } from 'react';
import { View, Text } from 'react-native';

export interface UserAccountProps {}
interface UserAccountState {}

class UserAccount extends Component {
  static navigationOptions = {
    title: 'Account',
  };

  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>User Account</Text>
      </View>
    );
  }
}

export default UserAccount;
