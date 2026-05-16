import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StyledText from './StyledText';
import { IconType } from '../Utility/Icons';
import SvgIcon from './SvgIcon';
import { COLORS } from '../Utility/Colors';

export type IconWithStyledTextProps = {
  title: string;
  icon: IconType;
  size?: number;
  color?: string;
  isShowUnderLine?: boolean;
};

const IconWithStyledText = ({
  icon,
  title,
  size,
  color = COLORS.black,
  isShowUnderLine = true,
}: IconWithStyledTextProps) => {
  return (
    <View style={styles.container}>
      <SvgIcon icon={icon} size={size} />
      <StyledText
        style={[
          {
            color: color,
          },
          isShowUnderLine && title
            ? {
                borderBottomColor: color,
                borderBottomWidth: 1,
              }
            : {},
        ]}
      >
        {title ?? '-'}
      </StyledText>
    </View>
  );
};

export default IconWithStyledText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
  },
});
