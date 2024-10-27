const prefix = "/api";

export const Path = {
  CreateUser: prefix + "/users",
  SearchUser: prefix + "/users",
  LoginUser: prefix + "/users/login",
  LogoutUser: prefix + "/users/logout",
  RefreshUser: prefix + "/users/refresh",
  UpdateUser: prefix + "/users/:username",
  RemoveUser: prefix + "/users/:username",
  CreateCategory: prefix + "/categories",
  SearchCategory: prefix + "/categories",
  UpdateCategory: prefix + "/categories/:id",
  RemoveCategory: prefix + "/categories/:id",
  ListCategory: prefix + "/categories/list",
  CreateProduct: prefix + "/products",
  SearchProduct: prefix + "/products",
  UpdateProduct: prefix + "/products/:id",
  RemoveProduct: prefix + "/products/:id",
  CreatePayment: prefix + "/payments",
  SearchPayment: prefix + "/payments",
  UpdatePayment: prefix + "/payments/:id",
  RemovePayment: prefix + "/payments/:id",
  ListPayment: prefix + "/payments/list",
  CreateTransaction: prefix + "/transactions",
  SearchTransaction: prefix + "/transactions",
  GetTodaySalesTransaction: prefix + "/transactions/today-sales",
  CountTodayTransaction: prefix + "/transactions/today-count",
  GetAverageTransaction: prefix + "/transactions/average",
  GetLast7DaysSalesTransaction: prefix + "/transactions/last-7-days-sales",
};
