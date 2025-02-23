"use server";
import "server-only";

import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { redirect, RedirectType } from "next/navigation";

import { api } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, LoginData } from "@/lib/schemas";

type FormState = {
  success: boolean;
  message: string;
  callbackURL?: string;
  fields?: LoginData;
  errors?: Record<string, string[]>;
};

export const loginAction = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      rememberMe: !!(formData.get("rememberMe") as string),
    };

    const validatedFields = LoginSchema.safeParse(rawData);

    const { email, password } = rawData;

    if (!validatedFields.success) {
      return {
        success: false,
        message: "من فضلك أدخل بيانات صحيحة",
        fields: rawData,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const res = await api.signInEmail({
      body: {
        email,
        password,
        // rememberMe: Boolean(rememberMe),
        callbackURL: prevState.callbackURL ?? DEFAULT_LOGIN_REDIRECT,
      },
      asResponse: true,
    });

    console.log(res);

    // return { success: true, message: "تم تسجيل الدخول بنجاح" };
  } catch (error) {
    console.log({ error });
    if (error instanceof APIError) {
      switch (error.status) {
        case "TOO_MANY_REQUESTS":
          const retryAfter = (await headers()).get("X-Retry-After");
          return {
            success: false,
            message: `طلبات كثيرة جدا، يرجى المحاولة بعد ${retryAfter} ثانية`,
            callbackURL: prevState.callbackURL,
          };
        case "UNAUTHORIZED":
          return {
            success: false,
            message: "لقد أدخلت بيانات خاطئة",
            callbackURL: prevState.callbackURL,
          };
        case "FORBIDDEN":
          return {
            success: false,
            message: "قم بتفعيل البريد الإلكتروني أولا",
            callbackURL: prevState.callbackURL,
          };
        default:
          return {
            success: false,
            message: error.message,
            callbackURL: prevState.callbackURL,
          };
      }
    } else {
      return {
        success: false,
        message: "حدث خطأ ما",
        callbackURL: prevState.callbackURL,
      };
    }
  }

  redirect(
    prevState.callbackURL || DEFAULT_LOGIN_REDIRECT,
    RedirectType.replace
  );
};
