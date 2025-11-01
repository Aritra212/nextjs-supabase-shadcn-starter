import { redirect } from "next/navigation";
import { getSession } from "@/utils/data-access/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If user is already logged in, redirect to home
  if (session) {
    redirect("/");
  }

  return <>{children}</>;
}