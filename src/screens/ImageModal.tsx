import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import CommonProps from '../types/interfaces';

const ImageModal = (props: CommonProps) => {
  const { navigation } = props;
  const {
    state: {
      params: { source },
    },
  } = navigation;

  return (
    <View style={[styles.container, styles.flex]}>
      <Icon
        type="material-community"
        name="close"
        color="white"
        onPress={() => navigation.goBack()}
        size={24}
        containerStyle={styles.iconContainerStyle}
      />
      <Image source={source} resizeMode="contain" style={styles.flex} />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { backgroundColor: 'black', alignItems: 'stretch' },
  iconContainerStyle: { margin: 8, alignSelf: 'flex-end' },
});

export default ImageModal;
