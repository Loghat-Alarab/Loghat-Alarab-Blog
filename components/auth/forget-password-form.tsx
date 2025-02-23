"use client";

import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useEffect, useActionState, startTransition } from "react";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { forgetPasswordAction } from "@/lib/actions/forget-password";
import { ForgetPasswordSchema, ForgetPasswordData } from "@/lib/schemas";

export const ForgetPasswordForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction, isPending] = useActionState(
    forgetPasswordAction,
    {
      success: false,
      message: "",
    }
  );

  const form = useForm<ForgetPasswordData>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  disabled={isPending}
                  defaultValue={formState.fields?.email}
                  placeholder="you@example.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                أدخل البريد الإلكتروني الخاص بك لتغيير كلمة المرور.
              </FormDescription>
              <FormMessage />
              {formState?.errors?.email && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {formState?.errors?.email[0]}
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
          {isPending ? <BeatLoader color="white" size={20} /> : "إرسال"}
        </Button>
      </form>
    </Form>
  );
};
