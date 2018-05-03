import React, { Component } from 'react';
import {
  AsyncStorage,
  ImageURISource,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import CommonProps from '../types/interfaces';
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
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position" style={styles.innerContainer}>
          <Avatar
            height={360}
            rounded
            containerStyle={styles.avatarContainerStyle}
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
            style={styles.input}
            onChangeText={text => this.setState({ currentUsername: text })}
            onEndEditing={event => this.setUsername(event.nativeEvent.text)}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginVertical: 16,
  },
  avatarContainerStyle: { alignSelf: 'center' },
  input: {
    height: 60,
    fontSize: 28,
    marginTop: 32,
  },
});

export default UserAccount;
