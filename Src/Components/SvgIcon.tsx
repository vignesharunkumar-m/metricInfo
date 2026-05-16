import { TouchableOpacity } from 'react-native';
import React from 'react';

import { ICONS } from '../Utility/Icons';
import { COLORS } from '../Utility/Colors';
import { scaleSquare } from '../Hooks/useMetrices';
import { SVGIconProps } from '../@types/components';
import { ACTIVE_OPACITY } from '../Utility/Constants';

const SvgIcon = ({
  size = 22,
  icon,
  isButton = false,
  onPress,
  fill = COLORS.transparent,
  iconStyle = {},
  style,
}: SVGIconProps) => {
  const Icon = icon ? ICONS[icon] : false;

  if (!Icon) {
    return null;
  }
  return (
    <TouchableOpacity
      style={[style]}
      disabled={!isButton}
      activeOpacity={ACTIVE_OPACITY}
      onPress={onPress}
    >
      <Icon
        {...scaleSquare(size)}
        style={[iconStyle]}
        fill={fill}
        color={fill}
      />
    </TouchableOpacity>
  );
};

export default SvgIcon;
