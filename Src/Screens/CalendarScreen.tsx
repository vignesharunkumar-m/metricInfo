import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import HOCView from '../Components/HOCView';
import StyledText from '../Components/StyledText';
import { GetAttendanceDayWiseService } from '../Services/ApiServices';
import { useInsets } from '../Utility/StoreData';
import { COLORS } from '../Utility/Colors';
import { FONTS } from '../Utility/Fonts';
import { FONTSIZES } from '../Utility/FontSizes';
import {
  moderateScale,
  scaleSquare,
  verticalScale,
} from '../Hooks/useMetrices';
import { getWorkedHoursLabel } from '../Utility/GeneralUtility';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  ACTIVE_OPACITY,
  API_DATE_FORMAT,
  ATTENDANCE_DATE_FORMAT,
  MONTH_NAME_MAP,
  WEEK_DAYS,
} from '../Utility/Constants';
import BottomSheet from '../Components/BottomSheet';
import RowText from '../Components/RowText';
import { useBottomTabsContext } from '../Context/BottomTabsProvider';

dayjs.extend(customParseFormat);

const USER_ID = 177;

export type AttendanceDayData = AttendanceItem & {
  date: string;
  status: 'present' | 'absent' | 'unknown';
  label: string;
};

type CalendarCell = {
  key: string;
  day: Dayjs | null;
};

export type AttendanceItem = {
  rownumber: number;
  attendanceid: number;
  userid: string;
  userfullname: string;
  attendancedate: string;

  intime: string;
  outtime: string;

  checkinloclocation: string;
  checkinloclatitude: string;
  checkinloclongitude: string;

  checkoutloclatitude: string | null;
  checkoutloclongitude: string | null;
  checkoutloclocation: string;
};

export type AttendanceLink = {
  rel: string;
  href: string;
};

export type AttendanceResponse = {
  items: AttendanceItem[];

  hasMore: boolean;
  limit: number;
  offset: number;
  count: number;

  links: AttendanceLink[];
};

const getToday = (): Dayjs => dayjs().startOf('day');

const getMonthRange = (month: Dayjs) => ({
  fromDate: month.startOf('month').format(API_DATE_FORMAT),
  toDate: month.endOf('month').format(API_DATE_FORMAT),
});

const buildAttendanceMap = (
  payload: AttendanceResponse,
): Record<string, AttendanceDayData> => {
  const attendanceMap: Record<string, AttendanceDayData> = {};

  payload?.items?.forEach((item: AttendanceItem) => {
    const rawDate: string = item?.attendancedate ?? '';
    const monthAbbr = rawDate.split('-')[1];
    const monthNum = (MONTH_NAME_MAP[monthAbbr] + 1)
      .toString()
      .padStart(2, '0');
    const normalised = rawDate.replace(monthAbbr, monthNum);
    const dateKey = dayjs(normalised, ATTENDANCE_DATE_FORMAT, true).format(
      API_DATE_FORMAT,
    );

    if (!dayjs(dateKey, API_DATE_FORMAT, true).isValid()) return;

    attendanceMap[dateKey] = {
      date: dateKey,
      status: 'present',
      label: getWorkedHoursLabel(item?.intime, item?.outtime),
      ...item,
    };
  });

  return attendanceMap;
};

const buildCalendarCells = (month: Dayjs): CalendarCell[] => {
  const firstOfMonth = month.startOf('month');
  const daysInMonth = month.daysInMonth();
  const leadingBlanks = firstOfMonth.day();
  const cells: CalendarCell[] = [];

  for (let i = 0; i < leadingBlanks; i++) {
    cells.push({ key: `empty-start-${i}`, day: null });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const day = firstOfMonth.date(d);
    cells.push({ key: day.format(API_DATE_FORMAT), day });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ key: `empty-end-${cells.length}`, day: null });
  }

  return cells;
};

