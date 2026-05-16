export const BASEURL = 'https://apex.metricinfo.com/ords/accounts/';

export const MAPBOX_ACCESS_TOKEN = 'key';
export function hasMapboxAccessToken() {
  return MAPBOX_ACCESS_TOKEN.trim().length > 0;
}
