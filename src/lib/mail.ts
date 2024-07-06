import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  if (!process.env.RESEND_FROM) return false;

  await resend.emails.send({
    from: process.env.RESEND_FROM,
    to: email,
    subject: "Auth - 2FA Code",
    html: ` <p>Your 2FA code: ${token}.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.WEB_SERVER}/auth/new-verification?token=${token}`;

  if (!process.env.RESEND_FROM) return false;

  await resend.emails.send({
    from: process.env.RESEND_FROM,
    to: email,
    subject: "Auth - Confirm your mail",
    html: ` <p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.WEB_SERVER}/auth/new-password?token=${token}`;

  if (!process.env.RESEND_FROM) return false;

  await resend.emails.send({
    from: process.env.RESEND_FROM,
    to: email,
    subject: "Auth - Reset your password",
    html: ` <p>Click <a href="${resetLink}">here</a> to generate a new password.</p>`,
  });
};
