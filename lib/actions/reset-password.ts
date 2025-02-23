"use server";
import "server-only";

import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { redirect, RedirectType } from "next/navigation";

import { api } from "@/lib/auth";
import { ResetPasswordData, ResetPasswordSchema } from "@/lib/schemas";

type State = {
  success: boolean;
  message: string;
  fields?: ResetPasswordData;
  errors?: Record<string, string[]>;
};

export const newPasswordAction = async (
  _: State,
  formData: FormData
): Promise<State> => {
  try {
    const rawData = {
      password: formData.get("password") as string,
      cPassword: formData.get("cPassword") as string,
      token: formData.get("token") as string,
    };
    if (!rawData.token) return { success: false, message: "لا يوجد رمز تحقق" };

    const validatedFields = ResetPasswordSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        success: false,
        message: "من فضلك أدخل بيانات صحيحة",
        fields: rawData,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { password, token } = rawData;

    await api.resetPassword({
      body: {
        newPassword: password,
        token,
      },
    });
  } catch (error) {
    console.log({ error });
    if (error instanceof APIError) {
      switch (error.status) {
        case "TOO_MANY_REQUESTS":
          const retryAfter = (await headers()).get("X-Retry-After");
          return {
            success: false,
            message: `طلبات كثيرة جدا، يرجى المحاولة بعد ${retryAfter} ثانية`,
          };
        case "BAD_REQUEST":
          if (error.body.code === "INVALID_TOKEN") {
            return {
              success: false,
              message: "رمز تحقق خاطئ",
            };
          } else if (error.body.code === "TOKEN_EXPIRED") {
            return {
              success: false,
              message: "انتهت صلاحية رمز التحقق",
            };
          } else {
            return {
              success: false,
              message: error.message,
            };
          }
        default:
          return {
            success: false,
            message: error.message,
          };
      }
    } else {
      return {
        success: false,
        message: "حدث خطأ ما",
      };
    }
  }

  redirect("/auth/login", RedirectType.replace);
};
