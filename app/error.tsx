"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="container mx-auto py-16 px-4">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle>Something went wrong!</CardTitle>
          <CardDescription>
            An unexpected error occurred. Don&apos;t worry, this has been logged and
            we&apos;ll look into it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-lg bg-muted p-4 text-sm font-mono">
              <p className="text-destructive font-semibold mb-2">
                Error details (dev only):
              </p>
              <p className="text-muted-foreground wrap-break-word">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-muted-foreground mt-2 text-xs">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2 justify-center">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
          <Button onClick={() => (window.location.href = "/")} variant="outline">
            Go home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
