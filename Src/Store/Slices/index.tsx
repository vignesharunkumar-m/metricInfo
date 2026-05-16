import { combineReducers } from '@reduxjs/toolkit';
import UserReducer from './UserSlice';
import UtilityReducer from './UtilitySlice';

export const RootReducer = combineReducers({
  user: UserReducer,
  utility: UtilityReducer,
});
