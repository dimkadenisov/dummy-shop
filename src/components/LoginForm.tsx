import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import type { LoginFormData } from "../schemas/loginSchema";
import { loginSchema } from "../schemas/loginSchema";
import Button from "./ui/Button";
import CheckboxField from "./ui/CheckboxField";
import TextField from "./ui/TextField";

export default function LoginForm() {
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { remember: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginMutation.mutateAsync(data);
    navigate("/products", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <TextField
        label="Логин"
        placeholder="Введите логин"
        error={errors.username}
        {...register("username")}
      />

      <TextField
        label="Пароль"
        type="password"
        placeholder="Введите пароль"
        error={errors.password}
        {...register("password")}
      />

      {loginMutation.error && (
        <p className="text-red-500 text-sm">{loginMutation.error.message}</p>
      )}

      <CheckboxField
        name="remember"
        control={control}
        label="Запомнить данные"
      />

      <Button type="submit" disabled={isSubmitting} className="w-full py-2.5">
        {isSubmitting ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
}
