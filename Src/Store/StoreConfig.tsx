import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from './Slices';

const store = configureStore({
  reducer: RootReducer,
  devTools: false,
});

export default store;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
