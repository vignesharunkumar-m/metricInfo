import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../Utility/Colors';
import { useInsets } from '../Utility/StoreData';
import { StoreInsetsData } from '../Store/Slices/UtilitySlice';

const CustomStatusBar = ({ backgroundColor = COLORS.white }) => {
  const dispatch = useDispatch();
  const insets = useInsets();
  const { top, bottom, left, right } = useSafeAreaInsets();

  useEffect(() => {
    dispatch(StoreInsetsData({ ...insets, top, bottom, right, left }));
  }, [top, bottom, left, right]);

  return (
    <View
      style={{
        height: top,
        backgroundColor,
      }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    </View>
  );
};

export default CustomStatusBar;
