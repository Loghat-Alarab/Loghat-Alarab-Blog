"use server";
import "server-only";

import { headers } from "next/headers";
import { APIError } from "better-auth/api";

import { api } from "@/lib/auth";
import { ForgetPasswordData, ForgetPasswordSchema } from "@/lib/schemas";

type FormState = {
  success: boolean;
  message: string;
  fields?: ForgetPasswordData;
  errors?: Record<string, string[]>;
};

export const forgetPasswordAction = async (
  _: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const rawData = {
      email: formData.get("email") as string,
    };

    const validatedFields = ForgetPasswordSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        success: false,
        message: "من فضلك أدخل بيانات صحيحة",
        fields: rawData,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { email } = rawData;

    await api.forgetPassword({
      body: {
        email,
      },
    });

    return {
      success: true,
      message: "سيتم إرسال رسالة إذا كان المستخدم موجود",
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
          };
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
};
