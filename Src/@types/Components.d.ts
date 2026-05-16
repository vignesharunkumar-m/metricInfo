import {
  ScrollViewProps,
  StyleProp,
  TextInput,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { IconType } from '../Utility/Icons';
import { BottomSheetModalProps } from '@gorhom/bottom-sheet';

export type SVGIconProps = {
  size?: number;
  icon: IconType;
  isButton?: boolean;
  onPress?: () => void;
  fill?: string;
  iconStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
};

export type StyledTextProps = {
  children: JSX.Element | JSX.Element[] | ReactNode | any;
  style?: StyleProp<TextStyle>;
  textProps?: TextProps;
  numberOfLines?: number;
};

export type BottomSheetProps = {
  ref: any;
  onClose?: () => void;
  bottomSheetModalProps?: BottomSheetModalProps;
  children?: JSX.Element | JSX.Element[] | React.ReactNode;
  snapPoints: string[] | number[];
  handleSheetChange?: () => void;
  modalStyles?: any;
  isSlideDown?: boolean;
  setIsSheetOpen?: (val: boolean) => void;
};

export type CustomButtonProps = {
  title: string;
  onPress: () => void;
  buttonProps?: TouchableOpacityProps;
  isDisabled?: boolean;
  customButtonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  opacity?: number;
  paddingHorizontal?: number;
  rightIconColor?: string;
  rightIcon?: IconType;
  titleColor?: string;
  leftIcon?: IconType;
};

export type CustomRayLoaderProps = {
  text?: string;
  textStyle?: StyleProp<TextStyle>;
};
export type CustomHeaderProps = {
  title: string;
  isEnableRight?: boolean;
  onBackPress?: () => void;
  isShowBackButton?: boolean;
};

export type Loaderprops = {
  text?: string;
  isVisible?: boolean;
};

export interface HOCViewProps {
  children: JSX.Element | JSX.Element[] | ReactNode;
  isEnableKeyboardAware?: boolean;
  isEnableScrollView?: boolean;
  keyboardAwareContentContainerStyle?: StyleProp<ViewStyle>;
  scrollViewContentContainerStyle?: StyleProp<ViewStyle>;
  paddingHorizontal?: number;
  paddingVertical?: number;
  refreshControl?: ScrollViewProps | undefined | any;
  isShowHeader?: boolean;
  isListLoading?: boolean;
  headerProps?: CustomHeaderProps;
  isEnableSafeArea?: boolean;
  keyboardAwareRef?: React.LegacyRef<KeyboardAwareScrollView>;
  scrollViewRef?: React.LegacyRef<ScrollView> | undefined;
  renderHeader?:
    | JSX.Element
    | JSX.Element[]
    | ReactNode
    | (() => React.ReactNode);
  contentStyle?: StyleProp<ViewStyle>;
  bgColor?: string;
  floatingBtnTitle?: string;
  onPressFloatingButton?: () => void;
  floatingBtnLeftIcon?: IconType;
}

export type ListFooterComponentProps = {
  color?: string;
  size?: number | 'small' | 'large';
};

export type ListEmptyComponentProps = {
  noDataText?: string;
  textstyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export interface TextInputBoxProps {
  title?: string;
  value?: string | number;
  onChangeText?: (text: string) => void;
  textInputProps?: TextInputProps;
  innerRef?: LegacyRef<TextInput> | undefined | any;
  // errorText?:
  //   | string
  //   | string[]
  //   | FormikErrors<any>
  //   | FormikErrors<any>[]
  //   | undefined;
  errorText?: any;
  customContainerStyle?: StyleProp<ViewStyle>;
  isSecure?: boolean;
  showIcon?: boolean;
  icon?: IconType | any;
  isEditable?: boolean;
  placeHolder?: string;
  isRequired?: boolean;
  maxLength?: number;
  borderColor?: string;
  onPressIcon?: () => void;
  iconSize?: number;
  onSubmit?: () => void;
  onRightIconPress?: () => void;
  rightIcon?: IconType;
  multiline?: boolean;
  isEnableScrollBar?: boolean;
  inputBg?: string;
  LeftIcon?: IconType;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputFieldStyle?: StyleProp<ViewStyle>;
}

export type RowTextProps = {
  leftWidth?: number;
  leftText: string;
  rightText: any;
  marginBottom?: number;
  style?: StyleProp<ViewStyle>;
};

export type ConfirmationModalProps = {
  msg?: string;
  onPressPostiveButton?: () => void;
  onPressNegativeButton?: () => void;
  postiveButtonText?: string;
  negativeButtonText?: string;
};
export type GlobalModalProps = {
  children: JSX.Element | JSX.Element[] | ReactNode;
  isVisible: boolean;
  setIsVisible?: (val: boolean) => void;
  childContainerStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  isHeaderEnable?: boolean;
  title?: string;
  isEnableCloseIcon?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  isScrollEnabled?: boolean;
  headerContainerStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  transparent?: boolean;
};
