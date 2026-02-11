import * as ToastPrimitive from "@radix-ui/react-toast";

type Props = {
  message: string;
  onClose: () => void;
};

export function Toast({ message, onClose }: Props) {
  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <ToastPrimitive.Root
        open={!!message}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 flex items-center gap-3"
      >
        <ToastPrimitive.Title className="text-sm font-medium text-gray-900">
          {message}
        </ToastPrimitive.Title>
        <ToastPrimitive.Close className="text-gray-400 hover:text-gray-600">
          ✕
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-50 w-80" />
    </ToastPrimitive.Provider>
  );
}
