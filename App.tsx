import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { hideSplash } from 'react-native-splash-view';

import CustomStatusBar from './Src/Components/CustomStatusBar';
import LocationPermissionScreen from './Src/Screens/LocationPermissionScreen';
import MainStack from './Src/Stack/MainStack';
import { checkLocationPermission } from './Src/Utility/Permissions';

function App() {
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const hasLocationPermission = await checkLocationPermission();
        setLocationGranted(hasLocationPermission);
      } catch (error) {
        console.log('Init Error:', error);
        setLocationGranted(false);
      } finally {
        hideSplash();
      }
    };

    initializeApp();
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <CustomStatusBar />
      {locationGranted === null ? null : locationGranted ? (
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      ) : (
        <LocationPermissionScreen setLocationGranted={setLocationGranted} />
      )}
    </SafeAreaProvider>
  );
}

export default App;
