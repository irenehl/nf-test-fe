import { FC, useLayoutEffect, useRef, useState } from 'react';
import { Map, NavigationControl } from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useCreateActivity from '../../hooks/mutations/useCreateActivity';
import { CreateActivityDto, Feature } from '../../types';
import { mapCoordinates } from './utils';
import useGetActivities from '../../hooks/queries/useGetActivities';
import Loading from '../loading/Loading';

type ActivityFormProps = {
  carbon: number;
};

const MapView: FC = () => {
  const [app, setApp] = useState<{
    map: Map;
    loading: boolean;
    currentFeature: Feature;
    points: {
      data: 'unloaded' | 'loaded';
      layer: 'unloaded' | 'loaded';
    };
    polygons: {
      data: 'unloaded' | 'loaded';
      layer: 'unloaded' | 'loaded';
    };
  }>({
    loading: true,
    points: {
      data: 'unloaded',
      layer: 'unloaded',
    },
    polygons: {
      data: 'unloaded',
      layer: 'unloaded',
    },
  } as any);
  const { activities, isLoading } = useGetActivities();

  const mapDiv = useRef<HTMLDivElement>(null);

  const { createActivityAsync, isLoading: isPending } = useCreateActivity();

  const { handleSubmit, register, reset } = useForm<ActivityFormProps>({
    defaultValues: {
      carbon: undefined,
    },
  });

  const onSubmit = async (data: ActivityFormProps) => {
    try {
      const body: CreateActivityDto = {
        number: +data.carbon,
        type: app.currentFeature.geometry.type === 'Point' ? 'SOIL' : 'FERTILIZATION',
        coordinates: mapCoordinates(app.currentFeature),
      };

      const res = await createActivityAsync(body);

      if (res && res.status === 201) {
        toast.success('Activity created succesfully', {
          id: 'activity-created',
          duration: 5000,
        });
      }
    } catch (err) {
      const { response } = err as any;
      const { message } = response?.data ?? 'Something went wrong';

      toast.error(message, {
        id: 'activity-failure',
        duration: 5000,
      });
    }
  };

  useLayoutEffect(() => {
    const deleteAllFeatures = (draw: MapboxDraw) => {
      const data = draw.getAll();

      if (data.features.length > 0) {
        data.features.forEach((feature: { id: string } & any) => {
          draw.delete(feature.id);
        });
      }
    };

    const updateArea = (e: any) => {
      const feature = e.features[0];
      setApp((prev) => ({ ...prev, currentFeature: feature }));
    };

    if (!app.map) {
      setApp((prev) => ({ ...prev, loading: true }));

      const map = new Map({
        container: mapDiv.current as HTMLDivElement,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-74.5, 40],
        zoom: 10,
      });

      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
          point: true,
        },
        defaultMode: 'draw_polygon',
      });

      map.addControl(draw);

      map.on('draw.create', (e) => updateArea(e));
      map.on('draw.delete', () => deleteAllFeatures(draw));

      map.addControl(new NavigationControl());

      map.on('load', () => setApp((prev) => ({ ...prev, loading: false })));

      setApp((prev) => ({ ...prev, map }));
    }
  }, [app.map]);

  useLayoutEffect(() => {
    if (app.map && !app.loading && activities) {
      const points = activities
        .filter(({ type }) => type === 'SOIL')
        .map((p) => ({
          type: 'Point' as const,
          coordinates: [+p.coordinates[0].lng, +p.coordinates[0].lat],
        }));

      const polygons = activities
        .filter(({ type }) => type !== 'SOIL')
        .map((p) => ({
          type: 'Polygon' as const,
          coordinates: [p.coordinates.map((c): number[] => [+c.lng, +c.lat])],
        }));

      if (app.points.data === 'loaded') {
        app.map.removeSource('points');
      }

      if (app.points.layer === 'loaded') {
        app.map.removeLayer('soil');
      }

      if (app.polygons.data === 'loaded') {
        app.map.removeSource('polygons');
      }

      if (app.polygons.layer === 'loaded') {
        app.map.removeLayer('fertilization');
      }

      app.map.addSource('points', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: points.map((p) => ({
            type: 'Feature',
            geometry: p,
            properties: {},
          })),
        },
      });

      app.map.addLayer({
        id: 'soil',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-radius': 6,
          'circle-color': 'red',
        },
      });

      app.map.addSource('polygons', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: polygons.map((p) => ({
            type: 'Feature',
            geometry: p,
            properties: {},
          })),
        },
      });

      app.map.addLayer({
        id: 'fertilization',
        type: 'fill',
        source: 'polygons',
        paint: {
          'fill-color': '#97dcfe',
          'fill-opacity': 0.4,
        },
      });
    }
  }, [app.map, activities, app.loading]);

  return (
    <>
      {isLoading || isPending ? <Loading /> : null}
      <div ref={mapDiv} className="fixed left-0 top-0 -z-10 h-screen w-screen" />
      <div className="absolute bottom-5 z-10 inline-flex w-full items-center justify-center">
        <form
          className="ml-12 flex w-4/5 flex-col gap-2 rounded-2xl bg-neutral/90 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="font-semibold md:text-lg">
            {!app.currentFeature ? 'Add a feature into the map' : `Adding a ${app.currentFeature.geometry.type}`}
          </h2>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
            <fieldset className="inline-flex w-full items-center justify-center gap-1">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="carbon" className="label">
                Data
              </label>
              <input
                type="number"
                className="input input-sm input-bordered w-full"
                disabled={!app.currentFeature}
                {...register('carbon')}
              />
            </fieldset>
            <button
              type="submit"
              disabled={!app.currentFeature}
              className="btn btn-primary btn-sm"
              onClick={() => reset()}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MapView;
