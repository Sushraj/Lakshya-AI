"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { cn, hasEnvVars } from "@/lib/utils";
import { useRouter } from "next/navigation";

type LogoutButtonProps = {
  className?: string;
};

export function LogoutButton({ className }: LogoutButtonProps) {
  const router = useRouter();

  const logout = async () => {
    if (!hasEnvVars) {
      router.push("/auth/login");
      return;
    }

    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <Button
      className={cn("mt-4 w-full", className)}
      onClick={logout}
      variant="outline"
    >
      Log out
    </Button>
  );
}
