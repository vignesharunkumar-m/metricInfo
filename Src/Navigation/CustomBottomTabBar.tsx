import React, { useEffect, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import SvgIcon from '../Components/SvgIcon';
import StyledText from '../Components/StyledText';
import { BottomTabParamList } from '../@types/NavigationTypes';
import { FONTSIZES } from '../Utility/FontSizes';
import { FONTS } from '../Utility/Fonts';
import { IconType } from '../Utility/Icons';
import { COLORS } from '../Utility/Colors';
import { IS_IOS } from '../Utility/Constants';
import { useInsets } from '../Utility/StoreData';
import { useBottomTabsContext } from '../Context/BottomTabsProvider';

type BottomTabIconConfig = {
  filled: IconType;
  outLine: IconType;
  title: string;
};

type BottomTabIconsMap = {
  [K in keyof BottomTabParamList]: BottomTabIconConfig;
};

const BOTTOM_TAB_ICONS: BottomTabIconsMap = {
  HomeScreen: {
    filled: 'homeWhite',
    outLine: 'homeOutLine',
    title: 'Home',
  },
  VisitsScreen: {
    filled: 'visitWhite',
    outLine: 'visitOutLine',
    title: 'Visits',
  },
  CompaniesStack: {
    filled: 'companiesWhite',
    outLine: 'companiesOutline',
    title: 'Companies',
  },
  ClaimsScreen: {
    filled: 'claimsWhite',
    outLine: 'claimsOutline',
    title: 'Claims',
  },
  SettingsScreen: {
    filled: 'settingsWhite',
    outLine: 'settingsOutline',
    title: 'Settings',
  },
};

const CustomBottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const insets = useInsets();
  const [visible, setVisible] = useState(true);
  const { isOpen } = useBottomTabsContext();
  console.log(isOpen, 'isOpen');

  useEffect(() => {
    if (IS_IOS) {
      return;
    }

    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () =>
      setVisible(false),
    );
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () =>
      setVisible(true),
    );

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  if (!visible && !IS_IOS) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          height: 65 + (insets?.bottom ?? 0),
          opacity: isOpen ? 0 : 1,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tabConfig =
          BOTTOM_TAB_ICONS[route.name as keyof BottomTabParamList];

        const onPress = () => {
          navigation.reset({
            index: 0,
            routes: [{ name: route?.name }],
          });
        };

        return (
          <View key={route.key} style={styles.tabButton}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.pressable}
            >
              <SvgIcon
                icon={isFocused ? tabConfig.filled : tabConfig.outLine}
                size={20}
              />
              <StyledText
                style={[
                  styles.label,
                  { color: isFocused ? COLORS.white : COLORS.gray },
                ]}
              >
                {tabConfig.title}
              </StyledText>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

export default CustomBottomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: COLORS.primary,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    alignItems: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: FONTSIZES.tiny,
    fontFamily: FONTS.semiBold,
  },
});
