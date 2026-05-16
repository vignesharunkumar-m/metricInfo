import Geolocation from '@react-native-community/geolocation';
import { MAPBOX_ACCESS_TOKEN, hasMapboxAccessToken } from './ServiceConstants';
import { LocationProps } from '../Screens/HomeScreen';

type Location = {
  lat: number;
  lng: number;
};

type GeocodingContext = {
  id: string;
  text: string;
};

type GeocodingFeature = {
  place_name: string;
  text: string;
  address?: string;
  context?: GeocodingContext[];
};

type GeocodingResponse = {
  features: GeocodingFeature[];
};

const buildFullAddress = (feature: GeocodingFeature): string => {
  const parts: string[] = [];

  if (feature.address) parts.push(`${feature.address} ${feature.text}`);
  else if (feature.text) parts.push(feature.text);

  const contextOrder = [
    'neighborhood',
    'locality',
    'place',
    'district',
    'region',
    'postcode',
    'country',
  ];

  const contextMap: Record<string, string> = {};
  feature.context?.forEach(ctx => {
    const type = ctx.id.split('.')[0];
    contextMap[type] = ctx.text;
  });

  contextOrder.forEach(key => {
    if (contextMap[key]) parts.push(contextMap[key]);
  });

  return parts.join(', ');
};

export async function reverseGeocodeLocation(
  location: Location,
): Promise<string | null> {
  if (!location?.lat || !location?.lng || !hasMapboxAccessToken()) {
    return null;
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.lng},${location.lat}.json?types=address,neighborhood,locality,place,region,postcode,country&limit=1&access_token=${MAPBOX_ACCESS_TOKEN}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Unable to geocode location.');
  }

  const data = (await response.json()) as GeocodingResponse;

  if (!data?.features?.length) return null;

  return buildFullAddress(data.features[0]);
}

export const getCurrentCoordinates = (): Promise<LocationProps> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
};
