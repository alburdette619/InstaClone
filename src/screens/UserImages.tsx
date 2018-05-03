import React, { Component } from 'react';
import {
  AsyncStorage,
  ImageURISource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Divider, Icon } from 'react-native-elements';
import { NavigationParams } from 'react-navigation';
import ImageList from '../components/ImageList';
import CommonProps from '../types/interfaces';
import showImageSourceAlert from '../utils/addImage';
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
    showImageSourceAlert(params.addToSources);
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
          containerStyle={styles.headerRightIcon}
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
      <View style={[styles.container, styles.background]}>
        <TouchableOpacity
          onPress={() =>
            navigation.push('UserAccount', {
              username,
              source: avatarSource,
              reload: this.load,
            })
          }
        >
          <View style={styles.userHeader}>
            <View style={styles.userInfo}>
              <Avatar
                medium
                rounded
                overlayContainerStyle={styles.background}
                {...getAvatarSourceProp(this.state.avatarSource) as any}
              />
              <Text style={styles.username}>{username}</Text>
            </View>
            <Icon
              name="chevron-right"
              size={32}
              type="material-community"
              containerStyle={styles.chevronContainerStyle}
            />
          </View>
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <ImageList
          sources={this.mapSourcesToImageURISource()}
          navigation={navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: { backgroundColor: 'white' },
  container: {
    flex: 1,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 8,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  chevronContainerStyle: { marginHorizontal: 8 },
  username: { fontSize: 24, marginHorizontal: 16 },
  divider: { marginVertical: 1 },
  headerRightIcon: { padding: 16 },
});

export default UserImages;
