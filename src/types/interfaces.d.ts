import { ImageURISource } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

export default interface CommonProps {
  navigation: NavigationScreenProp<any, any>;
}

export interface SingleImageProps extends CommonProps {
  source: ImageURISource | string;
}

export interface ImageListProps extends CommonProps {
  sources: ImageURISource[];
}

export interface AddImageResult {
  cancelled: boolean;
  uri: string;
}
