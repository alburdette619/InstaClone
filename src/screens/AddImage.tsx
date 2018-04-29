import React, { Component } from 'react';
import { View, Text } from 'react-native';

export interface AddImageProps {};
interface AddImageState {};

class AddImage extends Component {
  static navigationOptions = {
    title: 'Add',
  };

  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Add Image</Text>
      </View>
    );
  }
}

export default AddImage;
