import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import SingleImageProps from '../types/interfaces';

const LightBoxImage = (props: SingleImageProps) => {
  const { navigation, source } = props;

  const onImagePress = () => navigation.navigate('ImageModal', { source });
  return (
    <TouchableOpacity
      onPress={() => onImagePress()}
      style={{ flex: 1, borderColor: 'white', borderWidth: 1 }}
    >
      <Image resizeMode="cover" source={source} style={{ flex: 1 }} />
    </TouchableOpacity>
  );
};

export default LightBoxImage;
