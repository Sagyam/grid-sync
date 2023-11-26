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

export interface Pagination {
  total: number;
  page: number;
  pageSize: number;
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SortBy {
  NAME = 'name',
  ID = 'id',
  CREATED_AT = 'createdAt',
  POST_CODE = 'postCode',
  WATT_CAPACITY = 'wattCapacity',
  RETURN_DATE = 'returnDate',
}

export interface QueryParams {
  page: number;
  pageSize: number;
  sortBy: SortBy;
  sortOrder: SortOrder;
  filter: string;
}
