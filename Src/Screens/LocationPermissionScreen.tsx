import { AppState, AppStateStatus, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';

import { FONTS } from '../Utility/Fonts';
import { COLORS } from '../Utility/Colors';
import SvgIcon from '../Components/SvgIcon';
import { FONTSIZES } from '../Utility/FontSizes';
import { BOX_SHADOW } from '../Utility/Constants';
import StyledText from '../Components/StyledText';
import CustomButton from '../Components/CustomButton';
import { verticalScale } from '../Hooks/useMetrices';
import {
  checkLocationPermission,
  requestLocationPermission,
  requestNotificationPermission,
} from '../Utility/Permissions';

export type LocationPermissionScreenProps = {
  setLocationGranted: (granted: boolean) => void;
};

const appState = React.createRef<AppStateStatus>();

const LocationPermissionScreen = ({
  setLocationGranted,
}: LocationPermissionScreenProps) => {
  useEffect(() => {
    appState.current = AppState.currentState;

    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          appState.current?.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          const alwaysGranted = await checkLocationPermission();

          if (alwaysGranted) {
            await requestNotificationPermission();
            setLocationGranted(true);
          }
        }

        appState.current = nextAppState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SvgIcon icon="smallLogo" size={100} />
        <StyledText style={styles.title}>Permission Needed!</StyledText>
        <StyledText style={styles.content}>
          MetricInfo App need to fetched user's location in background. Kindly
          allow all the time location permission in order to use the app
          seamlessy.
        </StyledText>
        <CustomButton
          title="GRANT"
          onPress={async () => {
            await requestLocationPermission();
            await requestNotificationPermission();
            const alwaysGranted = await checkLocationPermission();
            if (alwaysGranted) {
              setLocationGranted(true);
            }
          }}
        />
      </View>
    </View>
  );
};

export default LocationPermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(10),
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(10),
    width: '90%',
    ...BOX_SHADOW,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    color: COLORS.red,
    fontSize: FONTSIZES.large,
    fontFamily: FONTS.regular,
  },
  content: {
    color: COLORS.black,
    fontSize: FONTSIZES.small,
    textAlign: 'center',
  },
});
