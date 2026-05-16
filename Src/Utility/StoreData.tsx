import { useSelector } from 'react-redux';
import { ReducerProps } from '../@types/ReducerTypes';

export const useInsets = () => {
  return useSelector((state: ReducerProps) => state.utility.insets);
};

export const useisNetworkConnected = () => {
  return useSelector(
    (state: ReducerProps) => state?.utility?.isNetworkConnected,
  );
};

export const useLoader = () => {
  return useSelector((state: ReducerProps) => state.utility.loader);
};
