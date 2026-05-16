import { instance } from './Axios';

export const GetClientServices = (data: Object) => {
  return instance.get('clientlist/getclient', { params: data });
};

export const GetAttendanceDayWiseService = (params: {
  USER_ID: number;
  FROM_DATE: string;
  TO_DATE: string;
}) => {
  return instance.get('attendance/getdaywise', { params });
};
