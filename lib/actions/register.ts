"use server";
import "server-only";

import { headers } from "next/headers";
import { APIError } from "better-auth/api";

import { api } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { RegisterSchema, RegisterData } from "@/lib/schemas";

type FormState = {
  success: boolean;
  message: string;
  callbackURL?: string;
  fields?: RegisterData;
  errors?: Record<string, string[]>;
};

export const registerAction = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      cPassword: formData.get("cPassword") as string,
    };

    const validatedFields = RegisterSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        success: false,
        message: "من فضلك أدخل بيانات صحيحة",
        fields: rawData,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { name, email, password } = rawData;

    await api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: prevState.callbackURL ?? DEFAULT_LOGIN_REDIRECT,
      },
    });

    return {
      success: true,
      message: "تم إرسال بريد إلكتروني للتأكيد",
      callbackURL: prevState.callbackURL,
    };
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
        case "UNPROCESSABLE_ENTITY":
          return {
            success: false,
            message: "هذا البريد الإلكتروني موجود بالفعل",
            callbackURL: prevState.callbackURL,
          };
        case "BAD_REQUEST":
          return {
            success: false,
            // message: "لا يمكن استخدام هذا البريد الإلكتروني",
            message:
              error.body.message ?? "لا يمكن استخدام هذا البريد الإلكتروني",
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
      console.log(error);
      return {
        success: false,
        message: "حدث خطأ ما",
        callbackURL: prevState.callbackURL,
      };
    }
  }

  // redirect("/auth/login", RedirectType.replace);
};
