import { ActivityIndicator, View } from 'react-native';
import React from 'react';

import { COLORS } from '../Utility/Colors';
import { ListFooterComponentProps } from '../@types/components';

const ListFooterComponent = ({
  color = COLORS.primary,
  size = 'small',
}: ListFooterComponentProps) => {
  return (
    <View style={{ width: '100%' }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default ListFooterComponent;
