export type PagedResponse<T> = {
  object: 'list';
  offset: number;
  limit: number;
  total: number;
  data: T[];
};
