import { instance } from './Axios';

export const GetClientServices = (data: Object) => {
  return instance.get('clientlist/getclient', { params: data });
};

export const GetAttendanceDayWiseService = (data: Object) => {
  return instance.get('attendance/getdaywise', { params: data });
};
