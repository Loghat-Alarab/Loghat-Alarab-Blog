"use server";
import "server-only";

import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { redirect, RedirectType } from "next/navigation";

import { api } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

type State = {
  success: boolean;
  message: string;
  callbackURL?: string;
};

export const verifyEmailAction = async (
  prevState: State,
  token: string
): Promise<State> => {
  try {
    if (!token)
      return {
        success: false,
        message: "لا يوجد رمز تحقق",
        callbackURL: prevState.callbackURL ?? DEFAULT_LOGIN_REDIRECT,
      };

    await api.verifyEmail({
      query: {
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
            callbackURL: prevState.callbackURL ?? DEFAULT_LOGIN_REDIRECT,
          };
        case "UNAUTHORIZED":
          if (error.body.code === "INVALID_TOKEN") {
            return {
              success: false,
              message: "رمز تحقق خاطئ",
              callbackURL: prevState.callbackURL ?? DEFAULT_LOGIN_REDIRECT,
            };
          } else if (error.body.code === "TOKEN_EXPIRED") {
            return {
              success: false,
              message: "انتهت صلاحية رمز التحقق",
              callbackURL: prevState.callbackURL ?? DEFAULT_LOGIN_REDIRECT,
            };
          } else {
            return {
              success: false,
              message: error.message,
              callbackURL: prevState.callbackURL ?? DEFAULT_LOGIN_REDIRECT,
            };
          }
        default:
          return {
            success: false,
            message: error.message,
            callbackURL: prevState.callbackURL ?? DEFAULT_LOGIN_REDIRECT,
          };
      }
    } else {
      return {
        success: false,
        message: "حدث خطأ ما",
        callbackURL: prevState.callbackURL ?? DEFAULT_LOGIN_REDIRECT,
      };
    }
  }

  redirect(
    prevState.callbackURL ?? DEFAULT_LOGIN_REDIRECT,
    RedirectType.replace
  );
};
