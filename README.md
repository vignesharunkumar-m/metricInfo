# MetricInfo

MetricInfo is a React Native mobile app for employee attendance, location-based check-in/check-out, client listing, and date-wise attendance review. The app asks for location access, fetches the user's current coordinates, resolves the address through reverse geocoding, and stores check-in/check-out details locally for the current day.

## App Flow Explanation

1. On app launch, the app checks required location permission before showing the main application.
2. On the Home screen, the app fetches the user's current GPS coordinates.
3. The coordinates are sent to the configured reverse geocoding API to get a readable address.
4. The current address is shown in the Home screen under `Current Location`.
5. When the user taps Check In, the app captures check-in time, latitude, longitude, and resolved address.
6. When the user taps Check Out, the app captures check-out time, latitude, longitude, and resolved address.
7. Check-in/check-out data is stored locally using AsyncStorage under the current date.
8. When the date changes, stale local attendance data is removed so the next day starts clean.
9. In the Companies tab, the app requests company records with `limit: 10` and an offset.
10. When the user scrolls near the end of the list, the next 10 records are fetched and appended.
11. Tapping a company card opens the attendance calendar screen.
12. The calendar fetches attendance records month by month.
13. Present days show working hours when check-in and check-out times are available.
14. Tapping a present day opens a bottom sheet with check-in/check-out details and locations.

## App Overview

The app is built around three main workflows:

- Home attendance workflow: request location access, fetch current latitude/longitude, reverse geocode the location, and let the user check in or check out.
- Companies workflow: load client/company records from the backend in paginated batches of 10 records.
- Attendance calendar workflow: show date-wise attendance, highlight present/absent days, and open a bottom sheet with check-in/check-out details.

## Features

- Location permission flow before attendance actions.
- Current location fetch using device GPS.
- Reverse geocoding to convert latitude/longitude into a readable address.
- Check-in and check-out with local storage of time, latitude, longitude, and address.
- Local attendance state reset when the stored date no longer matches the current day.
- Company list API integration with infinite scroll pagination.
- Pull-to-refresh support for the company list.
- Date-wise attendance calendar.
- Attendance detail bottom sheet with date, working hours, check-in time, check-in location, check-out time, and check-out location.
- Custom bottom tab navigation.
- SVG icon support through `react-native-svg` and `react-native-svg-transformer`.

## Tech Stack

- React Native `0.85.3`
- React `19.2.3`
- TypeScript
- React Navigation bottom tabs and stack navigation
- Redux Toolkit and React Redux
- Axios for API calls
- AsyncStorage for local check-in/check-out storage
- `@react-native-community/geolocation` for GPS coordinates
- Reverse geocoding service configured in `Src/Services/LocationServices.ts`
- Day.js for date and time formatting
- Gorhom Bottom Sheet for attendance detail sheets
- Firebase Messaging and Notifee for notification permission support
- React Native SVG for vector icons

## API Usage

Base URL:

```txt
https://apex.metricinfo.com/ords/accounts/
```

Company list:

```txt
GET clientlist/getclient
```

Important params:

```txt
subscription_id=SUB22106
EMPLOYEE_ID=177
offset=0
limit=10
```

Attendance day-wise:

```txt
GET attendance/getdaywise
```

Important params:

```txt
USER_ID=177
FROM_DATE=YYYY-MM-DD
TO_DATE=YYYY-MM-DD
```

Example:

```txt
attendance/getdaywise?USER_ID=177&FROM_DATE=2026-05-01&TO_DATE=2026-05-31
```

## Build Optimization

- Company records are loaded 10 at a time to reduce initial payload size and keep list rendering smooth.
- `FlatList` is used for company rendering with guarded pagination to avoid duplicate API calls during scroll.
- Local check-in/check-out state is stored in AsyncStorage to avoid repeated setup during the same day.
- SVG files are transformed into React Native components through `react-native-svg-transformer`.
- Android release builds should keep R8 enabled to shrink, optimize, and remove unused bytecode.
- ProGuard rules should be maintained in `android/app/proguard-rules.pro` for native libraries that require keep rules.
- For release APKs, verify `minifyEnabled` and `shrinkResources` in `android/app/build.gradle` before publishing.
- Run a release build test after enabling R8/ProGuard because aggressive shrinking can break reflection-based libraries if keep rules are missing.

## APK Download Link

APK builds are available here:

[Google Drive APK Folder](https://drive.google.com/drive/u/0/folders/1i0EsXRI8qiecu--t77yVzOKt4swCkKs8)

## Run Locally

Install dependencies:

```sh
npm install
```

Start Metro:

```sh
npm start
```

Run Android:

```sh
npm run android
```

Run iOS:

```sh
npm run ios
```

Type-check:

```sh
npx tsc --noEmit
```
