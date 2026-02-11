import { z } from "zod/mini";

export const loginSchema = z.object({
  username: z.string().check(z.minLength(1, "Заполните поле")),
  password: z
    .string()
    .check(
      z.minLength(1, "Заполните поле"),
      z.minLength(6, "Пароль должен содержать минимум 6 символов"),
    ),
  remember: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
