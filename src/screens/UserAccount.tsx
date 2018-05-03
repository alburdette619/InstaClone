import React, { Component } from 'react';
import {
  TextInput,
  View,
  KeyboardAvoidingView,
  ImageURISource,
  AsyncStorage,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import CommonProps, { SingleImageProps } from '../types/interfaces';
import addImage from '../utils/addImage';
import getAvatarSourceProp from '../utils/getAvatarSource';

interface UserAccountState {
  currentUsername: string;
  currentAvatar: ImageURISource | string;
}

class UserAccount extends Component<CommonProps, UserAccountState> {
  constructor(props: CommonProps) {
    super(props);

    const { username, source } = this.props.navigation.state.params;
    this.state = {
      currentUsername: username === 'New User' ? '' : username,
      currentAvatar: source,
    };
  }

  static navigationOptions = {
    title: 'Account',
  };

  setAvatar(uri: string) {
    AsyncStorage.setItem('avatarSource', uri, () => {
      this.setState({ currentAvatar: { uri } });
      const { reload } = this.props.navigation.state.params;
      if (reload) {
        reload();
      }
    });
  }

  setUsername(username: string) {
    AsyncStorage.setItem('username', username, () => {
      const { reload } = this.props.navigation.state.params;
      if (reload) {
        reload();
      }
    });
  }

  render() {
    const { currentUsername, currentAvatar } = this.state;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <KeyboardAvoidingView
          behavior="position"
          style={{
            flex: 1,
            justifyContent: 'space-between',
            marginHorizontal: 8,
            marginVertical: 16,
          }}
        >
          <Avatar
            height={360}
            rounded
            containerStyle={{ alignSelf: 'center' }}
            onPress={() =>
              addImage((uri: string) => {
                this.setAvatar(uri);
              })
            }
            {...getAvatarSourceProp(currentAvatar, 320) as any}
          />
          <TextInput
            value={currentUsername}
            autoCorrect={false}
            placeholder="Username"
            returnKeyType="done"
            style={{
              height: 60,
              fontSize: 28,
              marginTop: 32,
            }}
            onChangeText={text => this.setState({ currentUsername: text })}
            onEndEditing={event => this.setUsername(event.nativeEvent.text)}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default UserAccount;
