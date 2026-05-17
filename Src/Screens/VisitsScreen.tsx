import { StyleSheet, View } from 'react-native';
import React from 'react';

import { FONTS } from '../Utility/Fonts';
import HOCView from '../Components/HOCView';
import { FONTSIZES } from '../Utility/FontSizes';
import StyledText from '../Components/StyledText';

const Visits = () => {
  return (
    <HOCView paddingHorizontal={10} headerProps={{ title: 'Visits' }}>
      <View style={styles.container}>
        <StyledText style={styles.text}>Under Developing</StyledText>
      </View>
    </HOCView>
  );
};

export default Visits;

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
