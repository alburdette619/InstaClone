import React from 'react';
import { View, Image, ImagePropertiesSourceOptions } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
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
    <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'stretch' }}>
      <Icon
        type="material-community"
        name="close"
        color="white"
        onPress={() => navigation.goBack()}
        size={24}
        containerStyle={{ margin: 4, alignSelf: 'flex-start' }}
      />
      <Image source={source} resizeMode="contain" style={{ flex: 1 }} />
    </View>
  );
};

export default ImageModal;
