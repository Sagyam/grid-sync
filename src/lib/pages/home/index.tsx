import { useEffect, useState } from 'react';

import { columns } from '@/lib/pages/home/components/Column';
import { DataTable } from '@/lib/pages/home/components/DataTable';
import type { BatteryDTO } from '@/lib/pages/home/entity';
import {
  getAllBatteries,
  getBatteryByQueryParams,
} from '@/lib/utils/data-fetcher';

const Home = () => {
  const [dto, setDTO] = useState<BatteryDTO>({
    batteries: [],
    total: 0,
    page: 0,
    pageSize: 0,
  });

  useEffect(() => {
    getAllBatteries().then((payload) => {
      setDTO(payload);
    });
  }, []);

  const handlePageSizeChange = (pageSize: number) => {
    getBatteryByQueryParams({ pageSize }).then((payload) => {
      setDTO(payload);
    });
  };

  const paginationChange = (page: number) => {
    getBatteryByQueryParams({ page }).then((payload) => {
      setDTO(payload);
    });
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={dto.batteries}
        onPageSizeChange={handlePageSizeChange}
        onPaginationChange={paginationChange}
      />
    </div>
  );
};

export default Home;
