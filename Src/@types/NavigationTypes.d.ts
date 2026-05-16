import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
  HomeScreen: undefined;
  VisitsScreen: undefined;
  CompaniesStack: NavigatorScreenParams<CompaniesStackParamsList>;
  ClaimsScreen: undefined;
  SettingsScreen: undefined;
};

export type MainStackParamsList = {
  BottomTabNavigation: NavigatorScreenParams<BottomTabParamList>;
};

export type CompaniesStackParamsList = {
  CompaniesScreen: undefined;
  CalendarScreen: undefined;
};
