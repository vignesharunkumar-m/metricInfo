import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParamsList } from '../@types/NavigationTypes';
import BottomTabNavigation from '../Navigation/BottomTabNavigation';

const Stack = createStackNavigator<MainStackParamsList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
