"use client";

import {
  useCallback,
  useEffect,
  useState,
  useActionState,
  startTransition,
} from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { verifyEmailAction } from "@/lib/actions/verify-email";

export const VerifyEmailForm = ({ callbackURL }: { callbackURL?: string }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [formState, formAction, isPending] = useActionState(verifyEmailAction, {
    success: false,
    message: "",
    callbackURL,
  });

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("لا يوجد رمز تحقق");
      return;
    }
    startTransition(() => formAction(token));
  }, [token, formAction]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex flex-col gap-4 items-center w-full justify-center">
      {isPending && <BeatLoader color="#9D966D" size={20} />}
      <FormError
        message={
          formState.success
            ? null
            : formState.message
              ? formState.message
              : error
        }
      />
      <FormSuccess message={formState.success ? formState.message : null} />
    </div>
  );
};
