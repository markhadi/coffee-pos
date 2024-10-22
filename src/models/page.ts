export type Paging = {
  total: number;
  cursor?: number | string;
  hasMore: boolean;
};

export type Pageable<T> = {
  data: Array<T>;
  paging: Paging;
};
