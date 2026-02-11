import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/auth";
import { queryKeys } from "../api/queryKeys";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.setQueryData(queryKeys.auth.me(), null);
      queryClient.removeQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}
