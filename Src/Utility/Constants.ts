import { Dimensions, Platform } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
export const ACTIVE_OPACITY = 0.8;
export const API_DATE_FORMAT = 'YYYY-MM-DD';
export const ATTENDANCE_DATE_FORMAT = 'DD-MM-YYYY';
export const USER_CHECK_IN_OUT_KEY = 'userCheckInOut';
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;

export const BOX_SHADOW = {
  backgroundColor: '#FFFFFF',

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 4,

  elevation: 5,
};

export const LOADING_TEXT = {
  EMPTY: '',
  CLIENTS: 'Clients...',
};

export const MONTH_NAME_MAP: Record<string, number> = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
