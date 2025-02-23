/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * An array of routes that are private.
 * These routes require authentication.
 * @type {string[]}
 */
export const privateRoutes: string[] = ["/profile"];

/**
 * An array of auth routes that are used for authentication.
 * An array of auth routes that are accessible only to those are not authenticated.
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
  "/auth/new-verification",
];

/**
 * The prefix for authentication routes
 * @type {string}
 */
export const authRoutesPrefix: string = "/auth";

/**
 * The prefix for API authentication routes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/";
