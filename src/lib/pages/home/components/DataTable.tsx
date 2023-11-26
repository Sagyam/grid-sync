import type { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Button } from '@/lib/components/ui/button';
import { SortBy } from '@/lib/pages/home/entity';

import { DataTablePagination } from './DataTablePagination';
import { DataTableViewOptions } from './DataTableViewOptions';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onPageSizeChange: (pageSize: number) => void;
  onPaginationChange: (page: number) => void;
  onSortChange: (sortBy: SortBy) => void;
  onFilterChange: (filter: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onPageSizeChange,
  onPaginationChange,
  onSortChange,
  onFilterChange,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      rowSelection,
      columnVisibility,
    },
  });

  return (
    <>
      <div className="flex items-stretch py-4">
        <Input
          placeholder="Filter Name"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(e) => {
            table.getColumn('name')?.setFilterValue(e.target.value);
            onFilterChange(e.target.value);
          }}
          className="max-w-sm"
        />
        <DataTableViewOptions table={table} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => onSortChange(SortBy.NAME)}
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => onSortChange(SortBy.POST_CODE)}
                >
                  Post Code
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => onSortChange(SortBy.WATT_CAPACITY)}
                >
                  Watt Capacity
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => onSortChange(SortBy.CREATED_AT)}
                >
                  Created At
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => onSortChange(SortBy.RETURN_DATE)}
                >
                  Return Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        table={table}
        onPageSizeChange={onPageSizeChange}
        onPaginationChange={onPaginationChange}
      />
    </>
  );
}
