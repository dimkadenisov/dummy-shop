import * as Progress from "@radix-ui/react-progress";

export function ProgressBar({ loading }: { loading: boolean }) {
  if (!loading) return null;
  return (
    <Progress.Root className="absolute top-0 h-1 w-full bg-gray-200 overflow-hidden">
      <Progress.Indicator className="h-full bg-indigo-600 w-full animate-pulse transition-transform" />
    </Progress.Root>
  );
}
