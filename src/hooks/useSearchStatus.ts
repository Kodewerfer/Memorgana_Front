import { useOutletContext } from "react-router-dom";

// as per React Router 6 spec
type T_SearchStatus = { isSearching: Boolean };
export function useSearchStatus() {
  return useOutletContext<T_SearchStatus>();
}