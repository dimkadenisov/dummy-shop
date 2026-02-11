import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Product } from "../api/types";
import type { AddProductFormData } from "../schemas/addProductSchema";
import { addProductSchema } from "../schemas/addProductSchema";
import Button from "./ui/Button";
import TextField from "./ui/TextField";

type NewProduct = Omit<
  Product,
  "id" | "rating" | "stock" | "thumbnail" | "category"
>;

type Props = {
  onAdd: (product: NewProduct) => void;
};

export default function AddProductModal({ onAdd }: Props) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductFormData>({
    resolver: zodResolver(addProductSchema),
  });

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) reset();
  };

  const onSubmit = (data: AddProductFormData) => {
    onAdd(data);
    reset();
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <Button className="px-4 py-2 text-sm">Добавить</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
          <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
            Добавить товар
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              label="Наименование"
              error={errors.title}
              {...register("title")}
            />
            <TextField
              label="Цена"
              type="number"
              step="0.01"
              min="0.01"
              inputMode="decimal"
              error={errors.price}
              {...register("price", { valueAsNumber: true })}
            />
            <TextField
              label="Вендор"
              error={errors.brand}
              {...register("brand")}
            />
            <TextField
              label="Артикул"
              error={errors.sku}
              {...register("sku")}
            />
            <div className="flex justify-end gap-3 pt-2">
              <Dialog.Close asChild>
                <Button type="button" variant="ghost" className="px-4 py-2">
                  Отмена
                </Button>
              </Dialog.Close>
              <Button type="submit" className="px-4 py-2 text-sm">
                Добавить
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
