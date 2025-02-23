"use client";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa6";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useActionState, startTransition, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { providersAction, Providers } from "@/lib/actions/providers";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL");
  const [provider, setProvider] = useState<Providers | null>(null);
  const [formState, formAction, isPending] = useActionState(providersAction, {
    success: false,
    message: "",
    callbackURL: callbackURL,
  });

  const onClick = (provider: Providers) => {
    setProvider(provider);
    startTransition(() => formAction(provider));
  };

  useEffect(() => {
    if (formState.success) {
      location.href = formState.message;
    }
  }, [formState]);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          أو قم بتسجيل الدخول باستخدام
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Button
          className="text-[#F14336] border-[#F14336] text-lg"
          size="lg"
          variant="outline"
          onClick={() => onClick("google")}
        >
          {isPending && provider === "google" ? (
            <BeatLoader color="#9D966D" size={20} />
          ) : (
            <>
              Google <FcGoogle />
            </>
          )}
        </Button>
        <Button
          className="text-[#007AFF] border-[#007AFF] text-lg"
          size="lg"
          variant="outline"
          onClick={() => onClick("facebook")}
        >
          {isPending && provider === "facebook" ? (
            <BeatLoader color="#9D966D" size={20} />
          ) : (
            <>
              Facebook <FaFacebookF color="#007AFF" />
            </>
          )}
        </Button>
      </div>
      <FormError message={formState.success ? null : formState.message} />
    </div>
  );
};
