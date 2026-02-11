import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth";
import { queryKeys } from "../api/queryKeys";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: getCurrentUser,
    retry: false,
  });
}
