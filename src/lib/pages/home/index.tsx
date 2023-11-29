import { useFetchBattery } from '@/lib/hooks/useBattery.ts';
import { columns } from '@/lib/pages/home/components/Column';
import { DataTable } from '@/lib/pages/home/components/DataTable';

const Home = () => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={useFetchBattery()?.batteries ?? []} />
    </div>
  );
};

export default Home;
