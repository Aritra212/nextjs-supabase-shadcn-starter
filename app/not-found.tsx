import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 px-4">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <FileQuestion className="h-16 w-16 text-muted-foreground" />
          </div>
          <CardTitle className="text-4xl">404</CardTitle>
          <CardDescription className="text-lg">Page not found</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
            been moved or doesn&apos;t exist.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
