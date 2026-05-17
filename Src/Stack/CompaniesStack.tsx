import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../Screens/CalendarScreen';
import CompaniesScreen from '../Screens/CompaniesScreen';
import { CompaniesStackParamsList } from '../@types/NavigationTypes';

const Stack = createStackNavigator<CompaniesStackParamsList>();

const CompaniesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CompaniesScreen"
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CompaniesScreen"
        component={CompaniesScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CalendarScreen"
        component={CalendarScreen}
      />
    </Stack.Navigator>
  );
};

export default CompaniesStack;
