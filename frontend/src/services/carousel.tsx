import { useFetch } from ".";

export function useCarousels() {
  const r = useFetch<string[]>("/carousels/");
  return {
    carousels: (r.error ? undefined : r.data) ?? [],
    ...r,
  };
}
