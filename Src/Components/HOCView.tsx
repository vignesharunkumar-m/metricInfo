import { ActivityIndicator, ScrollView, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import Loader from './Loader';
import CustomHeader from './CustomHeader';
import { COLORS } from '../Utility/Colors';
import { useLoader } from '../Utility/StoreData';
import { HOCViewProps } from '../@types/Components';
import CustomButton from './CustomButton';

const HOCView = ({
  children,
  isEnableKeyboardAware = false,
  isEnableScrollView = false,
  keyboardAwareContentContainerStyle = {
    backgroundColor: COLORS.white,
    flexGrow: 1,
  },
  scrollViewContentContainerStyle = {
    backgroundColor: COLORS.white,
  },
  paddingHorizontal = 10,
  paddingVertical = 0,
  refreshControl,
  isShowHeader = true,
  isListLoading = false,
  headerProps,
  isEnableSafeArea = true,
  keyboardAwareRef,
  scrollViewRef,
  renderHeader,
  contentStyle,
  bgColor = COLORS.screenBg,
  floatingBtnTitle,
  onPressFloatingButton,
  floatingBtnLeftIcon,
}: HOCViewProps) => {
  const { isLoading, text } = useLoader();
  const headerContent =
    typeof renderHeader === 'function' ? renderHeader() : renderHeader;

  function MainComponent() {
    return (
      <>
        {isShowHeader && headerProps ? <CustomHeader {...headerProps} /> : null}
        {isLoading && <Loader isVisible={true} text={text} />}
        {headerContent ? (
          <View
            style={{
              paddingHorizontal: paddingHorizontal,
              marginTop: 5,
            }}
          >
            {headerContent}
          </View>
        ) : null}
        {floatingBtnTitle && (
          <CustomButton
            title={floatingBtnTitle}
            leftIcon={floatingBtnLeftIcon}
            onPress={() => onPressFloatingButton?.()}
            customButtonStyle={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              zIndex: 1,
            }}
          />
        )}
        {isListLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size={'large'} color={COLORS.primary} />
          </View>
        ) : (
          <>
            {isEnableKeyboardAware ? (
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                bottomOffset={20}
                contentContainerStyle={[
                  keyboardAwareContentContainerStyle,
                  { paddingVertical, paddingHorizontal },
                ]}
              >
                {children}
              </KeyboardAwareScrollView>
            ) : (
              <View
                style={[
                  {
                    flex: 1,
                    paddingHorizontal,
                    paddingVertical,
                  },
                  contentStyle,
                ]}
              >
                {isEnableScrollView ? (
                  <ScrollView
                    bounces={true}
                    ref={scrollViewRef}
                    refreshControl={refreshControl}
                    style={{ flex: 1 }}
                    contentContainerStyle={scrollViewContentContainerStyle}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="handled"
                    alwaysBounceVertical={true}
                  >
                    <>{children}</>
                  </ScrollView>
                ) : (
                  <>{children}</>
                )}
              </View>
            )}
          </>
        )}
      </>
    );
  }

  return isEnableSafeArea ? (
    <SafeAreaView
      edges={[]}
      style={{
        flex: 1,
        backgroundColor: bgColor,
      }}
    >
      {MainComponent()}
    </SafeAreaView>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: bgColor,
      }}
    >
      {MainComponent()}
    </View>
  );
};

export default HOCView;
