import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type TotalType = {
  soilTotal: number;
  fertilizationTotal: number;
};

const getTotal = (startDate?: string, endDate?: string) => {
  const params: Record<string, string> = {};
  if (startDate) params.startDate = new Date(startDate).toISOString();
  if (endDate) params.endDate = new Date(endDate).toISOString();

  return axios.get<TotalType>(`${import.meta.env.VITE_API_URL}/stats`, { params });
};

export default function useGetTotalActivities(startDate?: string, endDate?: string) {
  const {
    data: res,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['total-act', startDate, endDate],
    queryFn: ({ queryKey }) => getTotal(queryKey[1], queryKey[2]),
  });

  return {
    res,
    isLoading: isFetching,
    isError,
  };
}
