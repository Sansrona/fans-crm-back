export enum SortDirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const DefaultQueryParams = {
  pageSize: 10,
  sortBy: 'createdAt',
  sortDirection: SortDirectionEnum.DESC,
  pageSizeSmall: 6,
  pageSizeLarge: 10,
  pageSizeExtraSmall: 5,
};

export type IncomingPaginationAndSortingTypes = {
  pageNumber: string;
  pageSize: string;
  sortBy: string;
  sortDirection: SortDirectionEnum;
};

export type PaginationAndSortingTypes = PaginationTypes & SortingTypes;

export type PaginationTypes = {
  pageNumber: number;
  pageSize: number;
};

export type SortingTypes = {
  sortBy: string;
  sortDirection: SortDirectionEnum;
};

export type IncomingPaginationTypes = {
  pageNumber: string;
  pageSize: string;
};
