import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/icons/spinner";

export default function ProfileLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-center gap-2">
            <Spinner className="h-5 w-5" />
            <span className="text-muted-foreground">Loading profile...</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Skeleton for profile content */}
          <div className="space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded w-1/4"></div>
            <div className="h-6 bg-muted animate-pulse rounded w-3/4"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded w-1/4"></div>
            <div className="h-6 bg-muted animate-pulse rounded w-2/3"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded w-1/3"></div>
            <div className="h-6 bg-muted animate-pulse rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
