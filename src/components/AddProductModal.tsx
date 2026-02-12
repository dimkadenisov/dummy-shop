import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Product } from "../api/types";
import type { AddProductFormData } from "../schemas/addProductSchema";
import { addProductSchema } from "../schemas/addProductSchema";
import { Button } from "./ui/Button";
import { Modal, ModalClose } from "./ui/Modal";
import { TextField } from "./ui/TextField";

export type NewProduct = Omit<
  Product,
  "id" | "rating" | "stock" | "thumbnail" | "category"
>;

type Props = {
  onAdd: (product: NewProduct) => void;
};

export function AddProductModal({ onAdd }: Props) {
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
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      trigger={<Button className="px-4 py-2 text-sm">Добавить</Button>}
      title="Добавить товар"
    >
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
          <ModalClose asChild>
            <Button type="button" variant="ghost" className="px-4 py-2">
              Отмена
            </Button>
          </ModalClose>
          <Button type="submit" className="px-4 py-2 text-sm">
            Добавить
          </Button>
        </div>
      </form>
    </Modal>
  );
}
