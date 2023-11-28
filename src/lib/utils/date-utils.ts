import type { BatteryDTO } from '@/lib/pages/home/entity.ts';
import moment from 'moment/moment';

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
