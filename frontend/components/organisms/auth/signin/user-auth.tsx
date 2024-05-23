"use client";
import { useSearchParams } from "next/navigation";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { BuiltInProviderType } from "next-auth/providers/index";
import { signIn } from "next-auth/react";

export default function UserAuth() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const login = async (provider: BuiltInProviderType) => {
    signIn(provider, {
      callbackUrl: callbackUrl || '/dashboard' || ''
    });
  };

  return (
    <>
      <Button className="ml-auto w-full" type="submit" onClick={() => login('google')}>
        Login Via Google
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        className="w-full"
        variant="outline"
        type="button"
        onClick={() =>
          login("github")
        }
      >
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Continue with Github
      </Button>
    </>
  )
}
