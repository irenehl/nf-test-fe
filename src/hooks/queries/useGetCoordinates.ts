import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type ResultType = {
  id: number;
  type: 'SOIL' | 'FERTILIZATION';
  coordinates: number;
};

const getCoordinates = (startDate?: string, endDate?: string) => {
  const params: Record<string, string> = {};

  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  return axios.get<ResultType[]>(`${import.meta.env.VITE_API_URL}/stats/coordinates`, { params });
};

export default function useGetCoordinates(startDate?: string, endDate?: string) {
  console.log(startDate, endDate)
  const {
    data: res,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['coordinates', startDate, endDate],
    queryFn: ({ queryKey }) => getCoordinates(queryKey[1] as string, queryKey[2] as string),
  });

  return {
    res,
    isLoading: isFetching,
    isError,
  };
}
