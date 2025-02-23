import { use } from "react";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { LoginForm } from "@/components/auth/login-form";

interface LoginProps {
  searchParams: Promise<{ callbackURL: string | undefined }>;
}

const Login = ({ searchParams }: LoginProps) => {
  const { callbackURL } = use(searchParams);

  return (
    <AuthWrapper
      headerLabel="تسجيل الدخول"
      switchButtonTitle="ليس لديك حساب بعد؟"
      switchButtonLabel="إنشاء حساب"
      switchButtonHref={
        callbackURL
          ? `/auth/register?callbackURL=${callbackURL}`
          : "/auth/register"
      }
      showSocials
    >
      <LoginForm callbackURL={callbackURL} />
    </AuthWrapper>
  );
};
export default Login;
