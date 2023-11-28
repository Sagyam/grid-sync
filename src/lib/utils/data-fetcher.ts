import { getBaseURL } from '@/lib/utils/get-url.ts';

export async function deleteBatteryById(id: string): Promise<void> {
  const url = `${getBaseURL()}/battery/${id}`;
  await fetch(url, {
    method: 'DELETE',
  });
}
