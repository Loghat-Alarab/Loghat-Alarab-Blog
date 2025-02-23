"use client";

import {
  useRef,
  useState,
  useEffect,
  useActionState,
  startTransition,
} from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  // FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerAction } from "@/lib/actions/register";
import { FormError } from "@/components/auth/form-error";
import { RegisterSchema, RegisterData } from "@/lib/schemas";
import { FormSuccess } from "@/components/auth/form-success";

export const RegisterForm = ({ callbackURL }: { callbackURL?: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [formState, formAction, isPending] = useActionState(registerAction, {
    success: false,
    message: "",
    callbackURL,
  });

  const form = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  type="name"
                  disabled={isPending}
                  defaultValue={formState.fields?.name}
                  placeholder="معتصم أحمد"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {formState?.errors?.name && (
                <p className="text-sm font-medium text-destructive">
                  {formState?.errors?.name[0]}
                </p>
              )}
            </FormItem>
          )}
        />
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
              <FormMessage />
              {formState?.errors?.email && (
                <p className="text-sm font-medium text-destructive">
                  {formState?.errors?.email[0]}
                </p>
              )}
            </FormItem>
          )}
        />
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
                <p className="text-sm font-medium text-destructive">
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
                <p className="text-sm font-medium text-destructive">
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
          {isPending ? <BeatLoader color="white" size={20} /> : "إنشاء"}
        </Button>
      </form>
    </Form>
  );
};
