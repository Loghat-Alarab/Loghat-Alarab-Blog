import { z } from "zod";

export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export type ForgetPasswordData = z.infer<typeof ForgetPasswordSchema>;
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "من فضلك أدخل البريد الإلكتروني",
      invalid_type_error: "Email must be a string!",
    })
    .min(1, "من فضلك أدخل البريد الإلكتروني")
    .email("من فضلك أدخل بريد إلكتروني صحيح")
    .trim(),
  password: z
    .string({
      required_error: "من فضلك أدخل كلمة المرور",
      invalid_type_error: "Password must be a string!",
    })
    .min(1, "من فضلك أدخل كلمة المرور")
    .trim(),
  rememberMe: z.boolean().default(false),
  // code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    name: z
      .string({
        required_error: "من فضلك أدخل الاسم",
        invalid_type_error: "Name must be a string!",
      })
      .min(3, "الاسم يجب ان يكون أكثر من 3 أحرف"),
    email: z
      .string({
        required_error: "من فضلك أدخل البريد الإلكتروني",
        invalid_type_error: "Email must be a string!",
      })
      .min(1, "من فضلك أدخل البريد الإلكتروني")
      .email("من فضلك أدخل بريد إلكتروني صحيح")
      .trim(),
    password: z
      .string({
        required_error: "من فضلك أدخل كلمة المرور",
        invalid_type_error: "Password must be a string!",
      })
      .min(8, "كلمة المرور يجب ان تكون أكثر من 8 أحرف")
      .trim(),
    cPassword: z
      .string({
        required_error: "من فضلك أدخل تأكيد كلمة المرور",
        invalid_type_error: "Confirm Password must be a string!",
      })
      .min(1, "من فضلك أدخل تأكيد كلمة المرور")
      .trim(),
  })
  .superRefine(({ password, cPassword }, ctx) => {
    if (password !== cPassword) {
      ctx.addIssue({
        code: "custom",
        message: "كلمة المرور لا تطابق",
        path: ["cPassword"],
      });
    }
  });

export const ForgetPasswordSchema = z.object({
  email: z
    .string({
      required_error: "من فضلك أدخل البريد الإلكتروني",
      invalid_type_error: "Email must be a string!",
    })
    .min(1, "من فضلك أدخل البريد الإلكتروني")
    .email("Please enter a valid email!")
    .trim(),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "من فضلك أدخل كلمة المرور",
        invalid_type_error: "Password must be a string!",
      })
      .min(8, "كلمة المرور يجب ان تكون أكثر من 8 أحرف")
      .trim(),
    cPassword: z
      .string({
        required_error: "من فضلك أدخل تأكيد كلمة المرور",
        invalid_type_error: "Confirm Password must be a string!",
      })
      .min(1, "من فضلك أدخل تأكيد كلمة المرور")
      .trim(),
  })
  .superRefine(({ password, cPassword }, ctx) => {
    if (password !== cPassword) {
      ctx.addIssue({
        code: "custom",
        message: "كلمة المرور لا تطابق",
        path: ["cPassword"],
      });
    }
  });
