interface ProblemDetailsLike {
  title?: string;
  errors?: Record<string, string[]>;
}

export async function parseJsonSafe(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export function extractErrorMessage(data: unknown, fallback: string): string {
  if (typeof data !== "object" || data === null) return fallback;

  const problem = data as ProblemDetailsLike;
  const firstFieldErrors = problem.errors && Object.values(problem.errors)[0];
  if (firstFieldErrors && firstFieldErrors.length > 0) return firstFieldErrors[0];

  return problem.title ?? fallback;
}
