import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { COLORS } from '../Utility/Colors';
import { useInsets } from '../Utility/StoreData';
import { BottomSheetProps } from '../@types/components';

const BottomSheet = ({
  ref,
  onClose,
  bottomSheetModalProps,
  children,
  snapPoints,
  modalStyles,
  isSlideDown = true,
  setIsSheetOpen,
}: BottomSheetProps) => {
  const insets = useInsets();

  return (
    <BottomSheetModal
      index={0}
      backgroundStyle={[styles.modalStyles, modalStyles]}
      {...bottomSheetModalProps}
      enableHandlePanningGesture={isSlideDown}
      enableContentPanningGesture={isSlideDown}
      enablePanDownToClose={isSlideDown}
      ref={ref}
      snapPoints={snapPoints}
      overDragResistanceFactor={4}
      enableOverDrag={false}
      topInset={insets?.top}
      bottomInset={insets?.bottom}
      enableDynamicSizing={false}
      stackBehavior="push"
      keyboardBlurBehavior={'restore'}
      android_keyboardInputMode="adjustPan"
      onChange={index => {
        setIsSheetOpen?.(index >= 0);
      }}
      onDismiss={onClose}
      backdropComponent={props => {
        return isSlideDown ? (
          <TouchableOpacity
            testID="button"
            style={[
              styles.container,
              {
                bottom: insets?.bottom + 65,
                top: insets?.top,
              },
            ]}
            activeOpacity={1}
            onPress={onClose}
          />
        ) : null;
      }}
    >
      {children}
    </BottomSheetModal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  modalStyles: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: COLORS.transparentDimColor,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  indicatorStyle: {
    backgroundColor: COLORS.primary,
    width: 40,
  },
  sheet: {
    borderTopLeftRadius: 8,
  },
});
