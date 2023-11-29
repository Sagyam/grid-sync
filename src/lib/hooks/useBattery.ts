import type { BatteryDTO } from '@/lib/pages/home/entity.ts';
import useLoadingStateStore from '@/lib/store/loading-state-store.ts';
import useBatteryDTOStore from '@/lib/store/battery-store.ts';
import useQueryParamsStore from '@/lib/store/query-params-store.ts';
import { dateFromNow } from '@/lib/utils/date-utils.ts';
import { getBaseURL } from '@/lib/utils/get-url.ts';
import { useEffect } from 'react';

export function useFetchBattery(): BatteryDTO | null {
  const { queryParams } = useQueryParamsStore();
  const { batteryDTO, updateBatteryDTO } = useBatteryDTOStore();
  const { setLoading, setError, setSuccess } = useLoadingStateStore();

  useEffect(() => {
    // Create an AbortController instance
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      let url = `${getBaseURL()}/battery?`;
      url += `page=${queryParams.page}`;
      url += `&pageSize=${queryParams.pageSize}`;
      url += `&sortBy=${queryParams.sortBy}`;
      url += `&sortOrder=${queryParams.sortOrder}`;

      if (queryParams.filter.value) {
        url += `&filter=${queryParams.filter.field}:${queryParams.filter.operator}:${queryParams.filter.value}`;
      }

      try {
        setLoading(true);
        const response = await fetch(url, { signal });
        const payload = await response.json();
        updateBatteryDTO(dateFromNow(payload));
        setSuccess(true, 'Data fetched successfully');
      } catch (error) {
        setError(true, 'Problem fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [queryParams, setError, setLoading, setSuccess, updateBatteryDTO]);

  return batteryDTO;
}
