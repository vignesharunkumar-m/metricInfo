import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CompaniesScreen from '../Screens/CompaniesScreen';
import { CompaniesStackParamsList } from '../@types/NavigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../Screens/CalendarScreen';

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
