import React from 'react';
import { StyleSheet, View } from 'react-native';

import StyledText from './StyledText';
import { FONTS } from '../Utility/Fonts';
import CustomButton from './CustomButton';
import { FONTSIZES } from '../Utility/FontSizes';
import { horizontalScale } from '../Hooks/useMetrices';
import { ConfirmationModalProps } from '../@types/Components';

const ConfirmationModal = ({
  msg = '',
  negativeButtonText = 'Cancel',
  onPressNegativeButton,
  onPressPostiveButton,
  postiveButtonText = 'Yes',
}: ConfirmationModalProps) => {
  return (
    <>
      <StyledText style={styles.msg}>{msg}</StyledText>
      <View style={styles.buttonContainer}>
        {onPressNegativeButton && (
          <CustomButton
            customButtonStyle={{
              width: horizontalScale(110),
            }}
            title={negativeButtonText}
            onPress={onPressNegativeButton}
          />
        )}
        {onPressPostiveButton && (
          <CustomButton
            customButtonStyle={{
              width: horizontalScale(110),
            }}
            title={postiveButtonText}
            onPress={onPressPostiveButton}
          />
        )}
      </View>
    </>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  msg: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    fontFamily: FONTS.medium,
    fontSize: FONTSIZES.small,
  },
});
