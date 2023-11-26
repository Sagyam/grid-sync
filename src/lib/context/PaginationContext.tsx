import type React from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import type { Pagination } from '@/lib/pages/home/entity';

interface PaginationContextProps {
  pagination: Pagination;
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
}

const PaginationContext = createContext<PaginationContextProps | undefined>(
  undefined
);

interface PaginationProviderProps {
  children: React.ReactNode;
}

const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
}) => {
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    pageSize: 10,
  });

  const contextValue = useMemo(
    () => ({ pagination, setPagination }),
    [pagination, setPagination]
  );

  return (
    <PaginationContext.Provider value={contextValue}>
      {children}
    </PaginationContext.Provider>
  );
};

const usePagination = () => {
  const context = useContext(PaginationContext);

  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }

  return context;
};

export { PaginationProvider, usePagination };
