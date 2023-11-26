import moment from 'moment';

import type { BatteryDTO } from '@/lib/pages/home/entity';

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

enum SortBy {
  NAME = 'name',
  ID = 'id',
  CREATED_AT = 'createdAt',
  POST_CODE = 'postCode',
  WATT_CAPACITY = 'wattCapacity',
  RETURN_DATE = 'returnDate',
}

export interface BatteryQueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  filter?: string;
}

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

export async function getBatteryByQueryParams({
  page = 1,
  pageSize = 10,
  sortBy = SortBy.NAME,
  sortOrder = SortOrder.ASC,
  filter = '',
}: BatteryQueryParams): Promise<BatteryDTO> {
  const url = `http://localhost:8000/battery?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&filter=${filter}`;
  const response = await fetch(url);
  const payload = await response.json();
  return dateFromNow(payload);
}
