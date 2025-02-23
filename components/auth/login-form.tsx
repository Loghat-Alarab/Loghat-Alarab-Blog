"use client";

import {
  useRef,
  useState,
  useActionState,
  startTransition,
  useEffect,
} from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
// import { useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

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
import { loginAction } from "@/lib/actions/login";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginSchema, LoginData } from "@/lib/schemas";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";

export const LoginForm = ({ callbackURL }: { callbackURL?: string }) => {
  // const searchParams = useSearchParams();
  // const error = searchParams.get("error");
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formState, formAction, isPending] = useActionState(loginAction, {
    success: false,
    message: "",
    callbackURL,
  });

  // const message =
  //   error === "OAuthAccountNotLinked"
  //     ? "Another account already exists with the same email!"
  //     : null;

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: formState.fields?.email ?? "",
      password: formState.fields?.password ?? "",
      rememberMe: formState.fields?.rememberMe ?? false,
    },
  });

  const {
    reset,
    formState: { isSubmitSuccessful },
  } = form;

  useEffect(() => {
    if (isSubmitSuccessful && formState.success) {
      // reset();
    }
  }, [reset, isSubmitSuccessful, formState.success]);

  const onSubmit = () => {
    console.log(form.getValues("rememberMe"));
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
                  placeholder="john.doe@example.com"
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
        <div className="flex justify-between items-center">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    defaultChecked
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>تذكرني</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button variant="link" size="sm" asChild className="px-0">
            <Link href="/auth/forget-password">هل نسيت كلمة المرور؟</Link>
          </Button>
        </div>

        <FormError
          message={
            formState.success ? null : formState.message
            // ? formState.message
            // : message
          }
        />
        <FormSuccess message={formState.success ? formState.message : null} />
        <Button
          disabled={isPending}
          type="submit"
          className={`${isPending && "cursor-not-allowed"} w-full`}
        >
          {isPending ? <BeatLoader color="white" size={20} /> : "الدخول"}
        </Button>
      </form>
    </Form>
  );
};
