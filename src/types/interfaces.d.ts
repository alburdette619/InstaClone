import { ImageURISource } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

export default interface CommonProps {
  navigation: NavigationScreenProp<any, any>;
}

export interface SingleImageProps extends CommonProps {
  source: ImageURISource;
}

export interface ImageListProps extends CommonProps {
  sources: ImageURISource[];
}
