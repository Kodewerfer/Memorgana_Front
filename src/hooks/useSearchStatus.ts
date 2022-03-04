import { useOutletContext } from "react-router-dom";

// as per React Router 6 spec
type SearchStatus = { isSearching: Boolean };
export function useSearchStatus() {
  return useOutletContext<SearchStatus>();
}