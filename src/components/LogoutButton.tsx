import { useLogout } from "../hooks/useLogout";

export function LogoutButton() {
  const logoutMutation = useLogout();

  return (
    <button
      type="button"
      onClick={() => logoutMutation.mutate()}
      className="text-sm text-gray-500 hover:text-gray-700"
    >
      Выйти
    </button>
  );
}
