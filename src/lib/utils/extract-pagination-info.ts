import type { BatteryDTO, Pagination } from '@/lib/pages/home/entity';

export function extractPaginationInfo(dto: BatteryDTO): Pagination {
  return {
    total: dto.total,
    page: dto.page,
    pageSize: dto.pageSize,
    totalPages: dto.totalPages,
  };
}
