import { get, post } from "./client";
import type { AuthResponse, LoginParams } from "./types";

export async function login({
  username,
  password,
  remember,
}: LoginParams): Promise<AuthResponse> {
  return post<AuthResponse>("/auth/login", {
    username,
    password,
    expiresInMins: remember ? 60 : 0,
  });
}

export async function logout(): Promise<void> {
  await post<void>("/auth/logout", {});
}

export async function getCurrentUser(): Promise<AuthResponse> {
  return get<AuthResponse>("/auth/me");
}
