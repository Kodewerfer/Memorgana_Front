import { useOutletContext } from "react-router-dom";

// as per React Router 6 spec
type TSearchStatus = { isSearching: Boolean };
export function useSearchStatus() {
  return useOutletContext<TSearchStatus>();
}