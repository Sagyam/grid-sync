import type { Battery } from '@/lib/pages/home/battery.entity';
import { columns } from '@/lib/pages/home/components/Column';
import { DataTable } from '@/lib/pages/home/components/DataTable';

function getData(): Battery[] {
  return [
    {
      id: '1',
      createdAt: new Date(),
      name: 'Battery 1',
      postCode: '1234',
      wattCapacity: 100,
      returnDate: new Date(),
    },
    {
      id: '2',
      createdAt: new Date(),
      name: 'Battery 2',
      postCode: '1234',
      wattCapacity: 100,
      returnDate: new Date(),
    },
  ];
}

const Home = () => {
  const data = getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Home;
