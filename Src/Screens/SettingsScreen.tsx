import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HOCView from '../Components/HOCView';
import StyledText from '../Components/StyledText';
import { FONTSIZES } from '../Utility/FontSizes';
import { FONTS } from '../Utility/Fonts';

const SettingsScreen = () => {
  return (
    <HOCView paddingHorizontal={10} headerProps={{ title: 'Settings' }}>
      <View style={styles.container}>
        <StyledText style={styles.text}>Under Developing</StyledText>
      </View>
    </HOCView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FONTSIZES.large,
    fontFamily: FONTS.semiBold,
  },
});
