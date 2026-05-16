import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  StoreIsLoadingParams,
  UtilityReducerProps,
} from '../../@types/ReducerTypes';
import { LOADING_TEXT } from '../../Utility/Constants';

const initialState: UtilityReducerProps = {
  insets: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  isNetworkConnected: null,
  loader: {
    isLoading: false,
    text: '',
  },
};

const { actions, reducer } = createSlice({
  name: 'UtilitySlice',
  initialState,
  reducers: {
    StoreInsetsData: (state, action) => {
      state.insets = action.payload;
    },
    StoreNetworkStatus: (state, action: PayloadAction<boolean | null>) => {
      state.isNetworkConnected = action.payload;
    },
    StoreIsLoading: {
      reducer: (state, action: PayloadAction<StoreIsLoadingParams>) => {
        state.loader.isLoading = action.payload.isLoading;
        state.loader.text = action.payload.textKey
          ? LOADING_TEXT[action.payload.textKey] || ''
          : '';
      },
      prepare: (isLoading, textKey = ''): { payload: StoreIsLoadingParams } => {
        return {
          payload: { isLoading, textKey },
        };
      },
    },
    ClearUtilityReduxData: () => {
      return initialState;
    },
  },
});

export const {
  StoreInsetsData,
  StoreNetworkStatus,
  StoreIsLoading,
  ClearUtilityReduxData,
} = actions;

export default reducer;
