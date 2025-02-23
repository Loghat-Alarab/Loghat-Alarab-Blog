"use server";
import "server-only";

import { headers } from "next/headers";
import { APIError } from "better-auth/api";

import { api } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

type State = {
  success: boolean;
  message: string;
  callbackURL?: string | null;
};

export type Providers = "google" | "facebook";

export const providersAction = async (
  prevState: State,
  provider: Providers
): Promise<State> => {
  try {
    const res = await api.signInSocial({
      body: {
        provider,
        callbackURL: prevState.callbackURL ?? DEFAULT_LOGIN_REDIRECT,
      },
    });

    if (res.url) {
      return {
        success: true,
        message: res.url,
        callbackURL: prevState.callbackURL,
      };
    } else {
      return {
        success: false,
        message: "حدث خطأ ما",
        callbackURL: prevState.callbackURL,
      };
    }
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
};
