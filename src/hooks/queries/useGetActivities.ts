import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type ActivityType = {
  number: number;
  type: string;
  coordinates: Array<CoordinatesType>;
};

type CoordinatesType = {
  lat: string;
  lng: string;
};

const getActivities = () => axios.get<ActivityType[]>(`${import.meta.env.VITE_API_URL}/activity`);

export default function useGetActivities() {
  const {
    data: res,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['activites'],
    queryFn: getActivities,
  });

  return {
    activities: res?.data && Array.isArray(res.data) ? res.data : [],
    isLoading: isFetching,
    isError,
  };
}
