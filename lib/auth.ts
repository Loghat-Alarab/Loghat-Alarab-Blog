import {
  betterAuth,
  // BetterAuthOptions
} from "better-auth";
import { openAPI } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { APIError, createAuthMiddleware } from "better-auth/api";

import client from "@/lib/db/client";
import { sendPasswordResetEmail, sendVerificationEmail } from "./actions/mail";

// const options = {
//   //...config options
//   plugins: [
//     //...plugins
//   ],
// } satisfies BetterAuthOptions;

export const auth = betterAuth({
  trustedOrigins: [
    "https://www.loghat-alarab.online/",
    "http://www.loghat-alarab.online/",
    "https://loghat-alarab.online/",
    "http://loghat-alarab.online/",
  ],
  database: mongodbAdapter(client.db(process.env.DB_NAME)),
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }
      if (
        !ctx.body?.email.endsWith("@gmail.com") &&
        !ctx.body?.email.endsWith("@outlook.com")
      ) {
        console.log(ctx.body?.email);
        console.log(ctx.body?.email.endsWith("@gmail.com"));
        throw new APIError("BAD_REQUEST", {
          message: "لا يمكن استخدام هذا البريد الإلكتروني",
        });
      }
    }),
  },
  user: {
    modelName: "users",
    // additionalFields: {
    //   comments: {
    //     type: "string[]",
    //     required: false,
    //   },
    //   reviews: {
    //     type: "string[]",
    //     required: false,
    //   },
    //   favorites: {
    //     type: "string[]",
    //     required: false,
    //   },
    //   watched: {
    //     type: "string[]",
    //     required: false,
    //   },
    // },
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
      // TODO handle delete user data
      // async afterDelete(user, request) {},
    },
  },
  // databaseHooks: {
  //   user: {
  //     create: {
  //       before: async (user) => {
  //         if (!user.isAgreedToTerms) {
  //           throw new APIError("BAD_REQUEST", {
  //             message: "User must agree to the TOS before signing up.",
  //           });
  //         }
  //       },
  //     },
  //   },
  // },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 600,
    sendResetPassword: async ({ user, token }) => {
      await sendPasswordResetEmail(user.email, token);
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 600,
    sendVerificationEmail: async ({ user, token }) => {
      await sendVerificationEmail(user.email, token);
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    },
    facebook: {
      clientId: process.env.AUTH_FACEBOOK_ID as string,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET as string,
    },
  },
  plugins: [openAPI(), nextCookies()],
  advanced: {
    // generateId: false
    cookiePrefix: "loghat-alarab",
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
    freshAge: 5 * 60,
  },
});

export const api = auth.api;

// const openAPISchema = await api.generateOpenAPISchema();
// console.log(openAPISchema);
