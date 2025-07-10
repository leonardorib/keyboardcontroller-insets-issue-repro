import {Platform, requireNativeComponent, View, ViewStyle} from 'react-native';

interface InsetDemoViewProps {
  style?: ViewStyle;
}

const InsetDemoView =
  Platform.OS === 'android'
    ? requireNativeComponent<InsetDemoViewProps>('RNInsetDemoView')
    : View;

export default InsetDemoView;
