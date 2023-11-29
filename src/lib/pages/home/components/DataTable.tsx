import { Button } from '@/lib/components/ui/button';
import useLoadingStateStore from '@/lib/store/loading-state-store.ts';
import useQueryParamsStore from '@/lib/store/query-params-store.ts';
import type { Filter } from '@/lib/pages/home/entity';
import {
  FilterBy,
  FilterOperator,
  SortBy,
  SortOrder,
} from '@/lib/pages/home/entity';
import type { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';

import { DataTablePagination } from './DataTablePagination';
import { DataTableViewOptions } from './DataTableViewOptions';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { isLoading, isError, errorMessage } = useLoadingStateStore();
  const { queryParams, setSortBy, setSortOrder, setFilter, setPage } =
    useQueryParamsStore();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      rowSelection,
      columnVisibility,
    },
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const filter: Filter = {
      field: FilterBy.NAME,
      operator: FilterOperator.CONTAINS,
      value: event.target.value,
    };
    setFilter(filter);
    setPage(1);
  };
  const handleSortChange = (sortBy: SortBy) => {
    const flippedSortOrder =
      queryParams.sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    setSortOrder(flippedSortOrder);
    setSortBy(sortBy);
  };

  return (
    <>
      <div className="flex items-stretch py-4">
        <Input
          placeholder="Search database for name"
          value={searchQuery}
          onChange={handleQueryChange}
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
                  onClick={() => handleSortChange(SortBy.NAME)}
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => handleSortChange(SortBy.POST_CODE)}
                >
                  Post Code
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => handleSortChange(SortBy.WATT_CAPACITY)}
                >
                  Watt Capacity
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => handleSortChange(SortBy.CREATED_AT)}
                >
                  Created At
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => handleSortChange(SortBy.RETURN_DATE)}
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
                  className={isLoading ? 'opacity-50' : ''}
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
                  {isLoading
                    ? 'Loading...'
                    : isError
                      ? errorMessage
                      : 'No data'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </>
  );
}
