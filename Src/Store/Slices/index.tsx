import { combineReducers } from '@reduxjs/toolkit';
import UtilityReducer from './UtilitySlice';

export const RootReducer = combineReducers({
  utility: UtilityReducer,
});
