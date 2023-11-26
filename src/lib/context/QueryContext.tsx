import type React from 'react';
import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import type { QueryParams } from '../pages/home/entity';
import { SortBy, SortOrder } from '../pages/home/entity';

interface SetPageAction {
  type: 'SET_PAGE';
  payload: number;
}

interface SetPageSizeAction {
  type: 'SET_PAGE_SIZE';
  payload: number;
}

interface SetSortByAction {
  type: 'SET_SORT_BY';
  payload: SortBy;
}

interface SetSortOrderAction {
  type: 'SET_SORT_ORDER';
  payload: SortOrder;
}

interface SetFilterAction {
  type: 'SET_FILTER';
  payload: string;
}

type QueryParamsAction =
  | SetPageAction
  | SetPageSizeAction
  | SetSortByAction
  | SetSortOrderAction
  | SetFilterAction;

interface QueryParamsContextProps {
  queryParams: QueryParams;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  setFilter: (filter: string) => void;
}

const QueryParamsContext = createContext<QueryParamsContextProps | undefined>(
  undefined
);

const SET_PAGE = 'SET_PAGE';
const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
const SET_SORT_BY = 'SET_SORT_BY';
const SET_SORT_ORDER = 'SET_SORT_ORDER';
const SET_FILTER = 'SET_FILTER';

const queryParamsReducer = (
  state: QueryParams,
  action: QueryParamsAction
): QueryParams => {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, page: action.payload };
    case SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload };
    case SET_SORT_BY:
      return { ...state, sortBy: action.payload };
    case SET_SORT_ORDER:
      return { ...state, sortOrder: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

interface QueryParamsProviderProps {
  children: ReactNode;
}

const initialQueryParams: QueryParams = {
  page: 1,
  pageSize: 10,
  sortBy: SortBy.NAME,
  sortOrder: SortOrder.ASC,
  filter: '',
};

export const QueryParamsProvider: React.FC<QueryParamsProviderProps> = ({
  children,
}) => {
  const [queryParams, dispatch] = useReducer(
    queryParamsReducer,
    initialQueryParams
  );
  const setPage = useCallback(
    (page: number) => dispatch({ type: SET_PAGE, payload: page }),
    [dispatch]
  );
  const setPageSize = useCallback(
    (pageSize: number) => dispatch({ type: SET_PAGE_SIZE, payload: pageSize }),
    [dispatch]
  );
  const setSortBy = useCallback(
    (sortBy: SortBy) => dispatch({ type: SET_SORT_BY, payload: sortBy }),
    [dispatch]
  );
  const setSortOrder = useCallback(
    (sortOrder: SortOrder) =>
      dispatch({ type: SET_SORT_ORDER, payload: sortOrder }),
    [dispatch]
  );
  const setFilter = useCallback(
    (filter: string) => dispatch({ type: SET_FILTER, payload: filter }),
    [dispatch]
  );

  const contextValue: QueryParamsContextProps = useMemo(
    () => ({
      queryParams,
      setPage,
      setPageSize,
      setSortBy,
      setSortOrder,
      setFilter,
    }),
    [queryParams, setPage, setPageSize, setSortBy, setSortOrder, setFilter]
  );

  return (
    <QueryParamsContext.Provider value={contextValue}>
      {children}
    </QueryParamsContext.Provider>
  );
};

export const useQueryParams = (): QueryParamsContextProps => {
  const context = useContext(QueryParamsContext);
  if (!context) {
    throw new Error('useQueryParams must be used within a QueryParamsProvider');
  }
  return context;
};
