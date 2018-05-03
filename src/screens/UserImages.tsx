import React, { Component } from 'react';
import {
  AsyncStorage,
  ImageURISource,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Divider, Icon } from 'react-native-elements';
import { NavigationParams } from 'react-navigation';
import ImageList from '../components/ImageList';
import CommonProps from '../types/interfaces';
import addImage from '../utils/addImage';
import getAvatarSourceProp from '../utils/getAvatarSource';

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

  addToSources = (uri: string) => {
    AsyncStorage.getItem('sources', (err, result) => {
      const parsedResult = result ? JSON.parse(result) : [];
      AsyncStorage.setItem(
        'sources',
        JSON.stringify(parsedResult.concat(uri)),
        () => this.setState({ sources: this.state.sources.concat([uri]) })
      );
    });
  };

  showImageModal(params: NavigationParams) {
    addImage(params.addToSources);
  }

  static navigationOptions = ({ navigation }: CommonProps) => {
    const params = navigation.state.params || {};

    return {
      title: 'Images',
      headerRight: (
        <Icon
          name="plus"
          size={32}
          type="material-community"
          containerStyle={{ padding: 16 }}
          onPress={() => params.showImageModal(params)}
        />
      ),
    };
  };

  load = () => {
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
  };

  /* Life cycle methods */
  componentWillMount() {
    this.props.navigation.setParams({
      addToSources: this.addToSources,
      showImageModal: this.showImageModal,
    });
  }

  componentDidMount() {
    this.load();
  }

  mapSourcesToImageURISource = () => {
    const mappedSources = this.state.sources.map(source => {
      return { uri: source };
    });
    return mappedSources as ImageURISource[];
  };

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
            navigation.push('UserAccount', {
              username,
              source: avatarSource,
              reload: this.load,
            })
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
                {...getAvatarSourceProp(this.state.avatarSource) as any}
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
