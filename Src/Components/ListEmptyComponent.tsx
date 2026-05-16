import React from 'react';
import { StyleSheet, View } from 'react-native';

import StyledText from './StyledText';
import { FONTS } from '../Utility/Fonts';
import { ListEmptyComponentProps } from '../@types/components';

const ListEmptyComponent = ({
  noDataText = 'No Data Found',
  textstyle,
  containerStyle,
}: ListEmptyComponentProps) => {
  return (
    <View style={[styles.contanier, containerStyle]}>
      <StyledText style={[textstyle, { fontFamily: FONTS.semiBold }]}>
        {noDataText}
      </StyledText>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  contanier: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 100,
  },
});
