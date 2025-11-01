import { Spinner } from "@/components/ui/icons/spinner";

export default function ProtectedLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="h-8 w-8" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
