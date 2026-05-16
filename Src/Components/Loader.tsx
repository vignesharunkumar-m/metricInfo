import { Modal, StyleSheet, View } from 'react-native';
import React from 'react';

import { Loaderprops } from '../@types/components';
import CustomRayLoader from './CustomRayLoader';

const Loader = ({ isVisible = false, text = 'Loading.....' }: Loaderprops) => {
  return isVisible ? (
    <Modal visible={isVisible} transparent>
      <View style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
        <CustomRayLoader text={text} />
      </View>
    </Modal>
  ) : null;
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10000000,
  },
});
