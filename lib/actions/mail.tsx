"use server";
import "server-only";

import { render } from "@react-email/render";
import { createTransport } from "nodemailer";

import { TwoFactorOTP } from "@/components/mail/two-factor-otp";
import { PasswordReset } from "@/components/mail/password-reset";
import { EmailVerification } from "@/components/mail/emial-verification";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
const fromAddress = process.env.EMAIL_FROM as string;
const fromName = process.env.NAME_FROM as string;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${baseUrl}/auth/verify-email?token=${token}&callbackURL=/`;

  const html = await render(
    <EmailVerification verificationLink={confirmLink} />,
    {
      pretty: true,
    }
  );

  const transport = createTransport({
    service: "gmail",
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  const result = await transport.sendMail({
    to: email,
    from: {
      address: fromAddress,
      name: fromName,
    },
    subject: "تأكيد البريد الإلكتروني",
    html: html,
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${baseUrl}/auth/reset-password?token=${token}`;

  const html = await render(<PasswordReset resetLink={resetLink} />, {
    pretty: true,
  });

  const transport = createTransport({
    service: "gmail",
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  const result = await transport.sendMail({
    to: email,
    from: {
      address: fromAddress,
      name: fromName,
    },
    subject: "إعادة تعيين كلمة المرور",
    html: html,
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const html = await render(<TwoFactorOTP otp={token} />, {
    pretty: true,
  });

  const transport = createTransport({
    service: "gmail",
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  const result = await transport.sendMail({
    to: email,
    from: {
      address: fromAddress,
      name: fromName,
    },
    subject: "2FA Code",
    html: html,
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
};
