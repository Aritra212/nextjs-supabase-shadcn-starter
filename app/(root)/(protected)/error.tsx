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
import { AlertTriangle } from "lucide-react";

export default function ProtectedError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Protected route error:", error);
  }, [error]);

  return (
    <div className="container mx-auto py-16 px-4">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle>Oops! Something went wrong</CardTitle>
          <CardDescription>
            We encountered an error while loading this page. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {process.env.NODE_ENV === "development" && error.message && (
            <div className="rounded-lg bg-muted p-4 text-sm font-mono">
              <p className="text-destructive font-semibold mb-2">
                Error details (dev only):
              </p>
              <p className="text-muted-foreground break-words">
                {error.message}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2 justify-center">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
          <Button onClick={() => (window.location.href = "/")} variant="outline">
            Back to home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
