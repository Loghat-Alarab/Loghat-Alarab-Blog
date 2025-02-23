"use client";

import {
  useRef,
  useEffect,
  useActionState,
  startTransition,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { newPasswordAction } from "@/lib/actions/reset-password";
import { ResetPasswordSchema, ResetPasswordData } from "@/lib/schemas";

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [formState, formAction, isPending] = useActionState(newPasswordAction, {
    success: false,
    message: "",
  });

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      cPassword: "",
    },
    // mode: "onTouched",
  });

  const {
    reset,
    formState: { isSubmitSuccessful },
  } = form;

  useEffect(() => {
    if (isSubmitSuccessful && formState.success) {
      reset();
    }
  }, [reset, isSubmitSuccessful, formState.success]);

  const onSubmit = () => {
    startTransition(() => formAction(new FormData(formRef.current!)));
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        noValidate
        autoComplete="on" // on | off
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input id="token" name="token" type="hidden" value={token ?? ""} />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    disabled={isPending}
                    type={showPassword ? "text" : "password"}
                    defaultValue={formState.fields?.password}
                    placeholder="********"
                    {...field}
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
                    />
                  ) : (
                    <FaEye
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
              {formState?.errors?.password && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {formState?.errors?.password[0]}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تأكيد كلمة المرور</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="cPassword"
                    disabled={isPending}
                    type={showCPassword ? "text" : "password"}
                    defaultValue={formState.fields?.cPassword}
                    placeholder="********"
                    {...field}
                  />
                  {showCPassword ? (
                    <FaEyeSlash
                      onClick={() => setShowCPassword(!showCPassword)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
                    />
                  ) : (
                    <FaEye
                      onClick={() => setShowCPassword(!showCPassword)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
              {formState?.errors?.cPassword && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {formState?.errors?.cPassword[0]}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormError message={formState.success ? null : formState.message} />
        <FormSuccess message={formState.success ? formState.message : null} />
        <Button
          disabled={isPending}
          type="submit"
          className={`${isPending && "cursor-not-allowed"} w-full`}
        >
          {isPending ? <BeatLoader color="white" size={20} /> : "إعادة تعيين"}
        </Button>
      </form>
    </Form>
  );
};
