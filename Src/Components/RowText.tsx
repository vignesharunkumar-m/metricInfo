import { View } from 'react-native';
import React from 'react';

import StyledText from './StyledText';
import { FONTS } from '../Utility/Fonts';
import { COLORS } from '../Utility/Colors';
import { FONTSIZES } from '../Utility/FontSizes';
import { RowTextProps } from '../@types/Components';

const RowText = ({
  leftWidth,
  leftText,
  rightText,
  marginBottom = 10,
  style = {
    flexDirection: 'row',
  },
}: RowTextProps) => {
  return (
    <View
      style={[
        {
          marginBottom,
        },
        style,
      ]}
    >
      <View
        style={{
          width: `${leftWidth ?? '100'}%`,
        }}
      >
        <StyledText
          style={{
            color: COLORS.placeHolderColor,
            fontSize: FONTSIZES.small,
            fontFamily: FONTS.medium,
          }}
        >
          {leftText}
        </StyledText>
      </View>
      <View
        style={{
          width: `${leftWidth ? 100 - leftWidth : '100'}%`,
        }}
      >
        <StyledText
          style={{
            color: COLORS.primary,
            fontSize: FONTSIZES.small,
            fontFamily: FONTS.medium,
            flexWrap: 'wrap',
            flexShrink: 1,
          }}
        >
          {rightText?.toString()}
        </StyledText>
      </View>
    </View>
  );
};

export default RowText;
