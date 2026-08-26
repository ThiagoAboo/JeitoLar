import { useLocation } from "@tanstack/react-router";

/**
 * Substitui o useSearchParams do react-router-dom.
 * Retorna um URLSearchParams derivado da rota atual do TanStack Router.
 */
export function useQueryParams() {
  const location = useLocation();
  const raw =
    location?.searchStr ?? (typeof window !== "undefined" ? window.location.search : "");
  return new URLSearchParams(raw || "");
}
