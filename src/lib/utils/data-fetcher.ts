import moment from 'moment';

import type { BatteryDTO, QueryParams } from '@/lib/pages/home/entity';

export function dateFromNow(payload: BatteryDTO): BatteryDTO {
  return {
    ...payload,
    batteries: payload.batteries.map((battery) => ({
      ...battery,
      createdAt: moment(battery.createdAt).fromNow(),
      returnDate: battery.returnDate
        ? moment(battery.returnDate).fromNow()
        : null,
    })),
  };
}

export async function getAllBatteries(): Promise<BatteryDTO> {
  const response = await fetch('http://localhost:8000/battery');
  const payload = await response.json();
  return dateFromNow(payload);
}

export async function getBatteryByQueryParams(
  query: QueryParams
): Promise<BatteryDTO> {
  const url = `
  http://localhost:8000/battery?page=${query.page}&pageSize=${query.pageSize}&sortBy=${query.sortBy}&sortOrder=${query.sortOrder}&filter=${query.filter}`;
  const response = await fetch(url);
  const payload = await response.json();
  return dateFromNow(payload);
}

export async function deleteBatteryById(id: string): Promise<void> {
  await fetch(`http://localhost:8000/battery/${id}`, {
    method: 'DELETE',
  });
}
