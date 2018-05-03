import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  Text,
  ImageURISource,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Divider, Icon } from 'react-native-elements';
import { Permissions, ImagePicker } from 'expo';
import { NavigationParams } from 'react-navigation';
import ImageList from '../components/ImageList';
import CommonProps from '../types/interfaces';

interface UserImagesState {
  sources: string[];
  avatarSource: string;
  username: string;
}

class UserImages extends Component<CommonProps, UserImagesState> {
  constructor(props: CommonProps) {
    super(props);
    this.state = {
      avatarSource: 'account-outline',
      sources: [],
      username: '',
    };
  }

  addImage(image: ImagePicker.ImageResult, params: NavigationParams) {
    const { cancelled } = image;
    if (!cancelled) {
      const { uri } = image as ImagePicker.ImageInfo;

      params.addToSources(uri);

      AsyncStorage.getItem('sources', (err, result) => {
        const parsedResult = result ? JSON.parse(result) : [];
        AsyncStorage.setItem(
          'sources',
          JSON.stringify(parsedResult.concat(uri))
        );
      });
    }
  }

  async addFromCameraRoll(params: NavigationParams) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const newImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      });

      this.addImage(newImage, params);
    }
  }

  async addFromCamera(params: NavigationParams) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      const newImage = await ImagePicker.launchCameraAsync();

      this.addImage(newImage, params);
    }
  }

  addToSources = (uri: string) => {
    this.setState({ sources: this.state.sources.concat([uri]) });
  };

  static navigationOptions = ({ navigation }: CommonProps) => {
    const params = navigation.state.params || {};

    return {
      title: 'Images',
      headerRight: (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Icon
            name="camera"
            size={32}
            type="material-community"
            onPress={() => params.addFromCamera(params)}
          />
          <Icon
            name="file-image"
            size={32}
            type="material-community"
            onPress={() => params.addFromCameraRoll(params)}
            containerStyle={{ marginHorizontal: 16 }}
          />
        </View>
      ),
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({
      addFromCameraRoll: this.addFromCameraRoll,
      addFromCamera: this.addFromCamera,
      addImage: this.addImage,
      addToSources: this.addToSources,
    });
  }

  componentDidMount() {
    AsyncStorage.getAllKeys((err, keys) => {
      if (keys && !err) {
        if (!keys.includes('username')) {
          this.setState({ username: 'New User' });
        }

        AsyncStorage.multiGet(keys, (err?: Error[], stores?: string[][]) => {
          if (stores && !err) {
            stores.forEach((results: string[]) => {
              const key = results[0];

              // computed property names seems to be a tricky spot for TS
              // I attempted to do this much more elegantly like this:
              // this.setState({ key: results[1] });
              if (key === 'sources') {
                this.setState({ sources: JSON.parse(results[1]) });
              } else if (key === 'avatarSource') {
                this.setState({ avatarSource: results[1] });
              } else if (key === 'username') {
                this.setState({ username: results[1] });
              }
            });
          }
        });
      }
    });
  }

  mapSourcesToImageURISource = () => {
    const mappedSources = this.state.sources.map(source => {
      return { uri: source };
    });
    return mappedSources as ImageURISource[];
  };

  getAvatarSourceProp() {
    const { avatarSource } = this.state;

    if (avatarSource === 'account-outline') {
      return {
        icon: {
          name: avatarSource,
          color: '#19a0d4',
          type: 'material-community',
          size: 32,
        },
      };
    }

    return { source: { uri: avatarSource } as ImageURISource };
  }

  render() {
    const { sources, avatarSource, username } = this.state;
    const { navigation } = this.props;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.push('UserAccount', { avatarSource, username })
          }
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Avatar
                medium
                rounded
                overlayContainerStyle={{ backgroundColor: 'white' }}
                {...this.getAvatarSourceProp()}
              />
              <Text style={{ fontSize: 24, marginHorizontal: 16 }}>
                {username}
              </Text>
            </View>
            <Icon
              name="chevron-right"
              size={32}
              type="material-community"
              containerStyle={{ marginHorizontal: 8 }}
            />
          </View>
        </TouchableOpacity>
        <Divider style={{ marginVertical: 1 }} />
        <ImageList
          sources={this.mapSourcesToImageURISource()}
          navigation={navigation}
        />
      </View>
    );
  }
}

export default UserImages;
