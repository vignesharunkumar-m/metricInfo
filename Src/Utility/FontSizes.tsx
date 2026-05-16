import { moderateScale } from '../Hooks/useMetrices';

export const FONTSIZES = {
  extraTiny: moderateScale(10),
  extraSmall: moderateScale(11),
  tiny: moderateScale(12),
  moderate: moderateScale(13),
  small: moderateScale(14),
  medium: moderateScale(16),
  big: moderateScale(18),
  large: moderateScale(20),
  extraLarge: moderateScale(23),
  extra: moderateScale(25),
  max: moderateScale(30),
  custom: (size: number) => moderateScale(size),
};
