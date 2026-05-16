import { StyleSheet, TextInput, View } from 'react-native';
import React, { forwardRef, useState } from 'react';

import SvgIcon from './SvgIcon';
import StyledText from './StyledText';
import { FONTS } from '../Utility/Fonts';
import { COLORS } from '../Utility/Colors';
import { FONTSIZES } from '../Utility/FontSizes';
import { verticalScale } from '../Hooks/useMetrices';
import { TextInputBoxProps } from '../@types/components';

const TextInputBox = forwardRef<TextInput, TextInputBoxProps>(
  (
    {
      title = '',
      value,
      onChangeText,
      textInputProps,
      errorText,
      customContainerStyle,
      isSecure = false,
      showIcon = false,
      icon,
      isEditable = true,
      isRequired = false,
      placeHolder = '',
      maxLength = 50,
      borderColor = COLORS.primary,
      onPressIcon,
      iconSize = 20,
      onSubmit,
      multiline,
      isEnableScrollBar = false,
      rightIcon,
      onRightIconPress,
      inputBg = COLORS.white,
      LeftIcon,
      inputContainerStyle,
      inputFieldStyle,
    },
    ref,
  ) => {
    const [isVisiblePassword, setisVisiblePassword] = useState<boolean>(false);

    const getValue = () => {
      return typeof value === 'number' ? value.toString() : value;
    };

    return (
      <View style={[styles.container, customContainerStyle]}>
        {title ? (
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <StyledText
              style={{
                fontSize: FONTSIZES.small,
                fontFamily: FONTS.medium,
                color: COLORS.primary,
              }}
            >
              {title}
            </StyledText>
            {isRequired && (
              <StyledText style={styles.requiredText}>*</StyledText>
            )}
          </View>
        ) : null}

        <View
          style={[
            styles.inputContainer,
            inputContainerStyle,
            {
              borderColor: errorText && isEditable ? COLORS.red : borderColor,
              // backgroundColor: isEditable ? COLORS.white : COLORS.transparent,
              backgroundColor: inputBg,
            },
          ]}
        >
          {LeftIcon ? (
            <SvgIcon
              icon={LeftIcon}
              isButton
              onPress={onRightIconPress}
              size={iconSize}
              style={{
                marginLeft: 15,
              }}
            />
          ) : null}
          <TextInput
            ref={ref}
            value={getValue()}
            onChangeText={onChangeText}
            secureTextEntry={isSecure ? !isVisiblePassword : false}
            style={[
              styles.inputField,
              {
                flex: 1,
                height: '100%',
                paddingVertical: multiline ? 10 : 0,
                color: !isEditable ? COLORS.disableTextColor : COLORS.black,
              },
              inputFieldStyle,
            ]}
            placeholder={placeHolder}
            {...textInputProps}
            scrollEnabled={isEnableScrollBar}
            placeholderTextColor={COLORS.placeHolderColor}
            maxLength={maxLength}
            onSubmitEditing={onSubmit}
            editable={isEditable}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
          />
          {rightIcon ? (
            <SvgIcon
              fill={'white'}
              icon={rightIcon}
              isButton
              onPress={onRightIconPress}
              size={iconSize}
            />
          ) : null}

          {isSecure ? (
            <View style={styles.iconContainer}>
              {/* <SvgIcon
                isButton
                onPress={() => setisVisiblePassword(prev => !prev)}
                icon={
                  isVisiblePassword ? 'visibilityOnIcon' : 'visibilityOffIcon'
                }
                fill={'#67737e'}
              /> */}
            </View>
          ) : showIcon ? (
            <View style={styles.iconContainer}>
              <SvgIcon
                icon={icon}
                isButton
                onPress={onPressIcon}
                size={iconSize}
              />
            </View>
          ) : null}
        </View>

        {errorText && isEditable ? (
          <StyledText style={styles.errorTxt}>
            {errorText.toString()}
          </StyledText>
        ) : null}
      </View>
    );
  },
);

export default TextInputBox;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  inputContainer: {
    height: verticalScale(47),
    width: '100%',
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    alignItems: 'center',
  },
  errorTxt: {
    fontFamily: FONTS.medium,
    fontSize: FONTSIZES.tiny,
    color: COLORS.red,
  },
  iconContainer: {
    width: '13%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  inputField: {
    width: '87%',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: FONTSIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.textColor,
    paddingVertical: 0,
  },
  requiredText: {
    marginLeft: 5,
    color: COLORS.red,
  },
});
