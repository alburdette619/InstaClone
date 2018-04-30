import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface UserImagesProps {}
interface UserImagesState {}

class UserImages extends Component {
  static navigationOptions = {
    title: 'Images',
    headerRight: <MaterialCommunityIcons name="plus" size={32} />,
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
