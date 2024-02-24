import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { CreateActivityDto } from '../../types';

const createActivity = (data: CreateActivityDto) => axios.post(`${import.meta.env.VITE_API_URL}/activity`, data);

export default function useCreateActivity() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createActivity,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['activities'],
      }),
  });

  return {
    createActivityAsync: mutateAsync,
    isLoading: isPending,
  };
}
