import { ImageURISource } from 'react-native';

const getAvatarSourceProp = (
  avatarSource: string | ImageURISource,
  size?: number
) => {
  if (avatarSource === 'account-outline') {
    return {
      icon: {
        size: size || 32,
        name: avatarSource,
        color: '#19a0d4',
        type: 'material-community',
      },
    };
  }

  const source = (<ImageURISource>avatarSource).uri
    ? avatarSource
    : ({ uri: avatarSource } as ImageURISource);

  return { source };
};

export default getAvatarSourceProp;
