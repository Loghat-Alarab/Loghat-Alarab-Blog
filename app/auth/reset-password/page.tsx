import { Suspense } from "react";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

const ResetPassword = () => {
  return (
    <AuthWrapper
      headerLabel="إعادة تعيين كلمة المرور"
      switchButtonHref="/auth/login"
      switchButtonLabel="العودة لتسجيل الدخول"
      switchButtonTitle=""
    >
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </AuthWrapper>
  );
};
export default ResetPassword;
