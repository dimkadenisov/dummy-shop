import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/auth";
import { queryKeys } from "../api/queryKeys";
import type { LoginParams } from "../types";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: LoginParams) => login(params),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me(), data);
    },
  });
}
