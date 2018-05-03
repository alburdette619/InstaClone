import { Alert, AsyncStorage } from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import { NavigationParams } from 'react-navigation';
import { AddImageResult } from '../types/interfaces';

const showImageSourceAlert = (onImageSave: Function) => {
  Alert.alert(
    '',
    'Upload Image From:',
    [
      {
        text: 'Camera',
        onPress: () => {
          addFromCamera().then(result => {
            if (result) {
              handleCallback(onImageSave, result);
            }
          });
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          addFromCameraRoll().then(result => {
            if (result) {
              handleCallback(onImageSave, result);
            }
          });
        },
      },
    ],
    { cancelable: true }
  );
};

const handleCallback = (callback: Function, result: AddImageResult) => {
  if (!result.cancelled && result.uri) {
    callback(result.uri);
  }
};

const addImage = (image: ImagePicker.ImageResult) => {
  const { cancelled } = image;
  let uri: string = '';
  if (!cancelled) {
    ({ uri } = image as ImagePicker.ImageInfo);
  }

  return { cancelled, uri } as AddImageResult;
};

const addFromCameraRoll = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === 'granted') {
    const newImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
    });

    return addImage(newImage);
  }
};

const addFromCamera = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  if (status === 'granted') {
    const newImage = await ImagePicker.launchCameraAsync();

    return addImage(newImage);
  }
};

export default showImageSourceAlert;
