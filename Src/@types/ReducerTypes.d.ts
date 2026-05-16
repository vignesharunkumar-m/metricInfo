import { LOADING_TEXT } from '../Utility/Constants';

export type UserReducerProps = {
  userData: any;
  userDetails: any;
  checkIn: any;
  checkOut: any;
};

export type LoadingTextKey = keyof typeof LOADING_TEXT;

export type UtilityReducerProps = {
  insets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  isNetworkConnected: boolean | null;
  loader: ReducerLoaderProps;
};

export type ReducerLoaderProps = {
  isLoading: boolean;
  text: string;
};

export type ReducerProps = {
  user: UserReducerProps;
  utility: UtilityReducerProps;
};

export type StoreIsLoadingParams = {
  isLoading: boolean;
  textKey?: LoadingTextKey;
};
