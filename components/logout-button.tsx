"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logOut } from "@/utils/data-access/auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    try {
      const result = await logOut();

      if (result.success) {
        toast.success("Logged out successfully");
        router.push("/");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to logout");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      loading={isLoading}
      loadingText="Logging out..."
    >
      Logout
    </Button>
  );
}
