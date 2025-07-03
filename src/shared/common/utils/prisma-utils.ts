// utils/PrismaUtils.ts

type PaginationParams = {
  page?: number;
  pageSize?: number;
};

type FilterParams<T> = {
  where?: T;
};

type OrderParams<T> = {
  orderBy?: T;
};

export function paginate<T>({ page = 1, pageSize = 10 }: PaginationParams): {
  skip: number;
  take: number;
} {
  return {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
}

export function buildQuery<Where = any, OrderBy = any>({
  page = 1,
  pageSize = 10,
  where,
  orderBy,
}: {
  page?: number;
  pageSize?: number;
  where?: Where;
  orderBy?: OrderBy;
}): {
  skip: number;
  take: number;
  where?: Where;
  orderBy?: OrderBy;
} {
  return {
    skip: (page - 1) * pageSize,
    take: pageSize,
    where,
    orderBy,
  };
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
