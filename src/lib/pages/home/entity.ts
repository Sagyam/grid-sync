export interface Battery {
  id: string;
  createdAt: string;
  name: string;
  postCode: string;
  wattCapacity: number;
  returnDate: string | null;
}

export interface BatteryDTO {
  total: number;
  page: number;
  pageSize: number;
  batteries: Battery[];
}
