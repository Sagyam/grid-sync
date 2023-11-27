import { useEffect, useState } from 'react';

import { usePagination } from '@/lib/context/PaginationContext';
import { useQueryParams } from '@/lib/context/QueryContext';
import { columns } from '@/lib/pages/home/components/Column';
import { DataTable } from '@/lib/pages/home/components/DataTable';
import type { BatteryDTO, SortBy } from '@/lib/pages/home/entity';
import { SortOrder } from '@/lib/pages/home/entity';
import {
  getAllBatteries,
  getBatteryByQueryParams,
} from '@/lib/utils/data-fetcher';
import { extractPaginationInfo } from '@/lib/utils/extract-pagination-info';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [dto, setDTO] = useState<BatteryDTO>({
    batteries: [],
    total: 1,
    page: 1,
    pageSize: 1,
    totalPages: 1,
  });

  const {
    queryParams,
    setPage,
    setPageSize,
    setSortOrder,
    setSortBy,
    setFilter,
  } = useQueryParams();

  const { setPagination } = usePagination();

  useEffect(() => {
    async function wrapper() {
      setIsLoading(true);
      const payload = await getAllBatteries();
      setDTO(payload);
      setPagination(extractPaginationInfo(payload));
      setIsLoading(false);
    }

    wrapper();
  }, [setPagination]);

  const handlePageSizeChange = async (pageSize: number) => {
    setIsLoading(true);
    setPageSize(pageSize);
    const payload = getBatteryByQueryParams(queryParams);
    setPagination(extractPaginationInfo(await payload));
    setDTO(await payload);
    setIsLoading(false);
  };

  const handlePaginationChange = async (page: number) => {
    setIsLoading(true);
    setPage(page);
    const payload = getBatteryByQueryParams(queryParams);
    setPagination(extractPaginationInfo(await payload));
    setDTO(await payload);
    setIsLoading(false);
  };

  const handleSortChange = async (sortBy: SortBy) => {
    setIsLoading(true);
    const sortOrder =
      queryParams.sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    setSortOrder(sortOrder);
    setSortBy(sortBy);
    const payload = getBatteryByQueryParams(queryParams);
    setDTO(await payload);
    setPagination(extractPaginationInfo(await payload));
    setIsLoading(false);
  };
  const handleFilterChange = async (filter: string) => {
    setIsLoading(true);
    const filterString = `name:contains:${filter}`;
    setFilter(filterString);
    const payload = getBatteryByQueryParams(queryParams);
    setDTO(await payload);
    setPagination(extractPaginationInfo(await payload));
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={dto.batteries}
        onPageSizeChange={handlePageSizeChange}
        onPaginationChange={handlePaginationChange}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default Home;
