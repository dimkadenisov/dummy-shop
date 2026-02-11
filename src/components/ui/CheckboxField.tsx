import * as Checkbox from "@radix-ui/react-checkbox";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import CheckmarkIcon from "../../assets/CheckmarkIcon";

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
};

export default function CheckboxField<T extends FieldValues>({
  name,
  control,
  label,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center gap-2 cursor-pointer">
          <Checkbox.Root
            id={name}
            checked={field.value}
            onCheckedChange={(v) => field.onChange(v === true)}
            className="h-4 w-4 rounded border border-gray-300 flex items-center justify-center data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
          >
            <Checkbox.Indicator className="cursor-pointer">
              <CheckmarkIcon width="10" height="10" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label
            htmlFor={name}
            className="text-sm text-gray-600 cursor-pointer"
          >
            {label}
          </label>
        </div>
      )}
    />
  );
}