const CalendarScreen = () => {
  const insets = useInsets();
  const today = useMemo(() => getToday(), []);
  const bottomSheetModalRef = useRef<any>(null);
  const { setIsOpen } = useBottomTabsContext();

  const [currentMonth, setCurrentMonth] = useState<Dayjs>(() =>
    today.startOf('month'),
  );
  const [attendanceMap, setAttendanceMap] = useState<
    Record<string, AttendanceDayData>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [clickedDateDetails, setClickedDateDetails] =
    useState<null | AttendanceDayData>(null);

  const isCurrentVisibleMonth = currentMonth.isSame(today, 'month');

  useEffect(() => {
    const fetchAttendance = async () => {
      const { fromDate, toDate } = getMonthRange(currentMonth);
      try {
        setIsLoading(true);
        const response = await GetAttendanceDayWiseService({
          USER_ID,
          FROM_DATE: fromDate,
          TO_DATE: toDate,
        });
        setAttendanceMap(buildAttendanceMap(response?.data));
      } catch (error) {
        console.log('ATTENDANCE ERROR', error);
        setAttendanceMap({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, [currentMonth]);

  const calendarCells = useMemo(
    () => buildCalendarCells(currentMonth),
    [currentMonth],
  );

  const goToPreviousMonth = () =>
    setCurrentMonth(prev => prev.subtract(1, 'month'));

  const goToNextMonth = () => {
    if (!isCurrentVisibleMonth) {
      setCurrentMonth(prev => prev.add(1, 'month'));
    }
  };

  const renderDayCell = (cell: CalendarCell) => {
    if (!cell.day) {
      return <View key={cell.key} style={styles.emptyCell} />;
    }

    const { day } = cell;
    const dateKey = day.format(API_DATE_FORMAT);
    const attendance = attendanceMap[dateKey];

    const isSunday = day.day() === 0;
    const isFutureDate = day.isAfter(today);
    const isToday = day.isSame(today, 'day');
    const isPresent = isToday || attendance?.status === 'present';
    const isAbsent = !isToday && !isFutureDate && !isSunday && !isPresent;

    const backgroundColor = isPresent
      ? styles.presentDay.backgroundColor
      : isSunday || isAbsent
      ? styles.absentDay.backgroundColor
      : styles.defaultDay.backgroundColor;

    const label = isFutureDate
      ? ''
      : isPresent
      ? isToday
        ? 'Present'
        : attendance?.label || 'Present'
      : isAbsent
      ? 'Absent'
      : '';

    const isHoursLabel = label.includes('hours') || label.includes('mins');

    return (
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        disabled={!isHoursLabel}
        onPress={() => {
          setClickedDateDetails(attendanceMap?.[cell.key]);
          openBottomSheet();
        }}
        key={cell.key}
        style={[styles.dayCell, { backgroundColor }]}
      >
        <StyledText style={styles.dayNumber}>{day.date()}</StyledText>
        {label ? (
          <StyledText
            style={[
              styles.dayLabel,
              isPresent ? styles.presentLabel : styles.absentLabel,
            ]}
          >
            {label}
          </StyledText>
        ) : null}
      </TouchableOpacity>
    );
  };

  const openBottomSheet = useCallback(() => {
    setIsOpen(true);
    bottomSheetModalRef?.current?.present();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
    setIsOpen(false);
  }, []);

  return (
    <HOCView
      paddingHorizontal={10}
      bgColor={COLORS.white}
      headerProps={{ title: 'Attendance' }}
      isEnableScrollView
      scrollViewContentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: verticalScale(90) + (insets?.bottom ?? 0) },
      ]}
    >
      <View style={styles.monthSwitcher}>
        <Pressable onPress={goToPreviousMonth} style={styles.switcherButton}>
          <StyledText style={styles.switcherArrow}>{'<'}</StyledText>
        </Pressable>

        <StyledText style={styles.monthTitle}>
          {currentMonth.format('MMMM YYYY')}
        </StyledText>

        <Pressable
          disabled={isCurrentVisibleMonth}
          onPress={goToNextMonth}
          style={styles.switcherButton}
        >
          <StyledText
            style={[
              styles.switcherArrow,
              isCurrentVisibleMonth ? styles.disabledArrow : null,
            ]}
          >
            {'>'}
          </StyledText>
        </Pressable>
      </View>

      <View style={styles.weekHeaderRow}>
        {WEEK_DAYS.map(day => (
          <View
            key={day}
            style={[
              styles.weekHeaderCell,
              day === 'Sun' ? styles.sundayHeaderCell : null,
            ]}
          >
            <StyledText style={styles.weekHeaderText}>{day}</StyledText>
          </View>
        ))}
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <View style={styles.calendarGrid}>
          {calendarCells.map(renderDayCell)}
        </View>
      )}

      <BottomSheet
        snapPoints={['45%']}
        ref={bottomSheetModalRef}
        onClose={closeBottomSheet}
      >
        <View style={styles.sheetContainer}>
          <StyledText style={styles.sheetHeader}>Attendence Details</StyledText>
          <RowText
            leftWidth={40}
            leftText={'Date'}
            rightText={clickedDateDetails?.attendancedate}
          />
          <RowText
            leftWidth={40}
            leftText={'Working Hours'}
            rightText={clickedDateDetails?.label}
          />
          <RowText
            leftWidth={40}
            leftText={'Check In'}
            rightText={clickedDateDetails?.intime}
          />
          <RowText
            leftText={'Check In Location'}
            rightText={clickedDateDetails?.checkinloclocation}
            style={{
              flexDirection: 'column',
              gap: 10,
            }}
          />
          <RowText
            leftWidth={40}
            leftText={'Check Out'}
            rightText={clickedDateDetails?.outtime}
          />
          <RowText
            leftText={'Check Out Location'}
            rightText={clickedDateDetails?.checkoutloclocation}
            style={{
              flexDirection: 'column',
              gap: 10,
            }}
          />
        </View>
      </BottomSheet>
    </HOCView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  scrollContent: {
    backgroundColor: COLORS.white,
    flexGrow: 1,
  },
  monthSwitcher: {
    backgroundColor: COLORS.secondary,
    borderRadius: moderateScale(18),
    minHeight: verticalScale(50),
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(15),
  },
  switcherButton: {
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  switcherArrow: {
    fontSize: FONTSIZES.extraLarge,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
  },
  disabledArrow: {
    color: COLORS.disableTextColor,
  },
  monthTitle: {
    fontSize: FONTSIZES.large,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
  },
  weekHeaderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  weekHeaderCell: {
    backgroundColor: COLORS.secondary,
    borderRadius: moderateScale(8),
    ...scaleSquare(48),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  sundayHeaderCell: {
    backgroundColor: COLORS.pinkColor,
  },
  weekHeaderText: {
    fontSize: FONTSIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCell: {
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(3),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: verticalScale(10),
    width: scaleSquare(48)?.width,
    minHeight: scaleSquare(48)?.height,
  },
  emptyCell: {
    marginBottom: verticalScale(10),
    width: scaleSquare(48)?.width,
    minHeight: scaleSquare(48)?.height,
  },
  defaultDay: {
    backgroundColor: COLORS.secondary,
  },
  absentDay: {
    backgroundColor: COLORS.pinkColor,
  },
  presentDay: {
    backgroundColor: COLORS.lightGreen,
  },
  dayNumber: {
    fontSize: FONTSIZES.small,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    marginBottom: verticalScale(4),
  },
  dayLabel: {
    textAlign: 'center',
    fontSize: FONTSIZES.extraTiny,
    fontFamily: FONTS.semiBold,
    width: '100%',
  },
  presentLabel: {
    color: COLORS.black,
  },
  absentLabel: {
    color: COLORS.black,
  },
  loaderContainer: {
    minHeight: verticalScale(240),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetContainer: {
    padding: 15,
  },
  sheetHeader: {
    fontFamily: FONTS.semiBold,
    fontSize: FONTSIZES.large,
    marginBottom: 10,
  },
});
