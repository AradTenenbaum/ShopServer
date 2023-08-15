export interface User {
  id: number;
  username: string;
  password: string;
  favoriteCategories: Set<string>;
}
