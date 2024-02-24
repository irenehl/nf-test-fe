import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type TotalType = {
  soilTotal: number;
  fertilizationTotal: number;
};

const getTotal = (startDate?: string, endDate?: string) => {
  const params: Record<string, string> = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  return axios.get<TotalType>(`${import.meta.env.VITE_API_URL}/stats`, { params });
};

export default function useGetTotalActivities(startDate?: string, endDate?: string) {
  const {
    data: res,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['total-act', startDate, endDate],
    queryFn: ({ queryKey }) => getTotal(queryKey[1] as string, queryKey[2] as string),
  });

  return {
    res,
    isLoading: isFetching,
    isError,
  };
}
