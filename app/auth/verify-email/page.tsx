import { use } from "react";

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
      <VerifyEmailForm callbackURL={callbackURL} />
    </AuthWrapper>
  );
};
export default VerifyEmail;
