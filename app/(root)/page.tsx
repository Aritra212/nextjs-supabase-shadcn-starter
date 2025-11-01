import Link from "next/link";
import { getCurrentUser } from "@/utils/data-access/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogoutButton } from "@/components/logout-button";

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Next.js + Supabase Starter
          </h1>
          <p className="mt-2 text-muted-foreground">
            A production-grade starter template with authentication
          </p>
        </div>

        {user ? (
          <Card>
            <CardHeader>
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription>
                You are logged in as {user.email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  <strong>User ID:</strong> {user.id}
                </p>
                {user.user_metadata?.full_name && (
                  <p className="text-sm">
                    <strong>Name:</strong> {user.user_metadata.full_name}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href="/profile">View Protected Page</Link>
                </Button>
                <LogoutButton />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Sign in or create an account to access protected features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild className="flex-1">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Test the authentication flow by creating an account or try
                  accessing a{" "}
                  <Link
                    href="/profile"
                    className="font-medium underline underline-offset-4"
                  >
                    protected page
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center">
          <h2 className="text-2xl font-semibold">Features</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li> Next.js 16 with App Router</li>
            <li> Supabase Authentication</li>
            <li> shadcn/ui Components</li>
            <li> TypeScript</li>
            <li> Tailwind CSS v4</li>
            <li> Production-grade folder structure</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
