export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  summary: string;
  coverUrl: string | null;
  publishedYear: number;
  averageRating: number;
  reviewCount: number;
}
