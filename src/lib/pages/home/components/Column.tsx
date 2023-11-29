import type { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Copy,
  MoreHorizontal,
  Pencil,
  TrashIcon,
} from 'lucide-react';

import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import type { Battery } from '@/lib/pages/home/entity';
import { useDeleteBattery } from '@/lib/utils/data-fetcher';

export const columns: ColumnDef<Battery>[] = [
  {
    accessorKey: 'name',
    header: () => {
      return (
        <Button variant="ghost">
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'postCode',
    header: () => {
      return (
        <Button variant="ghost">
          Post Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'wattCapacity',
    header: () => {
      return (
        <Button variant="ghost">
          Wattage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => {
      return (
        <Button variant="ghost">
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'returnDate',
    header: () => {
      return (
        <Button variant="ghost">
          Return Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const battery = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Details</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(battery.id)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy ID
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => useDeleteBattery(battery.id)}>
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
