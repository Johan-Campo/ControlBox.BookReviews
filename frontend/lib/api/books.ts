import "server-only";
import { getApiUrl } from "@/lib/api-url";
import type { Book } from "@/lib/types/book";

interface GetBooksParams {
  search?: string;
  category?: string;
}

export async function getBooks(params: GetBooksParams = {}): Promise<Book[]> {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category) query.set("category", params.category);

  const response = await fetch(`${getApiUrl()}/api/books?${query.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to load books.");

  return response.json();
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${getApiUrl()}/api/books/categories`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to load categories.");

  return response.json();
}
