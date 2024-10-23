export type CategoryResponse = {
  id: number;
  name: string;
};

export type CreateCategoryRequest = {
  name: string;
};

export type SearchCategoryRequest = {
  name?: string;
  size?: number;
  cursor?: number;
};

export type UpdateCategoryRequest = {
  id: number;
  name: string;
};
