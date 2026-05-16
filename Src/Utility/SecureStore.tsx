import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeInLocalStorage = async (key: string, payload: any) => {
  try {
    const value =
      typeof payload === 'string' || typeof payload === 'number'
        ? payload.toString()
        : JSON.stringify(payload);

    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('Store error:', error);
  }
};

export const retrieveFromLocalStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (error) {
    console.log('Retrieve error:', error);
    return null;
  }
};

export const removeFromLocalStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Remove error:', error);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();

    return true;
  } catch (error) {
    console.log('Clear error:', error);

    return false;
  }
};
