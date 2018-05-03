import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ImageListProps } from '../types/interfaces';
import LightboxImage from './LightboxImage';

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
        style={styles.container}
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

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ImageList;
