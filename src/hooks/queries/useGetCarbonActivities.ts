import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type ResultType = {
  id: number;
  type: 'SOIL' | 'FERTILIZATION';
  number: number;
};

const getCarbon = (startDate?: string, endDate?: string) => {
  const params: Record<string, string> = {};

  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  return axios.get<ResultType[]>(`${import.meta.env.VITE_API_URL}/stats/carbon`, { params });
};

export default function useGetCarbonNum(startDate?: string, endDate?: string) {
  const {
    data: res,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['carbon', startDate, endDate],
    queryFn: ({ queryKey }) => getCarbon(queryKey[1] as string, queryKey[2] as string),
  });

  return {
    res,
    isLoading: isFetching,
    isError,
  };
}
