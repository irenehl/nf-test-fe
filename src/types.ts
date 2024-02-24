export type Feature = {
  id: string;
  type: string;
  properties: Properties;
  geometry: Geometry;
};

export type Geometry =
  | {
      coordinates: number[];
      type: 'Point';
    }
  | {
      type: 'Polygon';
      coordinates: Array<Array<Array<number>>>;
    };

export type Properties = {};

export type CreateActivityDto = {
  number: number;
  type: 'SOIL' | 'FERTILIZATION';
  coordinates: { lat: string; lng: string }[];
};
