import React, { Component } from 'react';
import { View, FlatList, ImagePropertiesSourceOptions } from 'react-native';
import LightboxImage from './LightboxImage';
import { NavigationScreenProp } from 'react-navigation';
import { ImageListProps } from '../types/interfaces';

interface ImageListState {
  imageSize: number;
}

class ImageList extends Component<ImageListProps, ImageListState> {
  constructor(props: ImageListProps) {
    super(props);

    this.state = {
      imageSize: 0,
    };
  }

  render() {
    const { sources, navigation } = this.props;
    const { imageSize } = this.state;

    return (
      <View
        style={{ flex: 1 }}
        onLayout={({
          nativeEvent: {
            layout: { width },
          },
        }) => {
          this.setState({ imageSize: width / 3 });
        }}
      >
        <FlatList
          data={sources}
          renderItem={({ item }) => (
            <View
              style={{
                width: imageSize,
                height: imageSize,
              }}
            >
              <LightboxImage source={item} navigation={navigation} />
            </View>
          )}
          numColumns={3}
          keyExtractor={(item, index) => `${item.uri}${index}`}
          extraData={this.state.imageSize}
        />
      </View>
    );
  }
}

export default ImageList;
