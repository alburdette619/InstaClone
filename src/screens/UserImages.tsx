import React, { Component } from 'react';
import { View, Text } from 'react-native';

export interface UserImagesProps {};
interface UserImagesState {};

class UserImages extends Component {
  static navigationOptions = {
    title: 'Images',
  };
  
  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>User Images</Text>
      </View>
    );
  }
}

export default UserImages;