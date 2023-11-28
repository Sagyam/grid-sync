import create from 'zustand';
import type { QueryParams, Filter } from '../pages/home/entity';
import { SortBy, SortOrder } from '../pages/home/entity';

interface QueryParamsStore {
  queryParams: QueryParams;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  setFilter: (filter: Filter) => void;
}

const initialQueryParams: QueryParams = {
  page: 1,
  pageSize: 10,
  sortBy: SortBy.NAME,
  sortOrder: SortOrder.ASC,
  filter: {
    field: null,
    operator: null,
    value: null,
  },
};

const useQueryParamsStore = create<QueryParamsStore>((set) => ({
  queryParams: initialQueryParams,
  setPage: (page) =>
    set((state) => ({ queryParams: { ...state.queryParams, page } })),
  setPageSize: (pageSize) =>
    set((state) => ({ queryParams: { ...state.queryParams, pageSize } })),
  setSortBy: (sortBy) =>
    set((state) => ({ queryParams: { ...state.queryParams, sortBy } })),
  setSortOrder: (sortOrder) =>
    set((state) => ({ queryParams: { ...state.queryParams, sortOrder } })),
  setFilter: (filter) =>
    set((state) => ({ queryParams: { ...state.queryParams, filter } })),
}));

export default useQueryParamsStore;
