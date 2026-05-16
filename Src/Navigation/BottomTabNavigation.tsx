import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../@types/NavigationTypes';
import HomeScreen from '../Screens/HomeScreen';
import VisitsScreen from '../Screens/VisitsScreen';
import CompaniesStack from '../Stack/CompaniesStack';
import ClaimsScreen from '../Screens/ClaimsScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import CustomBottomTabBar from './CustomBottomTabBar';
import BottomTabsProvider from '../Context/BottomTabsProvider';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigation = () => {
  return (
    <BottomTabsProvider>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        backBehavior="initialRoute"
        tabBar={props => <CustomBottomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="VisitsScreen" component={VisitsScreen} />
        <Tab.Screen name="CompaniesStack" component={CompaniesStack} />
        <Tab.Screen name="ClaimsScreen" component={ClaimsScreen} />
        <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
      </Tab.Navigator>
    </BottomTabsProvider>
  );
};

export default BottomTabNavigation;
