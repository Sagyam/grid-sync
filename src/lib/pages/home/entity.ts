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
  totalPages: number;
  batteries: Battery[];
}

export interface QueryParams {
  page: number;
  pageSize: number;
  sortBy: SortBy;
  sortOrder: SortOrder;
  filter: Filter;
}

export interface Filter {
  field: FilterBy | null;
  operator: FilterOperator | null;
  value: string | null;
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

export enum FilterBy {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  POST_CODE = 'postCode',
  WATT_CAPACITY = 'wattCapacity',
  RETURN_DATE = 'returnDate',
}

export enum FilterOperator {
  EQUALS = 'equals',
  CONTAINS = 'contains',
  GREATER_THAN = 'greaterThan',
  LESS_THAN = 'lessThan',
}
