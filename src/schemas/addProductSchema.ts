import { z } from "zod/mini";

export const addProductSchema = z.object({
  title: z.string().check(z.trim(), z.minLength(1, "Заполните поле")),
  price: z
    .number()
    .check(
      z.positive("Цена должна быть больше нуля"),
      z.minimum(0.01, "Минимум 0.01"),
    ),
  brand: z.string().check(z.trim(), z.minLength(3, "Mинимум 3 символа")),
  sku: z.string().check(z.trim(), z.minLength(6, "Минимум 6 символов")),
});

export type AddProductFormData = z.infer<typeof addProductSchema>;
