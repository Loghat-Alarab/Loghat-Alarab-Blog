import { Suspense, use } from "react";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";

interface VerifyEmailProps {
  searchParams: Promise<{ callbackURL: string | undefined }>;
}

const VerifyEmail = ({ searchParams }: VerifyEmailProps) => {
  const { callbackURL } = use(searchParams);

  return (
    <AuthWrapper
      headerLabel="تأكيد التفعيل"
      switchButtonHref="/auth/login"
      switchButtonLabel="العودة لتسجيل الدخول"
      switchButtonTitle=""
    >
      <Suspense>
        <VerifyEmailForm callbackURL={callbackURL} />
      </Suspense>
    </AuthWrapper>
  );
};
export default VerifyEmail;
