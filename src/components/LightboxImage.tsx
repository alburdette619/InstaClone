import React from 'react';
import {
  Image,
  ImageURISource,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SingleImageProps } from '../types/interfaces';

const LightBoxImage = (props: SingleImageProps) => {
  const { navigation, source } = props;

  const onImagePress = () => navigation.navigate('ImageModal', { source });
  return (
    <TouchableOpacity
      onPress={() => onImagePress()}
      style={[styles.touchableContainer, styles.flex]}
    >
      <Image
        resizeMode="cover"
        source={source as ImageURISource}
        style={styles.flex}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  touchableContainer: { borderColor: 'white', borderWidth: 1 },
});

export default LightBoxImage;
