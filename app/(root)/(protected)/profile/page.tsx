import { getCurrentUser, getProfile } from "@/utils/data-access/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  const profile = user ? await getProfile(user.id) : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          This is a protected page. Only authenticated users can access it.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Your account details from Supabase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user && (
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold">Email:</span>
                <span className="col-span-2">{user.email}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold">User ID:</span>
                <span className="col-span-2 font-mono text-sm">{user.id}</span>
              </div>
              {user.user_metadata?.full_name && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold">Full Name:</span>
                  <span className="col-span-2">
                    {user.user_metadata.full_name}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold">Created:</span>
                <span className="col-span-2">
                  {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {profile && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Data</CardTitle>
            <CardDescription>
              Data from the profiles table in Supabase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold">Email:</span>
                <span className="col-span-2">{profile.email}</span>
              </div>
              {profile.full_name && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold">Full Name:</span>
                  <span className="col-span-2">{profile.full_name}</span>
                </div>
              )}
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold">Profile Created:</span>
                <span className="col-span-2">
                  {new Date(profile.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold">Last Updated:</span>
                <span className="col-span-2">
                  {new Date(profile.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-700 dark:text-green-400">
            Protected Route Success!
          </CardTitle>
          <CardDescription>
            This page is only accessible to authenticated users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            The authentication system is working correctly. Try logging out and
            accessing this page again - you&apos;ll be redirected to the login
            page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
