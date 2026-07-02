export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string | null;
  username: string;
  userId: number;
}
