import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/lib/userApi';

export function useCustomers() {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => userApi.getCustomers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
