import logo from '../Assets/Svg/metric-logo.svg';
import smallLogo from '../Assets/Svg/mi-logo.svg';
import assetsImage from '../Assets/Svg/assetsImage.svg';
import homeWhite from '../Assets/Svg/homeWhite.svg';
import homeOutLine from '../Assets/Svg/homeOutLine.svg';
import visitWhite from '../Assets/Svg/visitWhite.svg';
import visitOutLine from '../Assets/Svg/visitOutLine.svg';
import companiesWhite from '../Assets/Svg/companiesWhite.svg';
import companiesOutline from '../Assets/Svg/companiesOutline.svg';
import claimsWhite from '../Assets/Svg/claimsWhite.svg';
import claimsOutline from '../Assets/Svg/claimsOutline.svg';
import settingsWhite from '../Assets/Svg/settingsWhite.svg';
import settingsOutline from '../Assets/Svg/settingsOutline.svg';
import dotMenu from '../Assets/Svg/dotMenu.svg';
import location from '../Assets/Svg/location.svg';
import user from '../Assets/Svg/user.svg';
import phone from '../Assets/Svg/phone.svg';
import email from '../Assets/Svg/email.svg';
import filter from '../Assets/Svg/filter.svg';
import searchIcon from '../Assets/Svg/searchIcon.svg';
import edit from '../Assets/Svg/edit.svg';
import myVisit from '../Assets/Svg/myVisit.svg';
import schedule from '../Assets/Svg/schedule.svg';
import checkIn from '../Assets/Svg/checkIn.svg';
import checkOut from '../Assets/Svg/checkOut.svg';
import timer from '../Assets/Svg/timer.svg';
import plus from '../Assets/Svg/plus.svg';
import profile_round from '../Assets/Png/profile_round.png';
import cancelIcon from '../Assets/Svg/cancel_icon.svg';

export type IconType =
  | 'logo'
  | 'smallLogo'
  | 'assetsImage'
  | 'homeWhite'
  | 'homeOutLine'
  | 'visitWhite'
  | 'visitOutLine'
  | 'companiesWhite'
  | 'companiesOutline'
  | 'claimsWhite'
  | 'claimsOutline'
  | 'settingsWhite'
  | 'settingsOutline'
  | 'dotMenu'
  | 'location'
  | 'user'
  | 'phone'
  | 'email'
  | 'filter'
  | 'searchIcon'
  | 'plus'
  | 'edit'
  | 'myVisit'
  | 'schedule'
  | 'checkIn'
  | 'checkOut'
  | 'timer'
  | 'profile_round'
  | 'cancelIcon';

export const ICONS: Record<IconType, any> = {
  logo: logo,
  smallLogo: smallLogo,
  assetsImage: assetsImage,
  homeWhite,
  homeOutLine,
  visitWhite,
  visitOutLine,
  companiesWhite,
  companiesOutline,
  claimsWhite,
  claimsOutline,
  settingsWhite,
  settingsOutline,
  dotMenu,
  location,
  user,
  phone,
  email,
  filter,
  searchIcon,
  plus,
  edit,
  myVisit,
  schedule,
  checkIn,
  checkOut,
  timer,
  profile_round,
  cancelIcon,
};
