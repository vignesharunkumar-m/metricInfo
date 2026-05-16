import { View, StyleSheet } from 'react-native';
import React from 'react';

import SvgIcon from './SvgIcon';
import StyledText from './StyledText';
import { COLORS } from '../Utility/Colors';

import { horizontalScale, verticalScale } from '../Hooks/useMetrices';
import { FONTS } from '../Utility/Fonts';
import { FONTSIZES } from '../Utility/FontSizes';
import { CustomHeaderProps } from '../@types/Components';

const CustomHeader = ({
  title,
  isEnableRight = false,
  onBackPress,
  isShowBackButton = false,
}: CustomHeaderProps) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        {/* {isShowBackButton && (
            <SvgIcon icon="backArrow" size={20} />
        )} */}
        <StyledText style={styles.title}>{title}</StyledText>
      </View>
      {isEnableRight && (
        <View style={styles.rightContainer}>
          <StyledText style={styles.rightText}>Nearby Clients</StyledText>
          <SvgIcon icon="location" />
        </View>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  mainContainer: {
    height: verticalScale(50),
    backgroundColor: COLORS.transparent,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: FONTSIZES.large,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 3,
  },
  rightText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
});
