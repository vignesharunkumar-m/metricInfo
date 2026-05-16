import { Image, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import SvgIcon from '../Components/SvgIcon';
import StyledText from '../Components/StyledText';
import CustomButton from '../Components/CustomButton';
import Geolocation from '@react-native-community/geolocation';

import { COLORS } from '../Utility/Colors';
import {
  horizontalScale,
  scaleSquare,
  verticalScale,
} from '../Hooks/useMetrices';
import HOCView from '../Components/HOCView';
import { FONTS } from '../Utility/Fonts';
import { FONTSIZES } from '../Utility/FontSizes';
import { IconType } from '../Utility/Icons';
import { requestLocationPermission } from '../Utility/Permissions';
import {
  getCurrentCoordinates,
  reverseGeocodeLocation,
} from '../Services/LocationServices';
import { USER_CHECK_IN_OUT_KEY } from '../Utility/Constants';
import {
  removeFromLocalStorage,
  retrieveFromLocalStorage,
  storeInLocalStorage,
} from '../Utility/SecureStore';
import dayjs from 'dayjs';
import { getWorkedHoursLabel } from '../Utility/GeneralUtility';
import GlobalModal from '../Components/GlobalModal';
import ConfirmationModal from '../Components/ConfirmationModal';

export type userInfoProps = {
  id: number;
  value: string;
  icon: IconType;
};

export type quickActionsProps = {
  id: number;
  value: string;
  icon: IconType;
};

export type LocationProps = {
  lat: number;
  lng: number;
};

export type userCheckInInfoProps = {
  CHECK_IN_LOCATION: string;
  CHECK_IN_LATITUDE: number | null;
  CHECK_IN_LONGITUDE: number | null;
  CHECK_IN_TIME: null | string;
  CHECK_OUT_LOCATION: string;
  CHECK_OUT_LATITUDE: number | null;
  CHECK_OUT_LONGITUDE: number | null;
  CHECK_OUT_TIME: null | string;
  DATE: string;
};

const quickActions: quickActionsProps[] = [
  {
    id: 1,
    value: 'My Visit',
    icon: 'myVisit',
  },
  {
    id: 2,
    value: 'Direction',
    icon: 'location',
  },
  {
    id: 3,
    value: 'Schedule',
    icon: 'schedule',
  },
];

const HomeScreen = () => {
  const [currentLocation, setCurrentLocation] = useState<null | string>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [userInfoDetails, setUserInfoDetails] =
    useState<userCheckInInfoProps | null>(null);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const [isCheckInOutLoading, setIsCheckInOutLoading] = useState(false);
  const isCheckedIn = !!userInfoDetails?.CHECK_IN_LOCATION;
  const isCheckedOut = !!userInfoDetails?.CHECK_OUT_LOCATION;

  const buttonTitle = !isCheckedIn
    ? 'Check In'
    : !isCheckedOut
    ? 'Check Out'
    : 'Completed';

  const isButtonDisabled = isCheckInOutLoading || (isCheckedIn && isCheckedOut);
  const userInfo: userInfoProps[] = [
    {
      id: 1,
      value: userInfoDetails?.CHECK_IN_TIME || '--',
      icon: 'checkIn',
    },
    {
      id: 2,
      value: userInfoDetails?.CHECK_OUT_TIME || '--',
      icon: 'checkOut',
    },
    {
      id: 3,
      value:
        (userInfoDetails?.CHECK_OUT_TIME || dayjs()?.format('hh:mm A')) &&
        userInfoDetails?.CHECK_IN_TIME
          ? getWorkedHoursLabel(
              userInfoDetails?.CHECK_IN_TIME,
              userInfoDetails?.CHECK_OUT_TIME || dayjs()?.format('hh:mm A'),
              false,
            )
          : '--',
      icon: 'timer',
    },
  ];

  useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
    });
  }, []);

  useEffect(() => {
    fetchCurrentLocation();
    getLocalStorageData();
  }, []);

  const getLocalStorageData = async () => {
    const local = await retrieveFromLocalStorage(USER_CHECK_IN_OUT_KEY);
    setUserInfoDetails(
      local ?? {
        CHECK_IN_LOCATION: '',
        CHECK_IN_LATITUDE: null,
        CHECK_IN_LONGITUDE: null,
        CHECK_IN_TIME: '',
        CHECK_OUT_LOCATION: '',
        CHECK_OUT_LATITUDE: null,
        CHECK_OUT_LONGITUDE: null,
        CHECK_OUT_TIME: '',
        DATE: '',
      },
    );

    if (local) {
      const today = dayjs()?.format('YYYY-MM-DD');
      if (local.DATE !== today) {
        await removeFromLocalStorage(USER_CHECK_IN_OUT_KEY);
      }
    }
  };
  const getAddressFromLocation = async (lat: number, lng: number) => {
    try {
      const address = await reverseGeocodeLocation({
        lat,
        lng,
      });

      return address ?? `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
      console.log(error);

      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  };

  const fetchCurrentLocation = async () => {
    try {
      if (isLocationLoading) {
        return;
      }

      const granted = await requestLocationPermission();

      if (!granted) {
        return;
      }

      setIsLocationLoading(true);

      const { lat, lng } = await getCurrentCoordinates();
      console.log(lat, lng, 'lat, lng');

      const address = await getAddressFromLocation(lat, lng);

      setCurrentLocation(address);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLocationLoading(false);
    }
  };

  const handleUserCheckInCheckOut = async (type: 'IN' | 'OUT') => {
    const granted = await requestLocationPermission();

    if (!granted) {
      return;
    }
    setIsCheckInOutLoading(true);

    try {
      const { lat, lng } = await getCurrentCoordinates();

      const address = await getAddressFromLocation(lat, lng);
      const getTime = dayjs()?.format('hh:mm A');
      const isIn = type === 'IN';
      const temp = {
        CHECK_IN_LOCATION: isIn
          ? address
          : userInfoDetails?.CHECK_IN_LOCATION || '',
        CHECK_IN_LATITUDE: isIn
          ? lat
          : userInfoDetails?.CHECK_IN_LATITUDE ?? null,
        CHECK_IN_LONGITUDE: isIn
          ? lng
          : userInfoDetails?.CHECK_IN_LONGITUDE ?? null,
        CHECK_IN_TIME: isIn ? getTime : userInfoDetails?.CHECK_IN_TIME ?? '',
        CHECK_OUT_LOCATION: !isIn
          ? address
          : userInfoDetails?.CHECK_OUT_LOCATION || '',
        CHECK_OUT_LATITUDE: !isIn
          ? lat
          : userInfoDetails?.CHECK_OUT_LATITUDE ?? null,
        CHECK_OUT_LONGITUDE: !isIn
          ? lng
          : userInfoDetails?.CHECK_OUT_LONGITUDE ?? null,
        CHECK_OUT_TIME: !isIn ? getTime : userInfoDetails?.CHECK_OUT_TIME || '',
        DATE: dayjs()?.format('YYYY-MM-DD') || '',
      };
      setUserInfoDetails(temp);
      storeInLocalStorage(USER_CHECK_IN_OUT_KEY, temp);
    } catch (error) {
      console.log('ERROR FROM CHECK IN AND CHECK OUT');
    } finally {
      setIsCheckInOutLoading(false);
      handleCloseConfirmationModal();
    }
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModal(false);
  };

  return (
    <HOCView paddingHorizontal={0} isShowHeader={false}>
      <View style={styles.container}>
        <SvgIcon
          icon="assetsImage"
          size={130}
          iconStyle={styles.assetImageStyle}
        />
        <View style={styles.profileContainer}>
          <Image
            style={styles.profile}
            source={require('../Assets/Png/profile_round.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.contentContainer}>
          <View>
            <StyledText style={styles.userName}>
              Hi Jagadishgouda Mudigoudra!
            </StyledText>
            <StyledText
              style={{
                color: userInfoDetails?.CHECK_IN_LOCATION
                  ? COLORS.green
                  : COLORS.gray,
                fontSize: FONTSIZES.medium,
                marginTop: 5,
              }}
            >
              {userInfoDetails?.CHECK_IN_LOCATION
                ? 'You are on duty...'
                : 'You are off duty...'}
            </StyledText>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.userDetailsHeader}>
              <StyledText style={styles.quickText}>Quick Actions</StyledText>
              <SvgIcon icon="edit" size={18} />
            </View>
            <View style={styles.quicActionContainer}>
              {quickActions?.map(ele => (
                <View style={styles.quicAction} key={ele?.id}>
                  <SvgIcon icon={ele?.icon} />
                  <StyledText>{ele?.value}</StyledText>
                </View>
              ))}
            </View>

            <StyledText style={styles.currentLocation}>
              Current Location
            </StyledText>
            <StyledText style={styles.address}>
              {isLocationLoading
                ? 'Fetching current location...'
                : currentLocation || 'Location unavailable'}
            </StyledText>
            <CustomButton
              title={buttonTitle}
              onPress={() => {
                setIsConfirmationModal(true);
              }}
              isDisabled={isButtonDisabled}
              customButtonStyle={{
                width: '80%',
                alignSelf: 'center',
                paddingVertical: verticalScale(15),
                marginVertical: verticalScale(10),
              }}
            />
            <View style={styles.userCheckInInfoContainer}>
              {userInfo?.map(ele => (
                <View key={ele?.id} style={styles.userCheckInInfo}>
                  <SvgIcon icon={ele?.icon} size={25} />
                  <StyledText>{ele?.value}</StyledText>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.header}>
          <SvgIcon icon="logo" size={60} />
          <SvgIcon icon="dotMenu" />
        </View>
      </View>

      <GlobalModal
        isVisible={isConfirmationModal}
        setIsVisible={handleCloseConfirmationModal}
        onClose={handleCloseConfirmationModal}
        title="Confirmation"
        isLoading={isCheckInOutLoading}
      >
        <ConfirmationModal
          msg={`Are you sure you want to ${
            !isCheckedIn ? 'Check In' : 'Check Out'
          }?`}
          onPressNegativeButton={handleCloseConfirmationModal}
          onPressPostiveButton={() => {
            if (!isCheckedIn) {
              handleUserCheckInCheckOut('IN');
            } else if (!isCheckedOut) {
              handleUserCheckInCheckOut('OUT');
            }
          }}
        />
      </GlobalModal>
    </HOCView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  contentContainer: {
    position: 'absolute',
    top: verticalScale(180),
    left: 0,
    right: 10,
    bottom: 0,
    backgroundColor: COLORS.white,
    borderTopRightRadius: horizontalScale(200),
    paddingHorizontal: 10,
    paddingTop: verticalScale(30),
  },
  assetImageStyle: {
    position: 'absolute',
    top: verticalScale(80),
    right: horizontalScale(5),
  },
  profileContainer: {
    backgroundColor: COLORS.white,
    ...scaleSquare(100),
    borderRadius: horizontalScale(50),
    position: 'absolute',
    top: verticalScale(110),
    left: horizontalScale(20),
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  profile: {
    ...scaleSquare(90),
    borderRadius: horizontalScale(45),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  userName: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTSIZES.big,
  },
  userDetails: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    paddingHorizontal: horizontalScale(10),
  },
  userDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginBottom: verticalScale(20),
  },
  quicActionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  quicAction: {
    backgroundColor: COLORS.secondary,
    ...scaleSquare(80),
    padding: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  quickText: {
    fontSize: FONTSIZES.large,
    fontFamily: FONTS.semiBold,
  },
  userCheckInInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  userCheckInInfo: {
    padding: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  currentLocation: {
    color: COLORS.red,
    paddingVertical: horizontalScale(15),
    textAlign: 'center',
    fontSize: FONTSIZES.medium,
  },
  address: {
    textAlign: 'center',
    paddingBottom: horizontalScale(15),
  },
});
