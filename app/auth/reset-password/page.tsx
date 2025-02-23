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
      <ResetPasswordForm />
    </AuthWrapper>
  );
};
export default ResetPassword;
