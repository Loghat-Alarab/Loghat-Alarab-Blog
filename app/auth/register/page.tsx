import { use } from "react";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { RegisterForm } from "@/components/auth/register-form";

interface RegisterProps {
  searchParams: Promise<{ callbackURL: string | undefined }>;
}

const Register = ({ searchParams }: RegisterProps) => {
  const { callbackURL } = use(searchParams);
  console.log(callbackURL);

  return (
    <AuthWrapper
      headerLabel="إنشاء حساب"
      switchButtonTitle="لديك حساب بالفعل؟"
      switchButtonLabel="تسجيل الدخول"
      switchButtonHref={
        callbackURL ? `/auth/login?callbackURL=${callbackURL}` : "/auth/login"
      }
      showSocials
    >
      <RegisterForm callbackURL={callbackURL} />
    </AuthWrapper>
  );
};
export default Register;
