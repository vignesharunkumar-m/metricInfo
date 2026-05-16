/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Provider } from 'react-redux';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import store from './Src/Store/StoreConfig';

const Main = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <Provider store={store}>
          <BottomSheetModalProvider>
            <App />
          </BottomSheetModalProvider>
        </Provider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};
AppRegistry.registerComponent(appName, () => Main);
