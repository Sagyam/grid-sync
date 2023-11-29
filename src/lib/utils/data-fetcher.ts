import useLoadingStateStore from '@/lib/store/loading-state-store.ts';
import { getBaseURL } from '@/lib/utils/get-url.ts';

export async function useDeleteBattery(id: string): Promise<void> {
  const { setLoading, setError, setSuccess } = useLoadingStateStore();

  try {
    setLoading(true);
    const url = `${getBaseURL()}/battery/${id}`;
    await fetch(url, {
      method: 'DELETE',
    });
    setSuccess(true, 'Battery deleted successfully');
  } catch (error) {
    setError(true, 'Problem deleting battery');
  } finally {
    setLoading(false);
  }
}
