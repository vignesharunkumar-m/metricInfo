import { createSlice } from '@reduxjs/toolkit';
import { UserReducerProps } from '../../@types/ReducerTypes';

const initialState: UserReducerProps = {
  checkIn: null,
  checkOut: null,
  userData: null,
  userDetails: null,
};

const { actions, reducer } = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    StoreUserCheckIn: (state, action) => {
      state.checkIn = action.payload;
    },
    StoreUserCheckOut: (state, action) => {
      state.checkOut = action.payload;
    },
    ClearAuthReduxData: () => {
      return initialState;
    },
  },
});

export const { StoreUserCheckIn, StoreUserCheckOut, ClearAuthReduxData } =
  actions;

export default reducer;
