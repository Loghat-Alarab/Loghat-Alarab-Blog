import { ForgetPasswordForm } from "@/components/auth/forget-password-form";
import { AuthWrapper } from "@/components/auth/auth-wrapper";

const ForgetPassword = () => {
  return (
    <AuthWrapper
      headerLabel="نسيت كلمة المرور؟"
      switchButtonHref="/auth/login"
      switchButtonLabel="العودة لتسجيل الدخول"
      switchButtonTitle=""
    >
      <ForgetPasswordForm />
    </AuthWrapper>
  );
};
export default ForgetPassword;
