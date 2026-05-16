import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

import StyledText from './StyledText';
import { COLORS } from '../Utility/Colors';
import { CustomRayLoaderProps } from '../@types/Components';

const CustomRayLoader = ({ text, textStyle }: CustomRayLoaderProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rays = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 360) / 8;
    return (
      <View
        key={i}
        style={[
          styles.ray,
          {
            transform: [{ rotate: `${angle}deg` }, { translateY: -25 }],
          },
        ]}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loader, { transform: [{ rotate: spin }] }]}>
        {rays}
      </Animated.View>
      <StyledText style={[styles.text, textStyle]}>{text}</StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  loader: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ray: {
    position: 'absolute',
    width: 4,
    height: 16,
    backgroundColor: COLORS.white,
    borderRadius: 2,
  },
  text: {
    marginTop: 14,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CustomRayLoader;
