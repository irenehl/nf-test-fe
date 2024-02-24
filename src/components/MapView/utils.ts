import { Feature } from '../../types';

export const mapCoordinates = (feature: Feature) => {
  const coordinates =
    feature.geometry.type === 'Point' ? [feature.geometry.coordinates] : feature.geometry.coordinates[0];

  const mappedCoordinates = coordinates.map((coor: any) => {
    return {
      lat: coor[1].toString(),
      lng: coor[0].toString(),
    };
  });

  return mappedCoordinates;
};
